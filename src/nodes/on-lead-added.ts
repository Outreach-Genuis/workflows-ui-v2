// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const on_lead_added: NodeSchema = {
  "id": "on_lead_added",
  "name": "On Lead Added",
  "description": "Triggers when a lead is added to the project",
  "groups": [
    "Triggers"
  ],
  "isTrigger": true,
  "isGlobalTrigger": true,
  "inputs": {
    "mode": {
      "type": "select",
      "options": [
        "immediate",
        "spread"
      ],
      "required": true,
      "description": "When to fire the workflow for each lead",
      "default": "immediate"
    },
    "targetingOrder": {
      "type": "select",
      "options": [
        "newest_first",
        "oldest_first",
        "priority"
      ],
      "required": false,
      "description": "Order in which leads are processed",
      "default": "newest_first"
    },
    "callsPerDay": {
      "type": "number",
      "required": false,
      "description": "Maximum leads to process per day (spread mode)",
      "visibleWhen": {
        "mode": "spread"
      },
      "min": 1,
      "max": 10000
    }
  },
  "outputs": {
    "leadId": {
      "description": "ID of the added lead",
      "example": "uuid-123",
      "type": "string"
    }
  },
  "branches": {
    "triggered": {
      "label": "Triggered",
      "description": "Lead added and workflow triggered"
    }
  }
};
