// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const call_mcp_tool: NodeSchema = {
  "id": "call_mcp_tool",
  "name": "Call MCP Tool",
  "description": "Invoke any MCP API tool (e.g., HubSpot, ServiceTitan)",
  "groups": [
    "MCP"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "apiId": {
      "type": "select",
      "required": true,
      "description": "MCP API to call (populated from project MCP configs)",
      "tag": "mcp-api-selector"
    },
    "toolId": {
      "type": "select",
      "required": true,
      "description": "Tool to invoke (populated based on selected API)",
      "tag": "mcp-tool-selector"
    },
    "params": {
      "type": "json",
      "required": false,
      "description": "Tool parameters as JSON (supports {{lead.phone}} placeholders)",
      "default": {}
    }
  },
  "outputs": {
    "toolCallId": {
      "description": "ID of the MCP tool call record",
      "example": "tc-uuid-123"
    },
    "result": {
      "description": "Tool output (JSON)",
      "example": {
        "success": true
      }
    },
    "error": {
      "description": "Error message if failed",
      "example": ""
    }
  },
  "branches": {
    "success": {
      "label": "Success",
      "description": "Tool executed successfully"
    },
    "error": {
      "label": "Error",
      "description": "Tool execution failed"
    }
  },
  "timeout": 60000,
  "retry": {
    "maxAttempts": 2,
    "backoffMs": 3000,
    "fallbackBranch": "error"
  }
};
