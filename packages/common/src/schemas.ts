import * as n from './neon';

/**
 * A comprehensive list of the types of relationships that can be formed between provenance nodes. 
 * Rules restrict the actual relationships that can be formed.
 */
export const RelationshipTypeUnion = n.union([
  n.literal('Used'),
  //n.literal('Used for validation'),
  //n.literal('Used for calibration'),
  n.literal('Generated by'),
]);

/**
 * This type of Neo4j node defines a type of provenance node. Each definition has a name, a 
 * classification, and information about how label the node in the visualization. Because there is
 * no hierarchy in Neo4j, the `classification` attribute enables this hierarchy.
 */
export const NodeDefinitionSchema = n.schema({
  name: 'NodeDefinition',
  required: {
    /**
     * The ID and human readable name of the node.
     */
    id: {
      primary: true,
      type: n.string,
    },
    /**
     * The classification of the node. There are three different possible classifications.
     */
    classification: {
      type: n.union([
        n.literal('entity'),
        n.literal('activity'),
        n.literal('agent')
      ]),
    },
  },
  optional: {
    /**
     * The default label. If a provenance node is given no label and not format string is provided, 
     * then this label is used.
     */
    label: {
      type: n.string,
    },
    /**
     * A format string. This template string has access two three variables in it's scope, 
     * including `version` (`number`), `study` (`Study | undefined`) and `node` (`ProvenanceNode`). 
     * The `version` is a integer (starting at `1`) that is unique to the node type within the 
     * study. It is computed using an algorithm that gives a higher number to a node that has more
     * dependencies. If a node does not have a type, it's version number will be set to `0`. An 
     * example template string: `M${version}${study ? ' (' + study.source  + ')' : ''}`. If an 
     * error occurs during the evaluation of the template string, then it is ignored and the next 
     * means to label the node is used.
     * 
     * The following text visualizes an example provenance graph. Each node if either of type `A` 
     * or type `B`. The number that follows each type is a unique identifier.
     * 
     *      ┌── B1
     *      v
     *  ┌── A1
     *  │   ʌ
     *  v   └── A2
     *  A3
     *  ʌ   ┌── B2
     *  │   v
     *  └── B3
     *      ʌ
     *      └── A4
     *          ʌ
     *          └── B4
     * 
     * The `version` numbers for each node are as follows:
     * B1/B3 (0 `B` dependencies each): 1 or 2
     * B2/B4 (1 `B` dependency each): 3 or 4
     * A3 (0 `A` dependencies): 1
     * A1/A4 (1 `A` dependency each): 2 or 3
     * A2 (2 `A` dependencies): 4
     * 
     * 
     * See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) 
     * for more information about template strings.
     */
    labelFormatString: {
      type: n.string,
    },

     /**
     * Defined information fields to display in the node card. To support fields with a set of 
     * options rather than an text field, each field can be defined as follows. If options are 
     * given, the frontend will show a dropdown rather than a text field. You might wonder why
     * this is defined by an array of strings and not an array of objects and that's because
     * Neo4j doesn't support this property types (only arrays of primitive values).
     * 
     * @example "Description"
     * This is the simplest form where "Description" will show up as a text field on the frontend.
     * 
     * @example "Type,optimization,sensitivity analysis,perturbation,parameter scan,steady-state analysis,time course analysis,other"
     * This field, called "Type", will present a dropdown menu with the the values located *after* "Type". The first item should 
     * always be the name of the field and, if present, the options should be comma separated with no spaces between the command 
     * and the values.
     */
    informationFields: {
      type: n.array(n.string),
    },

    /**
     * Whether to show the "Related To" field in the node editor in the frontend. If set to true, this type of node
     * will able to be related to other nodes.
     */
    showRelatedTo: {
      type: n.boolean,
    },
  },
});

/**
 * Each rule describes a relationship that can be formed between types of nodes.
 */
export const RelationshipRuleSchema = n.schema({
  name: 'RelationshipRule',
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    /**
     * The type of the relationship between two nodes. Although all types are technically possible, 
     * rules restrict which types are actually allowed to be made.
     */
    type: {
      type: n.array(RelationshipTypeUnion),
    },
    /**
     * The cardinality of the relationship.
     * 
     * FIXME I don't think this information is actually used when the relationship is validated.
     */
    cardinality: {
      type: n.union([
        n.literal('one-to-one'), 
        n.literal('one-to-many')
      ]),
    },
    /**
     * The definition name of the source.
     */
    source: {
      type: n.string,
    },
    /**
     * The definition name of the target.
     */
    target: {
      type: n.string,
    }
  },
});

export const StudySchema = n.schema({
  name: 'Study',
  required: {
    id: {
      primary: true,
      type: n.string,
    },
  },
  optional: {

    /**
     * The study label. If none is provided, a label is automatically generated.
     */
    label: {
      type: n.string,
    },

    /**
     * The information regarding the source of the model. For example, `Haack et al., PLoS comp. bio. 2015`.
     */
    source: {
      type: n.string,
    },
  },
});

export const InformationFieldSchema = n.schema({
  name: 'InformationField',
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    key: {
      type: n.string,
    },
    value: {
      type: n.string,
    },
  },
});

export const ProvenanceNodeSchema = n.schema({
  name: 'ProvenanceNode',
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    /**
     * The name of the definition of the node.
     * 
     * FIXME If the definition is deleted, then this id will no longer be valid. 
     */
    definitionId: {
      type: n.string,
    },
  },
  optional: {
    /**
     * The study id.
     */
    studyId: {
      type: n.string,
    },

    /**
     * The optional label.
     */
    label: {
      type: n.string,
    },

    /**
     * The facet.
     */
     facet: {
      type: n.string,
    },

    /**
     * The ID of the other node that it is related to.
     * 
     * This was from the following request:
     * We would like to connect simulation data with simulation experiments and requirements with 
     * wet-lab data without actually showing a line. Therefore, I have added "Related to" to the 
     * "informationFields". (A user could just write the label of the corresponding node into this 
     * field, but the label might change and the user might forget to adapt it. We would like to 
     * avoid this.) The value of this field should be the label of the corresponding 
     * sim-experiment/wet-lab data.
     */
    relatedTo: {
      type: n.string,
    }
  },
});

export const InformationRelationshipSchema = n.relationship({
  name: 'HAS_INFORMATION',
  source: ProvenanceNodeSchema,
  target: InformationFieldSchema,
  required: {
    id: {
      primary: true,
      type: n.string,
    },
  },
});

export const DependencyRelationshipSchema = n.relationship({
  name: 'DEPENDS',
  source: ProvenanceNodeSchema,
  target: ProvenanceNodeSchema,
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    type: {
      type: RelationshipTypeUnion,
    },
  },
});

export type ProvenanceNode = n.TypeOf<typeof ProvenanceNodeSchema>;

export type InformationField = n.TypeOf<typeof InformationFieldSchema>;

export type Study = n.TypeOf<typeof StudySchema>;

export type NodeDefinition = n.TypeOf<typeof NodeDefinitionSchema>;

export type RelationshipRule = n.TypeOf<typeof RelationshipRuleSchema>;

export type ProvenanceNodeClassification = NodeDefinition['classification'];

export type DependencyRelationship = n.TypeOf<typeof DependencyRelationshipSchema>;

export type DependencyType = DependencyRelationship['type'];

export type InformationRelationship = n.TypeOf<typeof InformationRelationshipSchema>;
