// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const ask_ai: NodeSchema = {
  "id": "ask_ai",
  "name": "Ask AI",
  "description": "Send a prompt to AI and get a reply. Agent is inferred from the project.",
  "groups": [
    "AI"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "prompt": {
      "type": "textarea",
      "required": true,
      "description": "Prompt to send to the AI (supports {{placeholders}})"
    },
    "systemPrompt": {
      "type": "textarea",
      "required": false,
      "description": "System prompt to set context"
    },
    "conversationId": {
      "type": "text",
      "required": false,
      "description": "Optional conversation ID for context continuity"
    }
  },
  "outputs": {
    "reply": {
      "description": "AI reply text",
      "example": "Hello! How can I help?"
    }
  },
  "branches": {
    "success": {
      "label": "Success",
      "description": "AI replied"
    },
    "failed": {
      "label": "Failed",
      "description": "AI call failed"
    }
  },
  "timeout": 30000,
  "retry": {
    "maxAttempts": 2,
    "backoffMs": 2000,
    "fallbackBranch": "failed"
  }
};
