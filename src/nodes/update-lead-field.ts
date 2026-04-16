// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const update_lead_field: NodeSchema = {
  "id": "update_lead_field",
  "name": "Update Lead Field",
  "description": "Update a field on the current lead",
  "groups": [
    "Leads"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "field": {
      "type": "select",
      "required": true,
      "description": "Lead field to update",
      "options": [
        "firstName",
        "lastName",
        "email",
        "phone",
        "street_address",
        "city",
        "state",
        "zip_code",
        "country",
        "industry",
        "company_size"
      ]
    },
    "value": {
      "type": "text",
      "required": true,
      "description": "New value (supports {{placeholders}})"
    }
  },
  "outputs": {
    "updated": {
      "description": "Whether the field was updated",
      "example": true
    },
    "field": {
      "description": "Field that was updated",
      "example": "email"
    },
    "value": {
      "description": "New value",
      "example": "john@example.com"
    }
  },
  "branches": {
    "success": {
      "label": "Success",
      "description": "Lead field updated"
    }
  }
};
