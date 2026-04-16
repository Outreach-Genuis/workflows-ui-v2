// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const add_tag_to_lead: NodeSchema = {
  "id": "add_tag_to_lead",
  "name": "Add Tag to Lead",
  "description": "Add a tag to the current lead",
  "groups": [
    "Leads"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "tagId": {
      "type": "select",
      "required": true,
      "description": "Tag to add",
      "tag": "tag-selector"
    }
  },
  "outputs": {
    "tagged": {
      "description": "Whether the tag was added",
      "example": true
    },
    "leadId": {
      "description": "Lead ID",
      "example": "lead-uuid"
    },
    "tagId": {
      "description": "Tag ID",
      "example": "tag-uuid"
    }
  },
  "branches": {
    "success": {
      "label": "Success",
      "description": "Tag added to lead"
    }
  }
};
