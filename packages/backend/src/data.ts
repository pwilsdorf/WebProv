import { uniqueId, NodeDefinition, RelationshipRule } from 'common';

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
  labelFormatString: "RQ${version}",
  informationFields: ["Description"]
}

const assumption: NodeDefinition = {
  id: 'Assumption',
  classification: 'entity',
  //labelFormatString: "A${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: "A${version}",
  informationFields: ["Description", "Category"]
}

const requirement: NodeDefinition = {
  id: 'Requirement',
  classification: 'entity',
  //labelFormatString: "R${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: "R${version}",
  informationFields: ["Description", "Related to", "Main species", "Type, qualitative, quantitative"]
}

const qualitativeModel: NodeDefinition = {
  id: 'Qualitative Model',
  classification: 'entity',
  //labelFormatString: "QM${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: "QM${version}",
  informationFields: ["Description", "Reference", "Representation, reaction scheme, equations", "Species", "Compartments"]
}

const simulationModel: NodeDefinition = {
  id: 'Simulation Model',
  classification: 'entity',
  //labelFormatString: "SM${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: "SM${version}",
  informationFields: ["Description", "Reference"]
}

const simulationExperiment: NodeDefinition = {
  id: 'Simulation Experiment',
  classification: 'entity',
  //labelFormatString: "E${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: "SE${version}",
  informationFields: ["Description", "Reference", "Category, optimization, sensitivity analysis, perturbation, parameter scan, steady-state analysis, time course analysis, other"]
}

const simulationData: NodeDefinition = {
  id: 'Simulation Data',
  classification: 'entity',
  //labelFormatString: "D${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: "SD${version}",
  informationFields: ["Description", "Reference", "Related to"]
}

const wetlabData: NodeDefinition = {
  id: 'Wet-lab Data',
  classification: 'entity',
  //labelFormatString: "D${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: "WD${version}",
  informationFields: ["Description", "Reference", "Type of experiment, in vitro, in vivo", "Organism", "Organ/Tissue/Cell line"]
}

const buildingActivity: NodeDefinition = {
  id: 'Building Simulation Model',
  //label: 'BSM',
  labelFormatString: "BSM${version}",
  classification: 'activity',
  informationFields: ["Description"]
}

const calibratingActivity: NodeDefinition = {
  id: 'Calibrating Simulation Model',
  //label: 'CSM',
  labelFormatString: "CSM${version}",
  classification: 'activity',
  informationFields: ["Description"]
}

const validatingActivity: NodeDefinition = {
  id: 'Validating Simulation Model',
  //label: 'VSM',
  labelFormatString: "VSM${version}",
  classification: 'activity',
  informationFields: ["Description"]
}

const analyzingActivity: NodeDefinition = {
  id: 'Analyzing Simulation Model',
  //label: 'ASM',
  labelFormatString: "ASM${version}",
  classification: 'activity',
  informationFields: ["Description"]
}

export const rules: RelationshipRule[] = [
  {
    id: 'simulation-data-is-related-to-simulation-experiment',
    type: ['Related to'],
    cardinality: 'one-to-one',
    source: simulationData.id,
    target: simulationExperiment.id,
  },
  {
    id: 'requirement-is-related-to-wet-lab-data',
    type: ['Related to'],
    cardinality: 'one-to-one',
    source: requirement.id,
    target: wetlabData.id,
  },
  {
    id: 'simulation-experiment-was-generated-by-building-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationExperiment.id,
    target: buildingActivity.id,
  },
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
    id: 'simulation-data-was-generated-by-building-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationData.id,
    target: buildingActivity.id,
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
    id: 'qualitative-model-was-generated-by-building-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: qualitativeModel.id,
    target: buildingActivity.id,
  },
  {
    id: 'qualitative-model-was-generated-by-calibrating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: qualitativeModel.id,
    target: calibratingActivity.id,
  },
  {
    id: 'qualitative-model-was-generated-by-validating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: qualitativeModel.id,
    target: validatingActivity.id,
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
    id: 'simulation-model-generated-by-validating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationModel.id,
    target: validatingActivity.id,
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
    id: 'calibrating-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'validating-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'analyzing-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'calibrating-activity-used-simulation-data-for-calibration',
    type: ['Used for calibration'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: simulationData.id,
  },
  {
    id: 'calibrating-activity-used-wet-lab-data-for-calibration',
    type: ['Used for calibration'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: wetlabData.id,
  },
  {
    id: 'validating-activity-used-simulation-data-for-validation',
    type: ['Used for validation'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: simulationData.id,
  },
  {
    id: 'validating-activity-used-wet-lab-data-for-validation',
    type: ['Used for validation'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: wetlabData.id,
  },
  {
    id: 'validating-activity-used-simulation-data-for-comparison',
    type: ['Used for comparison'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: simulationData.id,
  },
  {
    id: 'validating-activity-used-wet-lab-data-for-comparison',
    type: ['Used for comparison'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: wetlabData.id,
  }
]

export const definitions: NodeDefinition[] = [
  researchQuestion,
  assumption,
  requirement,
  qualitativeModel,
  simulationModel,
  simulationExperiment,
  simulationData,
  wetlabData,
  buildingActivity,
  calibratingActivity,
  validatingActivity,
  analyzingActivity,
]