// AUTO-GENERATED from og-workflows defineNode()
import type { NodeSchema } from "../types";

export const on_channel_inbound: NodeSchema = {
  "id": "on_channel_inbound",
  "name": "On Channel Inbound",
  "description": "Triggers when an inbound message or call arrives on any channel",
  "groups": [
    "Channels",
    "Triggers"
  ],
  "isTrigger": true,
  "isGlobalTrigger": true,
  "inputs": {
    "channel": {
      "type": "select",
      "options": [
        "any",
        "voice",
        "sms",
        "whatsapp",
        "email"
      ],
      "required": true,
      "description": "Channel to listen on (or \"any\" for all channels)",
      "default": "any"
    }
  },
  "outputs": {
    "conversationId": {
      "description": "Conversation ID",
      "example": "conv-uuid",
      "type": "string",
      "group": "core"
    },
    "leadId": {
      "description": "Lead who sent the message",
      "example": "lead-uuid",
      "type": "string",
      "group": "core"
    },
    "agentId": {
      "description": "Agent handling this conversation",
      "example": "agent-uuid",
      "type": "string",
      "group": "core"
    },
    "credentialId": {
      "description": "Credential used for the channel",
      "example": "cred-uuid",
      "type": "string",
      "group": "core"
    },
    "channel": {
      "description": "Channel the message arrived on",
      "example": "sms",
      "type": "enum",
      "enum": [
        "voice",
        "sms",
        "email",
        "whatsapp"
      ],
      "group": "core"
    },
    "provider": {
      "description": "Channel provider",
      "example": "twilio",
      "type": "string",
      "group": "core"
    },
    "direction": {
      "description": "Always \"inbound\"",
      "example": "inbound",
      "type": "enum",
      "enum": [
        "inbound",
        "outbound"
      ],
      "group": "core"
    },
    "status": {
      "description": "Conversation status",
      "example": "in-progress",
      "type": "enum",
      "enum": [
        "pending",
        "in-progress",
        "hijacked",
        "completed",
        "failed"
      ],
      "group": "core",
      "color": {
        "pending": "gray",
        "in-progress": "blue",
        "completed": "green",
        "failed": "red",
        "hijacked": "amber"
      }
    },
    "from": {
      "description": "Sender address (phone or email)",
      "example": "+1234567890",
      "type": "string",
      "format": "phone",
      "group": "sender"
    },
    "content": {
      "description": "Message content (empty for voice)",
      "example": "Hello!",
      "type": "string",
      "group": "sender"
    },
    "startedAt": {
      "description": "When the conversation started",
      "example": "2025-01-01 12:00:00",
      "type": "date",
      "format": "datetime",
      "group": "timestamps"
    },
    "createdAt": {
      "description": "Record creation timestamp",
      "example": "2025-01-01 12:00:00",
      "type": "date",
      "format": "datetime",
      "group": "timestamps"
    },
    "duration": {
      "description": "Call duration in seconds",
      "example": 120,
      "type": "number",
      "format": "duration",
      "group": "voice",
      "channel": "voice"
    },
    "recordingUrl": {
      "description": "Call recording URL",
      "example": "https://...",
      "type": "string",
      "format": "url",
      "group": "voice",
      "channel": "voice"
    },
    "transcript": {
      "description": "Call transcript",
      "example": "Hi, I am...",
      "type": "string",
      "group": "voice",
      "channel": "voice"
    },
    "outcome": {
      "description": "Call outcome",
      "example": "appointment_booked",
      "type": "enum",
      "enum": [
        "appointment_booked",
        "callback_requested",
        "not_interested",
        "voicemail",
        "no_answer",
        "other"
      ],
      "color": {
        "appointment_booked": "green",
        "callback_requested": "blue",
        "not_interested": "red",
        "voicemail": "gray",
        "no_answer": "gray"
      },
      "group": "voice",
      "channel": "voice"
    },
    "classification": {
      "description": "Call classification",
      "example": "positive",
      "type": "enum",
      "enum": [
        "positive",
        "negative",
        "neutral"
      ],
      "color": {
        "positive": "green",
        "negative": "red",
        "neutral": "gray"
      },
      "group": "voice",
      "channel": "voice"
    },
    "summary": {
      "description": "Call summary",
      "example": "Discussed pricing...",
      "type": "string",
      "group": "voice",
      "channel": "voice"
    },
    "subject": {
      "description": "Email subject line",
      "example": "Re: Your inquiry",
      "type": "string",
      "group": "email",
      "channel": "email"
    },
    "threadId": {
      "description": "Email thread ID",
      "example": "thread-123",
      "type": "string",
      "group": "email",
      "channel": "email"
    },
    "mediaUrl": {
      "description": "Media attachment URL",
      "example": "https://...",
      "type": "string",
      "format": "url",
      "group": "whatsapp",
      "channel": "whatsapp"
    }
  },
  "branches": {
    "received": {
      "label": "Received",
      "description": "Inbound message received"
    }
  }
};
