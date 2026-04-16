// src/nodes/on-lead-added.ts
var on_lead_added = {
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
      "max": 1e4
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

// src/nodes/send-channel-message.ts
var send_channel_message = {
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
      "description": "Message content (optional for voice \u2014 agent handles conversation)"
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
  "timeout": 864e5,
  "retry": {
    "maxAttempts": 2,
    "backoffMs": 5e3,
    "fallbackBranch": "failed"
  }
};

// src/nodes/on-channel-inbound.ts
var on_channel_inbound = {
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
      "description": 'Channel to listen on (or "any" for all channels)',
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
      "description": 'Always "inbound"',
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

// src/nodes/call-mcp-tool.ts
var call_mcp_tool = {
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
  "timeout": 6e4,
  "retry": {
    "maxAttempts": 2,
    "backoffMs": 3e3,
    "fallbackBranch": "error"
  }
};

// src/nodes/on-mcp-called.ts
var on_mcp_called = {
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

// src/nodes/check-condition.ts
var check_condition = {
  "id": "check_condition",
  "name": "Check Condition",
  "description": "Evaluate a condition and branch based on the result",
  "groups": [
    "Control"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "value": {
      "type": "text",
      "required": true,
      "description": "Value to check (supports {{placeholders}})"
    },
    "operator": {
      "type": "select",
      "required": true,
      "description": "Comparison operator",
      "options": [
        "equals",
        "not_equals",
        "contains",
        "not_contains",
        "starts_with",
        "ends_with",
        "regex",
        "greater_than",
        "less_than",
        "is_empty",
        "is_not_empty",
        "ai_question"
      ],
      "reactive": {
        "operatorsFor": {
          "siblingField": "value"
        }
      }
    },
    "compareTo": {
      "type": "text",
      "required": false,
      "description": "Value to compare against",
      "reactive": {
        "optionsFrom": {
          "siblingField": "value"
        },
        "typeFrom": {
          "siblingField": "value"
        }
      },
      "visibleWhen": {
        "operator": [
          "equals",
          "not_equals",
          "contains",
          "not_contains",
          "starts_with",
          "ends_with",
          "regex",
          "greater_than",
          "less_than"
        ]
      }
    },
    "aiPrompt": {
      "type": "textarea",
      "required": false,
      "description": "AI question to evaluate (for ai_question operator)",
      "visibleWhen": {
        "operator": "ai_question"
      }
    }
  },
  "outputs": {
    "matched": {
      "description": "Whether the condition matched",
      "example": true
    },
    "value": {
      "description": "The evaluated value",
      "example": "test"
    }
  },
  "branches": {
    "true": {
      "label": "True",
      "description": "Condition is true"
    },
    "false": {
      "label": "False",
      "description": "Condition is false"
    }
  }
};

// src/nodes/wait-until.ts
var wait_until = {
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
      "description": "Timezone \u2014 auto-detected from account settings if empty",
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
      "example": 3e5
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
  "timeout": 6048e5
};

// src/nodes/split-for-test.ts
var split_for_test = {
  "id": "split_for_test",
  "name": "A/B Split",
  "description": "Randomly route leads into two groups for A/B testing",
  "groups": [
    "Control"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "splitPercentage": {
      "type": "number",
      "required": true,
      "description": "Percentage of leads routed to Group A (0-100)",
      "min": 0,
      "max": 100,
      "default": 50
    }
  },
  "outputs": {
    "group": {
      "description": "Which group the lead was routed to",
      "example": "a"
    },
    "random": {
      "description": "Random number used for the split (0-100)",
      "example": 42
    }
  },
  "branches": {
    "a": {
      "label": "Group A",
      "description": "Lead routed to group A"
    },
    "b": {
      "label": "Group B",
      "description": "Lead routed to group B"
    }
  }
};

// src/nodes/get-variable.ts
var get_variable = {
  "id": "get_variable",
  "name": "Get Variable",
  "description": "Retrieve a stored variable value by its unique key",
  "groups": [
    "Variables"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "uniqueKey": {
      "type": "text",
      "required": true,
      "description": "Unique key for the variable"
    }
  },
  "outputs": {
    "value": {
      "description": "The stored value",
      "example": "some-value"
    },
    "found": {
      "description": "Whether the variable was found",
      "example": true
    }
  },
  "branches": {
    "found": {
      "label": "Found",
      "description": "Variable exists"
    },
    "not_found": {
      "label": "Not Found",
      "description": "Variable not found"
    }
  }
};

// src/nodes/set-variable.ts
var set_variable = {
  "id": "set_variable",
  "name": "Set Variable",
  "description": "Store a variable value with a unique key (upsert)",
  "groups": [
    "Variables"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "uniqueKey": {
      "type": "text",
      "required": true,
      "description": "Unique key for the variable"
    },
    "name": {
      "type": "text",
      "required": true,
      "description": "Display name for the variable"
    },
    "value": {
      "type": "textarea",
      "required": true,
      "description": "Value to store (supports {{placeholders}})"
    }
  },
  "outputs": {
    "stored": {
      "description": "Whether the value was stored",
      "example": true
    }
  },
  "branches": {
    "success": {
      "label": "Success",
      "description": "Variable stored"
    }
  }
};

// src/nodes/get-constant.ts
var get_constant = {
  "id": "get_constant",
  "name": "Get Constant",
  "description": "Look up a constant value by key",
  "groups": [
    "Variables"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "constantKey": {
      "type": "text",
      "required": true,
      "description": "Constant key to look up",
      "tag": "constant-selector"
    }
  },
  "outputs": {
    "value": {
      "description": "The constant value",
      "example": "constant-value"
    }
  },
  "branches": {
    "success": {
      "label": "Success",
      "description": "Constant retrieved"
    }
  }
};

// src/nodes/extract-with-ai.ts
var extract_with_ai = {
  "id": "extract_with_ai",
  "name": "Extract With AI",
  "description": "Use AI to extract structured data from text",
  "groups": [
    "Variables",
    "AI"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "text": {
      "type": "textarea",
      "required": true,
      "description": "Text to extract from (supports {{placeholders}})"
    },
    "extractionPrompt": {
      "type": "textarea",
      "required": true,
      "description": "Instructions for what to extract",
      "placeholder": "Extract the customer name and phone number from the text"
    },
    "outputFormat": {
      "type": "text",
      "required": false,
      "description": 'Expected output format (e.g., "JSON", "plain text")',
      "default": "plain text"
    }
  },
  "outputs": {
    "extracted": {
      "description": "The extracted data",
      "example": "John Doe, +1-555-0123"
    }
  },
  "branches": {
    "success": {
      "label": "Success",
      "description": "Extraction completed"
    },
    "failed": {
      "label": "Failed",
      "description": "Extraction failed"
    }
  },
  "timeout": 3e4,
  "retry": {
    "maxAttempts": 2,
    "backoffMs": 2e3,
    "fallbackBranch": "failed"
  }
};

// src/nodes/add-tag-to-lead.ts
var add_tag_to_lead = {
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

// src/nodes/remove-tag-from-lead.ts
var remove_tag_from_lead = {
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

// src/nodes/update-lead-field.ts
var update_lead_field = {
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

// src/nodes/ask-ai.ts
var ask_ai = {
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
  "timeout": 3e4,
  "retry": {
    "maxAttempts": 2,
    "backoffMs": 2e3,
    "fallbackBranch": "failed"
  }
};

// src/nodes/categorise-with-ai.ts
var categorise_with_ai = {
  "id": "categorise_with_ai",
  "name": "Categorise With AI",
  "description": "Use AI to categorise text into one of up to 6 categories, with a branch per category",
  "groups": [
    "AI"
  ],
  "isTrigger": false,
  "isGlobalTrigger": false,
  "inputs": {
    "text": {
      "type": "textarea",
      "required": true,
      "description": "Text to categorise (supports {{placeholders}})"
    },
    "category1": {
      "type": "text",
      "required": true,
      "description": "Category 1 name"
    },
    "description1": {
      "type": "text",
      "required": false,
      "description": "Category 1 description"
    },
    "category2": {
      "type": "text",
      "required": true,
      "description": "Category 2 name"
    },
    "description2": {
      "type": "text",
      "required": false,
      "description": "Category 2 description"
    },
    "category3": {
      "type": "text",
      "required": false,
      "description": "Category 3 name"
    },
    "description3": {
      "type": "text",
      "required": false,
      "description": "Category 3 description"
    },
    "category4": {
      "type": "text",
      "required": false,
      "description": "Category 4 name"
    },
    "description4": {
      "type": "text",
      "required": false,
      "description": "Category 4 description"
    },
    "category5": {
      "type": "text",
      "required": false,
      "description": "Category 5 name"
    },
    "description5": {
      "type": "text",
      "required": false,
      "description": "Category 5 description"
    },
    "category6": {
      "type": "text",
      "required": false,
      "description": "Category 6 name"
    },
    "description6": {
      "type": "text",
      "required": false,
      "description": "Category 6 description"
    }
  },
  "outputs": {
    "category": {
      "description": "The matched category name",
      "example": "interested"
    },
    "confidence": {
      "description": "AI confidence score (0-1)",
      "example": 0.85
    }
  },
  "branches": {
    "category1": {
      "label": "Category 1",
      "description": "Matched category 1"
    },
    "category2": {
      "label": "Category 2",
      "description": "Matched category 2"
    },
    "category3": {
      "label": "Category 3",
      "description": "Matched category 3"
    },
    "category4": {
      "label": "Category 4",
      "description": "Matched category 4"
    },
    "category5": {
      "label": "Category 5",
      "description": "Matched category 5"
    },
    "category6": {
      "label": "Category 6",
      "description": "Matched category 6"
    },
    "unknown": {
      "label": "Unknown",
      "description": "No category matched"
    }
  },
  "timeout": 3e4,
  "retry": {
    "maxAttempts": 2,
    "backoffMs": 2e3,
    "fallbackBranch": "unknown"
  }
};

// src/index.ts
var nodes = {
  on_lead_added,
  send_channel_message,
  on_channel_inbound,
  call_mcp_tool,
  on_mcp_called,
  check_condition,
  wait_until,
  split_for_test,
  get_variable,
  set_variable,
  get_constant,
  extract_with_ai,
  add_tag_to_lead,
  remove_tag_from_lead,
  update_lead_field,
  ask_ai,
  categorise_with_ai
};
export {
  nodes
};
