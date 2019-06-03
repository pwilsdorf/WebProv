export interface ModelBuildingActivity {
  /**
   * The unique id.
   */ 
  id: number;

  /**
   * The node identifier. Very useful since JavaScript doesn't really have classes so we use this attribute to see which type of node we have.
   */ 
  type: 'model-building-activity';
  
  /**
   * The wet lab data that is used for validation.
   */
  usedForValidation: WetLabData[];
  
  /**
   * The wet lab data used for calibration.
   */
  usedForCalibration: WetLabData[];
  
  /**
   * The models used.
   */
  used: Model[];
}

export interface ModelExplorationActivity {
  /**
   * The unique id.
   */ 
  id: number;

  /**
   * The node identifier. Very useful since JavaScript doesn't really have classes so we use this attribute to see which type of node we have.
   */ 
  type: 'model exploration activity';

  /**
   * The model that the exploration activity was based on. It can only be based on one model.
   */
  dependency: Model;
}

export interface ModelInformation {
  /**
   * The unique id.
   */ 
  id: number;
  
  /**
   * The model number. This number can be assigned arbitrarily. Should be an integer greater or equal to 1. 
   */
  modelNumber: number;

  /**
   * The information regarding the source of the model. For example, `Haack et al., PLoS comp. bio. 2015`.
   */
  bibInformation: string;  
}

export interface Model {
  /**
   * The unique id.
   */ 
  id: number;

  /**
   * The node identifier. Very useful since JavaScript doesn't really have classes so we use this attribute to see which type of node we have.
   */ 
  type: 'model';
  
  /**
   * The information associated with this model. Multiple models can have the same information given they have different version numbers. 
   */
  modelInformation: ModelInformation;

  /**
   * The version! This should start at 1 and then increment for each version. A model should never depend on a model that has a higher version number (or itself). 
   */
  version: number;

  /**
   * The model building activity that was used to build this model.
   */
  used: ModelBuildingActivity;
}

export interface WetLabData {
  /**
   * The unique id.
   */ 
  id: number;

  /**
   * The node identifier. Very useful since JavaScript doesn't really have classes so we use this attribute to see which type of node we have.
   */ 
  type: 'wet-lab data';

  /**
   * The model information associated with this wet lab data. Only some wet lab data will come from a specific publication.
   */
  modelInformation?: ModelInformation;

  /**
   * The name of the wet lab experiment. This might be broken up into more specific information.
   */
  name: string;
}

export interface SimulationData {
  /**
   * The unique id.
   */ 
  id: number;

  /**
   * The node identifier. Very useful since JavaScript doesn't really have classes so we use this attribute to see which type of node we have.
   */ 
  type: 'simulation data';
  text: string;
  buildingActivity: ModelBuildingActivity | ModelExplorationActivity;
}

export type NodeType = ModelBuildingActivity['type'] | ModelExplorationActivity['type'] | Model['type'] | WetLabData['type'] | SimulationData['type'];

export interface ProvenanceAPI {
  '/health': {
    GET: {},
  };

  '/models/:id': {
    GET: {
      response: Model | null,
      params: {
        id: string;
      }
    },
  };

}
