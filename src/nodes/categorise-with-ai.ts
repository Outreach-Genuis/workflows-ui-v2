// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const categorise_with_ai: NodeSchema = {
  "id": "categorise_with_ai",
  "name": "Categorise With AI",
  "description": "Use AI to categorise text into one of up to 6 categories, with a branch per category",
  "groups": [
    "AI"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "text": {
      "type": "textarea",
      "required": true,
      "description": "Text to categorise (supports {{placeholders}})"
    },
    "category1": {
      "type": "text",
      "required": true,
      "description": "Category 1 name"
    },
    "description1": {
      "type": "text",
      "required": false,
      "description": "Category 1 description"
    },
    "category2": {
      "type": "text",
      "required": true,
      "description": "Category 2 name"
    },
    "description2": {
      "type": "text",
      "required": false,
      "description": "Category 2 description"
    },
    "category3": {
      "type": "text",
      "required": false,
      "description": "Category 3 name"
    },
    "description3": {
      "type": "text",
      "required": false,
      "description": "Category 3 description"
    },
    "category4": {
      "type": "text",
      "required": false,
      "description": "Category 4 name"
    },
    "description4": {
      "type": "text",
      "required": false,
      "description": "Category 4 description"
    },
    "category5": {
      "type": "text",
      "required": false,
      "description": "Category 5 name"
    },
    "description5": {
      "type": "text",
      "required": false,
      "description": "Category 5 description"
    },
    "category6": {
      "type": "text",
      "required": false,
      "description": "Category 6 name"
    },
    "description6": {
      "type": "text",
      "required": false,
      "description": "Category 6 description"
    }
  },
  "outputs": {
    "category": {
      "description": "The matched category name",
      "example": "interested"
    },
    "confidence": {
      "description": "AI confidence score (0-1)",
      "example": 0.85
    }
  },
  "branches": {
    "category1": {
      "label": "Category 1",
      "description": "Matched category 1"
    },
    "category2": {
      "label": "Category 2",
      "description": "Matched category 2"
    },
    "category3": {
      "label": "Category 3",
      "description": "Matched category 3"
    },
    "category4": {
      "label": "Category 4",
      "description": "Matched category 4"
    },
    "category5": {
      "label": "Category 5",
      "description": "Matched category 5"
    },
    "category6": {
      "label": "Category 6",
      "description": "Matched category 6"
    },
    "unknown": {
      "label": "Unknown",
      "description": "No category matched"
    }
  },
  "timeout": 30000,
  "retry": {
    "maxAttempts": 2,
    "backoffMs": 2000,
    "fallbackBranch": "unknown"
  }
};
