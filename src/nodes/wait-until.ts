// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const wait_until: NodeSchema = {
  "id": "wait_until",
  "name": "Wait Until",
  "description": "Pause workflow execution for a duration, until a specific time, or for a random delay (jitter)",
  "groups": [
    "Control"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "waitType": {
      "type": "select",
      "required": true,
      "description": "Type of wait",
      "options": [
        {
          "label": "Fixed duration",
          "value": "duration"
        },
        {
          "label": "Until date/time",
          "value": "datetime"
        },
        {
          "label": "Until specific hour",
          "value": "specific_hour"
        },
        {
          "label": "Random delay (jitter)",
          "value": "random_delay"
        }
      ],
      "default": "duration"
    },
    "duration": {
      "type": "number",
      "required": false,
      "description": "How long to wait",
      "visibleWhen": {
        "waitType": "duration"
      },
      "min": 1,
      "default": 5
    },
    "unit": {
      "type": "select",
      "required": false,
      "description": "Duration unit",
      "options": [
        "seconds",
        "minutes",
        "hours",
        "days"
      ],
      "visibleWhen": {
        "waitType": "duration"
      },
      "default": "minutes"
    },
    "targetDatetime": {
      "type": "datetime",
      "required": false,
      "description": "Wait until this date/time",
      "visibleWhen": {
        "waitType": "datetime"
      }
    },
    "hourOfDay": {
      "type": "number",
      "required": false,
      "description": "Wait until this hour (0-23)",
      "visibleWhen": {
        "waitType": "specific_hour"
      },
      "min": 0,
      "max": 23
    },
    "timezone": {
      "type": "text",
      "required": false,
      "description": "Timezone — auto-detected from account settings if empty",
      "default": ""
    },
    "minDelay": {
      "type": "number",
      "required": false,
      "description": "Minimum delay",
      "visibleWhen": {
        "waitType": "random_delay"
      },
      "min": 0,
      "default": 1
    },
    "maxDelay": {
      "type": "number",
      "required": false,
      "description": "Maximum delay",
      "visibleWhen": {
        "waitType": "random_delay"
      },
      "min": 1,
      "default": 10
    },
    "jitterUnit": {
      "type": "select",
      "required": false,
      "description": "Jitter delay unit",
      "options": [
        "seconds",
        "minutes",
        "hours"
      ],
      "visibleWhen": {
        "waitType": "random_delay"
      },
      "default": "minutes"
    }
  },
  "outputs": {
    "waitedMs": {
      "description": "Milliseconds waited",
      "example": 300000
    },
    "resumedAt": {
      "description": "ISO timestamp when workflow resumed",
      "example": "2026-04-13T10:05:00Z"
    }
  },
  "branches": {
    "resumed": {
      "label": "Resumed",
      "description": "Wait period completed"
    }
  },
  "timeout": 604800000
};
