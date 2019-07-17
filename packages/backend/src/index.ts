import RestypedRouter from 'restyped-express-async';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as data from './data';
import { 
  getItems, 
  deleteItem, 
  updateOrCreate, 
  clearDatabase,
  updateOrCreateConnection,
  getRelationships,
  deleteRelationship,
  deleteRelationshipByType,
  getItemsByConnection,
} from './cypher';
import { 
  ProvenanceAPI, 
  ProvenanceNodeSchema, 
  SimulationStudyModel, 
  DependsRelationship, 
  InformationRelationship, 
  InformationSchema,
  BackendError,
  BackendNotFound,
  BackendSuccess,
  uniqueId,
  Information, 
} from 'common';

export function literal<T extends string>(o: T): T {
  return o;
}

const deleteNode = async (id: string): Promise<BackendSuccess | BackendError | BackendNotFound> => {
  // Ok, first delete all of the information nodes attached to the given provenance node
  const result1 = await deleteRelationshipByType(InformationRelationship, id);
  if (result1.result !== 'success') {
    return result1;
  }

  // Now, delete the provenance node.
  const result2 =  await deleteItem(ProvenanceNodeSchema, id);
  if (result2.result !== 'success') {
    return result2;
  }


  return {
    result: 'success',
  };
}

export const resetDatabase = async () => {
  clearDatabase();

  console.log('Creating ' + data.nodes.length + ' Nodes');
  for (const node of data.nodes) {
    const result = await updateOrCreate(ProvenanceNodeSchema, node);
    if (result.result === 'error') {
      console.error(`ERROR: Error creating ${node.type}: ${result.message}`);
    }
  }

  for (const study of data.studies) {
    const result = await updateOrCreate(SimulationStudyModel, study);
    if (result.result === 'error') {
      console.error(`ERROR: Error creating stufy: ${result.message}`);
    }
  }

  for (const node of data.informationNodes) {
    const result = await updateOrCreate(InformationSchema, node);
    if (result.result === 'error') {
      console.error(`ERROR: Error creating information: ${result.message}`);
    }
  }

  for (const connection of data.connections) {
    await updateOrCreateConnection(connection.schema, {
      source: connection.source.id,
      target: connection.target.id,
      properties: connection.properties,
    })
  }
}

resetDatabase();

const create = () => {
  // SETUP FOR EXPRESS //
  const app = express();
  app.use(bodyParser.json());

  app.use(cors());

  const apiRouter = express.Router();
  app.use('/', apiRouter);
  const router = RestypedRouter<ProvenanceAPI>(apiRouter);

  // ROUTES //
  router.get('/health', async () => {
    return 'OK'
  });

  router.get('/information', async () => {
    return await getItems(InformationSchema);
  });

  router.post('/information', async (req) => {
    return await updateOrCreate(InformationSchema, req.body);
  });

  router.delete('/information', async (req) => {
    return await deleteItem(InformationSchema, req.query.id);
  });

  router.get('/nodes', async () => {
    return await getItems(ProvenanceNodeSchema);
  });

  router.get('/studies', async () => {
    return await getItems(SimulationStudyModel);
  })

  router.delete('/nodes', async (req) => {
    return await deleteNode(req.query.id);
  })

  router.delete('/studies', async (req) => {
    return await deleteItem(SimulationStudyModel, req.query.id);
  })

  router.post('/nodes', async (req) => {
    return await updateOrCreate(ProvenanceNodeSchema, req.body.item);
  })

  router.get('/nodes/dependencies', async () => {
    return await getRelationships(DependsRelationship);
  })

  router.post('/nodes/dependencies', async (req) => {
    return await updateOrCreateConnection(DependsRelationship, req.body);
  })

  router.get('/nodes/information', async () => {
    return await getRelationships(InformationRelationship);
  })

  router.post('/nodes/information', async (req) => {
    const result1 = await updateOrCreate(InformationSchema, req.body.information);
    if (result1.result !== 'success') {
      return result1;
    }

    return await updateOrCreateConnection(InformationRelationship, req.body.relationship);
  })

  router.post('/studies', async (req) => {
    return await updateOrCreate(SimulationStudyModel, req.body.item);
  })

  router.delete('/nodes/dependencies', async (req) => {
    return await deleteRelationship(DependsRelationship, req.query.id);
  })

  return app;
};

const server = create();

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}!`);
})