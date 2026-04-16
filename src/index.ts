// AUTO-GENERATED — do not edit manually

export type { NodeSchema, NodeFieldDef, NodeOutputDef, BranchDef } from "./types";

import { on_lead_added } from "./nodes/on-lead-added";
import { send_channel_message } from "./nodes/send-channel-message";
import { on_channel_inbound } from "./nodes/on-channel-inbound";
import { call_mcp_tool } from "./nodes/call-mcp-tool";
import { on_mcp_called } from "./nodes/on-mcp-called";
import { check_condition } from "./nodes/check-condition";
import { wait_until } from "./nodes/wait-until";
import { split_for_test } from "./nodes/split-for-test";
import { get_variable } from "./nodes/get-variable";
import { set_variable } from "./nodes/set-variable";
import { get_constant } from "./nodes/get-constant";
import { extract_with_ai } from "./nodes/extract-with-ai";
import { add_tag_to_lead } from "./nodes/add-tag-to-lead";
import { remove_tag_from_lead } from "./nodes/remove-tag-from-lead";
import { update_lead_field } from "./nodes/update-lead-field";
import { ask_ai } from "./nodes/ask-ai";
import { categorise_with_ai } from "./nodes/categorise-with-ai";

export const nodes = {
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
  categorise_with_ai,
} as const;

export type NodeId = keyof typeof nodes;
