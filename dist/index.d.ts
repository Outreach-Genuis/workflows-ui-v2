interface NodeFieldDef {
    type: 'text' | 'number' | 'boolean' | 'textarea' | 'select' | 'multiselect' | 'custom' | 'date' | 'datetime' | 'json';
    description: string;
    required?: boolean;
    placeholder?: string;
    default?: unknown;
    /** For select/multiselect */
    options?: string[] | {
        label: string;
        value: string;
    }[];
    /** For number */
    min?: number;
    max?: number;
    /** Conditional visibility based on sibling field values */
    visibleWhen?: Record<string, string | string[]>;
    /** Custom tag for special UI rendering (e.g., "agent-selector") */
    tag?: string;
    /**
     * Reactive behavior — adapt this field's rendering based on sibling field
     * values and the upstream output metadata they reference.
     *
     * The UI resolves the sibling field's value → finds the upstream output's
     * NodeOutputDef → uses its type/enum/format to adapt this field.
     */
    reactive?: {
        /**
         * Pull options from the upstream output's `enum` list.
         * E.g. "compareTo" gets its dropdown options from the output that "value" references.
         */
        optionsFrom?: {
            siblingField: string;
        };
        /**
         * Switch this field's input type based on the upstream output's `type`.
         * E.g. render as number input when comparing to a number output.
         */
        typeFrom?: {
            siblingField: string;
        };
        /**
         * Filter available operator options based on the upstream output's `type`.
         * E.g. hide "greater_than" when comparing strings, hide "contains" for numbers.
         */
        operatorsFor?: {
            siblingField: string;
        };
        /**
         * Override this field's visibility based on the upstream output's metadata.
         * Key is the output property to check, value is the required value(s).
         * E.g. `{ type: ["enum"] }` → only show this field when the output is an enum.
         */
        visibleWhenOutput?: Record<string, string | string[]>;
    };
}
interface NodeOutputDef {
    description: string;
    example: unknown;
    /** Data type of this output. Drives operator filtering and input rendering. */
    type?: 'string' | 'number' | 'boolean' | 'enum' | 'date' | 'array';
    /** Valid values when type is "enum". Rendered as dropdown in condition builder. */
    enum?: string[];
    /** How to render the value in the UI. */
    format?: 'phone' | 'email' | 'url' | 'currency' | 'duration' | 'datetime' | 'percent';
    /** Map enum values to colors for badge rendering. */
    color?: Record<string, string>;
    /** Group name for organizing outputs in the picker UI. */
    group?: string;
    /** Only meaningful when conversation is on this channel. UI can dim/hide otherwise. */
    channel?: 'voice' | 'sms' | 'email' | 'whatsapp';
}
interface BranchDef {
    label: string;
    description: string;
}
interface NodeSchema {
    id: string;
    name: string;
    description: string;
    groups: string[];
    isTrigger: boolean;
    isGlobalTrigger: boolean;
    inputs: Record<string, NodeFieldDef>;
    outputs: Record<string, NodeOutputDef>;
    branches: Record<string, BranchDef>;
    timeout?: number;
    retry?: {
        maxAttempts: number;
        backoffMs: number;
        fallbackBranch?: string;
    };
}

declare const nodes: {
    readonly on_lead_added: NodeSchema;
    readonly send_channel_message: NodeSchema;
    readonly on_channel_inbound: NodeSchema;
    readonly call_mcp_tool: NodeSchema;
    readonly on_mcp_called: NodeSchema;
    readonly check_condition: NodeSchema;
    readonly wait_until: NodeSchema;
    readonly split_for_test: NodeSchema;
    readonly get_variable: NodeSchema;
    readonly set_variable: NodeSchema;
    readonly get_constant: NodeSchema;
    readonly extract_with_ai: NodeSchema;
    readonly add_tag_to_lead: NodeSchema;
    readonly remove_tag_from_lead: NodeSchema;
    readonly update_lead_field: NodeSchema;
    readonly ask_ai: NodeSchema;
    readonly categorise_with_ai: NodeSchema;
};
type NodeId = keyof typeof nodes;

export { type BranchDef, type NodeFieldDef, type NodeId, type NodeOutputDef, type NodeSchema, nodes };
