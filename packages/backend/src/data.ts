import { NodeDefinition, RelationshipRule } from 'common';
import { getValidationError } from 'common/node_modules/io-ts';

export {
  provenanceNodes,
  studies,
  informationFields,
  informationRelationships,
  dependencyRelationships,
} from './assets/web-provenance-export.json';

// Definitions
const researchQuestion: NodeDefinition = {
  id: 'Research Question',
  classification: 'entity',
  //labelFormatString: "RQ${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'RQ${version}',
  informationFields: [
    'TRACE Tag',  
    'Type,Explanation,Prediction,Other',
    'Description'
  ]
};

const assumption: NodeDefinition = {
  id: 'Assumption',
  classification: 'entity',
  //labelFormatString: "A${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'A${version}',
  informationFields: [
    'TRACE Tag',
    'Type,Quantitative,Narrative,Other',
    'Description'
  ],
};

const requirement: NodeDefinition = {
  id: 'Requirement',
  classification: 'entity',
  //labelFormatString: "R${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'R${version}',
  informationFields: [
    'TRACE Tag',
    'Specification',
    'Type,Quantitative,Data-based,Narrative-based,Other',
    'Description',
  ]
};

const qualitativeModel: NodeDefinition = {
  id: 'Qualitative Model',
  classification: 'entity',
  //labelFormatString: "QM${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'QM${version}',
  informationFields: [
    'Reference',
    'TRACE Tag',
    'Type,Informal,Formal,Other',
    'Description'
  ],
};

const simulationModel: NodeDefinition = {
  id: 'Simulation Model',
  classification: 'entity',
  //labelFormatString: "SM${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'SM${version}',
  informationFields: [
    'Reference',
    'TRACE Tag',
    'Specification',
    'Software',
    'Status,Successful Validation,Successful Calibration',
    'Type,ODE,IBM,Other',
    'Description', 
  ],
};

const simulationExperiment: NodeDefinition = {
  id: 'Simulation Experiment',
  classification: 'entity',
  //labelFormatString: "E${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'SE${version}',
  informationFields: [
    'Reference',
    'TRACE Tag',
    'Specification',
    'Software',
    'Type,Time course analysis,Parameter scan,Sensitivity analysis,Optimization,Other',
    'Description'
  ],
};

const simulationData: NodeDefinition = {
  id: 'Simulation Data',
  classification: 'entity',
  //labelFormatString: "D${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'SD${version}',
  informationFields: [
    'Reference',
    'TRACE Tag',
    'Status,Successful Validation,Successful Calibration',
    'Description'
  ]
};

const simulationVisualization: NodeDefinition = {
  id: 'Simulation Visualization',
  classification: 'entity',
  //labelFormatString: "SV${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'SV${version}',
  informationFields: [
    'Reference',
    'TRACE Tag',
    'Specification',
    'Software',
    'Type,Graph,Animation,Other',
    'Description'
  ],
};

const wetlabData: NodeDefinition = {
  id: 'Wet-lab Data',
  classification: 'entity',
  //labelFormatString: "D${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'WD${version}',
  informationFields: [
    'Reference',
    'TRACE Tag',
    'Description'
  ],
};

const fieldData: NodeDefinition = {
  id: 'Field Data',
  classification: 'entity',
  //labelFormatString: "FD${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'FD${version}',
  informationFields: [
    'Reference',
    'TRACE Tag',
    'Type,Survey,Experiment,Other',
    'Description'
  ],
};

const publication: NodeDefinition = {
  id: 'Publication',
  classification: 'entity',
  //labelFormatString: "P${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'P${version}',
  informationFields: [
    'Reference',
    'TRACE Tag',
    'Description'
  ],
};

const buildingActivity: NodeDefinition = {
  id: 'Building Simulation Model',
  //label: 'BSM',
  labelFormatString: 'BSM${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const calibratingActivity: NodeDefinition = {
  id: 'Calibrating Simulation Model',
  //label: 'CSM',
  labelFormatString: 'CSM${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const validatingActivity: NodeDefinition = {
  id: 'Validating Simulation Model',
  //label: 'VSM',
  labelFormatString: 'VSM${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const analyzingActivity: NodeDefinition = {
  id: 'Analyzing Simulation Model',
  //label: 'ASM',
  labelFormatString: 'ASM${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const visualizingActivity: NodeDefinition = {
  id: 'Visualizing Simulation Result',
  //label: 'VSR',
  labelFormatString: 'VSR${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

export const rules: RelationshipRule[] = [
  {
    id: 'simulation-experiment-was-generated-by-calibrating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationExperiment.id,
    target: calibratingActivity.id,
  },
  {
    id: 'simulation-experiment-was-generated-by-validating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationExperiment.id,
    target: validatingActivity.id,
  },
  {
    id: 'simulation-experiment-was-generated-by-analyzing-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationExperiment.id,
    target: analyzingActivity.id,
  },
  {
    id: 'simulation-data-was-generated-by-calibrating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationData.id,
    target: calibratingActivity.id,
  },
  {
    id: 'simulation-data-was-generated-by-validating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationData.id,
    target: validatingActivity.id,
  },
  {
    id: 'simulation-data-was-generated-by-analyzing-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationData.id,
    target: analyzingActivity.id,
  },
  {
    id: 'simulation-model-generated-by-building-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationModel.id,
    target: buildingActivity.id,
  },
  {
    id: 'simulation-model-generated-by-calibrating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationModel.id,
    target: calibratingActivity.id,
  },
  {
    id: 'simulation-visualization-was-generated-by-visualizing-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationVisualization.id,
    target: visualizingActivity.id,
  },
  {
    id: 'building-activity-used-research-question',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: researchQuestion.id,
  },
  {
    id: 'building-activity-used-assumption',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: assumption.id,
  },
  {
    id: 'building-activity-used-requirement',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: requirement.id,
  },
  {
    id: 'building-activity-used-qualitative-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: qualitativeModel.id,
  },
  {
    id: 'building-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'building-activity-used-simulationExperiment',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: simulationExperiment.id,
  },
  {
    id: 'building-activity-used-simulation-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: simulationData.id,
  },
  {
    id: 'building-activity-used-wet-lab-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: wetlabData.id,
  },
  {
    id: 'building-activity-used-field-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: fieldData.id,
  },
  {
    id: 'building-activity-used-publication',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: publication.id,
  },
  {
    id: 'calibrating-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'calibrating-activity-used-research-question',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: researchQuestion.id,
  },
  {
    id: 'calibrating-activity-used-assumption',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: assumption.id,
  },
  {
    id: 'calibrating-activity-used-qualitative-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: qualitativeModel.id,
  },
  {
    id: 'calibrating-activity-used-requirement',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: requirement.id,
  },
  {
    id: 'calibrating-activity-used-simulation-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: simulationData.id,
  },
  {
    id: 'calibrating-activity-used-wet-lab-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: wetlabData.id,
  },
  {
    id: 'calibrating-activity-used-field-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: fieldData.id,
  },
  {
    id: 'validating-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'validating-activity-used-assumption',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: assumption.id,
  },
  {
    id: 'validating-activity-used-requirement',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: requirement.id,
  },
  {
    id: 'validating-activity-used-simulation-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: simulationData.id,
  },
  {
    id: 'validating-activity-used-wet-lab-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: wetlabData.id,
  },
  {
    id: 'validating-activity-used-field-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: fieldData.id,
  },
  {
    id: 'analyzing-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'analyzing-activity-used-assumption',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingActivity.id,
    target: assumption.id,
  },
  {
    id: 'analyzing-activity-used-requirement',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingActivity.id,
    target: requirement.id,
  },
  {
    id: 'analyzing-activity-used-simulation-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingActivity.id,
    target: simulationData.id,
  },
  {
    id: 'analyzing-activity-used-wet-lab-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingActivity.id,
    target: wetlabData.id,
  },
  {
    id: 'analyzing-activity-used-field-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingActivity.id,
    target: fieldData.id,
  },
  {
    id: 'visualizing-activity-used-simulation-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: visualizingActivity.id,
    target: simulationData.id,
  },
];

export const definitions: NodeDefinition[] = [
  researchQuestion,
  assumption,
  requirement,
  qualitativeModel,
  simulationModel,
  simulationExperiment,
  simulationVisualization,
  simulationData,
  wetlabData,
  fieldData,
  buildingActivity,
  calibratingActivity,
  validatingActivity,
  analyzingActivity,
  visualizingActivity,
  publication
];
