// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const split_for_test: NodeSchema = {
  "id": "split_for_test",
  "name": "A/B Split",
  "description": "Randomly route leads into two groups for A/B testing",
  "groups": [
    "Control"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "splitPercentage": {
      "type": "number",
      "required": true,
      "description": "Percentage of leads routed to Group A (0-100)",
      "min": 0,
      "max": 100,
      "default": 50
    }
  },
  "outputs": {
    "group": {
      "description": "Which group the lead was routed to",
      "example": "a"
    },
    "random": {
      "description": "Random number used for the split (0-100)",
      "example": 42
    }
  },
  "branches": {
    "a": {
      "label": "Group A",
      "description": "Lead routed to group A"
    },
    "b": {
      "label": "Group B",
      "description": "Lead routed to group B"
    }
  }
};
