// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const check_condition: NodeSchema = {
  "id": "check_condition",
  "name": "Check Condition",
  "description": "Evaluate a condition and branch based on the result",
  "groups": [
    "Control"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "value": {
      "type": "text",
      "required": true,
      "description": "Value to check (supports {{placeholders}})"
    },
    "operator": {
      "type": "select",
      "required": true,
      "description": "Comparison operator",
      "options": [
        "equals",
        "not_equals",
        "contains",
        "not_contains",
        "starts_with",
        "ends_with",
        "regex",
        "greater_than",
        "less_than",
        "is_empty",
        "is_not_empty",
        "ai_question"
      ],
      "reactive": {
        "operatorsFor": {
          "siblingField": "value"
        }
      }
    },
    "compareTo": {
      "type": "text",
      "required": false,
      "description": "Value to compare against",
      "reactive": {
        "optionsFrom": {
          "siblingField": "value"
        },
        "typeFrom": {
          "siblingField": "value"
        }
      },
      "visibleWhen": {
        "operator": [
          "equals",
          "not_equals",
          "contains",
          "not_contains",
          "starts_with",
          "ends_with",
          "regex",
          "greater_than",
          "less_than"
        ]
      }
    },
    "aiPrompt": {
      "type": "textarea",
      "required": false,
      "description": "AI question to evaluate (for ai_question operator)",
      "visibleWhen": {
        "operator": "ai_question"
      }
    }
  },
  "outputs": {
    "matched": {
      "description": "Whether the condition matched",
      "example": true
    },
    "value": {
      "description": "The evaluated value",
      "example": "test"
    }
  },
  "branches": {
    "true": {
      "label": "True",
      "description": "Condition is true"
    },
    "false": {
      "label": "False",
      "description": "Condition is false"
    }
  }
};
