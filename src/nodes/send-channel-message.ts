// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const send_channel_message: NodeSchema = {
  "id": "send_channel_message",
  "name": "Send Channel Message",
  "description": "Send an outbound message via any channel. Includes rate limiting, lead cooldown, and business hours guards with configurable wait/skip behavior. Resolves after AI analysis.",
  "groups": [
    "Channels"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "channel": {
      "type": "select",
      "options": [
        "voice",
        "sms",
        "whatsapp",
        "email"
      ],
      "required": true,
      "description": "Communication channel to use"
    },
    "content": {
      "type": "textarea",
      "required": false,
      "description": "Message content (optional for voice — agent handles conversation)"
    },
    "subject": {
      "type": "text",
      "required": false,
      "description": "Email subject line",
      "visibleWhen": {
        "channel": "email"
      }
    },
    "agentOverride": {
      "type": "custom",
      "tag": "agent-overrides",
      "required": false,
      "description": "Override agent parameters for this step"
    },
    "maxPerDay": {
      "type": "number",
      "required": false,
      "description": "Max outbound messages to this lead per day (0 = unlimited)",
      "default": 0,
      "min": 0
    },
    "rateLimitBehavior": {
      "type": "select",
      "required": false,
      "description": "What to do when rate limit is hit",
      "options": [
        {
          "label": "Skip (take skipped branch)",
          "value": "skip"
        },
        {
          "label": "Wait (retry after midnight)",
          "value": "wait"
        }
      ],
      "default": "skip",
      "visibleWhen": {
        "maxPerDay": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ]
      }
    },
    "minHoursSinceLastContact": {
      "type": "number",
      "required": false,
      "description": "Minimum hours since last contact before sending (0 = no cooldown)",
      "default": 0,
      "min": 0
    },
    "cooldownBehavior": {
      "type": "select",
      "required": false,
      "description": "What to do when cooldown has not elapsed",
      "options": [
        {
          "label": "Skip (take skipped branch)",
          "value": "skip"
        },
        {
          "label": "Wait (hold until cooldown elapses)",
          "value": "wait"
        }
      ],
      "default": "wait",
      "visibleWhen": {
        "minHoursSinceLastContact": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "8",
          "12",
          "24",
          "48"
        ]
      }
    },
    "businessHoursOnly": {
      "type": "boolean",
      "required": false,
      "description": "Only send during business hours",
      "default": false
    },
    "businessHoursBehavior": {
      "type": "select",
      "required": false,
      "description": "What to do outside business hours",
      "options": [
        {
          "label": "Skip (take skipped branch)",
          "value": "skip"
        },
        {
          "label": "Wait (hold until business hours)",
          "value": "wait"
        }
      ],
      "default": "wait",
      "visibleWhen": {
        "businessHoursOnly": "true"
      }
    }
  },
  "outputs": {
    "conversationId": {
      "description": "ID of the created conversation",
      "example": "conv-uuid-123"
    },
    "status": {
      "description": "Final status (completed, failed, skipped)",
      "example": "completed"
    },
    "error": {
      "description": "Error message if failed",
      "example": ""
    },
    "skipReason": {
      "description": "Why the send was skipped (rate_limit, cooldown, outside_business_hours)",
      "example": ""
    },
    "waitedMs": {
      "description": "How long the node waited before sending (guards + channel)",
      "example": 0
    },
    "summary": {
      "description": "AI-generated summary of the conversation",
      "example": "Lead expressed interest in scheduling a demo next week."
    },
    "sentiment": {
      "description": "Detected sentiment (positive, negative, neutral)",
      "example": "positive"
    },
    "sentimentScore": {
      "description": "Sentiment confidence score (0.0-1.0)",
      "example": "0.85"
    },
    "classification": {
      "description": "Conversation classification (e.g. Appointment, Voicemail, Not Answered)",
      "example": "Appointment"
    },
    "outcome": {
      "description": "Call outcome evaluation",
      "example": "pass"
    },
    "transcript": {
      "description": "Full conversation transcript",
      "example": "AI: Hello! ..."
    },
    "durationSeconds": {
      "description": "Conversation duration in seconds",
      "example": 120
    }
  },
  "branches": {
    "sent": {
      "label": "Sent",
      "description": "Message sent and conversation analyzed"
    },
    "failed": {
      "label": "Failed",
      "description": "Send failed"
    },
    "skipped": {
      "label": "Skipped",
      "description": "Skipped due to rate limit, cooldown, or business hours"
    }
  },
  "timeout": 86400000,
  "retry": {
    "maxAttempts": 2,
    "backoffMs": 5000,
    "fallbackBranch": "failed"
  }
};
