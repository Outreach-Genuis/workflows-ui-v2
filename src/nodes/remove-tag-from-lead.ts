// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const remove_tag_from_lead: NodeSchema = {
  "id": "remove_tag_from_lead",
  "name": "Remove Tag from Lead",
  "description": "Remove a tag from the current lead",
  "groups": [
    "Leads"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "tagId": {
      "type": "select",
      "required": true,
      "description": "Tag to remove",
      "tag": "tag-selector"
    }
  },
  "outputs": {
    "removed": {
      "description": "Whether the tag was removed",
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
      "description": "Tag removed from lead"
    }
  }
};
