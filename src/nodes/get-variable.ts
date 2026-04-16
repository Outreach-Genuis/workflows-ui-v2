// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const get_variable: NodeSchema = {
  "id": "get_variable",
  "name": "Get Variable",
  "description": "Retrieve a stored variable value by its unique key",
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
    }
  },
  "outputs": {
    "value": {
      "description": "The stored value",
      "example": "some-value"
    },
    "found": {
      "description": "Whether the variable was found",
      "example": true
    }
  },
  "branches": {
    "found": {
      "label": "Found",
      "description": "Variable exists"
    },
    "not_found": {
      "label": "Not Found",
      "description": "Variable not found"
    }
  }
};
