// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const on_mcp_called: NodeSchema = {
  "id": "on_mcp_called",
  "name": "On MCP Tool Called",
  "description": "Triggers when a specific MCP tool is called",
  "groups": [
    "MCP",
    "Triggers"
  ],
  "isTrigger": true,
  "isGlobalTrigger": true,
  "inputs": {
    "apiId": {
      "type": "select",
      "required": true,
      "description": "MCP API to listen for",
      "tag": "mcp-api-selector"
    },
    "toolId": {
      "type": "select",
      "required": true,
      "description": "Tool to listen for",
      "tag": "mcp-tool-selector"
    }
  },
  "outputs": {
    "toolCallId": {
      "description": "ID of the tool call",
      "example": "tc-uuid"
    },
    "apiId": {
      "description": "MCP API ID",
      "example": "hubspot"
    },
    "toolId": {
      "description": "Tool ID",
      "example": "createContact"
    },
    "toolInput": {
      "description": "Input passed to the tool",
      "example": {
        "phone": "+1234567890"
      }
    },
    "toolOutput": {
      "description": "Output returned by the tool",
      "example": {
        "contactId": "123"
      }
    },
    "sessionId": {
      "description": "MCP session ID",
      "example": "sess-uuid"
    }
  },
  "branches": {
    "called": {
      "label": "Called",
      "description": "MCP tool was called"
    }
  }
};
