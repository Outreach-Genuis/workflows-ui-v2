// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const set_variable: NodeSchema = {
  "id": "set_variable",
  "name": "Set Variable",
  "description": "Store a variable value with a unique key (upsert)",
  "groups": [
    "Variables"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "uniqueKey": {
      "type": "text",
      "required": true,
      "description": "Unique key for the variable"
    },
    "name": {
      "type": "text",
      "required": true,
      "description": "Display name for the variable"
    },
    "value": {
      "type": "textarea",
      "required": true,
      "description": "Value to store (supports {{placeholders}})"
    }
  },
  "outputs": {
    "stored": {
      "description": "Whether the value was stored",
      "example": true
    }
  },
  "branches": {
    "success": {
      "label": "Success",
      "description": "Variable stored"
    }
  }
};
