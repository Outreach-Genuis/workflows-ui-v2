// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const get_constant: NodeSchema = {
  "id": "get_constant",
  "name": "Get Constant",
  "description": "Look up a constant value by key",
  "groups": [
    "Variables"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "constantKey": {
      "type": "text",
      "required": true,
      "description": "Constant key to look up",
      "tag": "constant-selector"
    }
  },
  "outputs": {
    "value": {
      "description": "The constant value",
      "example": "constant-value"
    }
  },
  "branches": {
    "success": {
      "label": "Success",
      "description": "Constant retrieved"
    }
  }
};
