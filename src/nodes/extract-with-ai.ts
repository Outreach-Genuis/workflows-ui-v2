// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const extract_with_ai: NodeSchema = {
  "id": "extract_with_ai",
  "name": "Extract With AI",
  "description": "Use AI to extract structured data from text",
  "groups": [
    "Variables",
    "AI"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "text": {
      "type": "textarea",
      "required": true,
      "description": "Text to extract from (supports {{placeholders}})"
    },
    "extractionPrompt": {
      "type": "textarea",
      "required": true,
      "description": "Instructions for what to extract",
      "placeholder": "Extract the customer name and phone number from the text"
    },
    "outputFormat": {
      "type": "text",
      "required": false,
      "description": "Expected output format (e.g., \"JSON\", \"plain text\")",
      "default": "plain text"
    }
  },
  "outputs": {
    "extracted": {
      "description": "The extracted data",
      "example": "John Doe, +1-555-0123"
    }
  },
  "branches": {
    "success": {
      "label": "Success",
      "description": "Extraction completed"
    },
    "failed": {
      "label": "Failed",
      "description": "Extraction failed"
    }
  },
  "timeout": 30000,
  "retry": {
    "maxAttempts": 2,
    "backoffMs": 2000,
    "fallbackBranch": "failed"
  }
};
