// AUTO-GENERATED from og-workflows/src/types.ts — do not edit manually

export interface NodeFieldDef {
  type:
    | 'text'
    | 'number'
    | 'boolean'
    | 'textarea'
    | 'select'
    | 'multiselect'
    | 'custom'
    | 'date'
    | 'datetime'
    | 'json';
  description: string;
  required?: boolean;
  placeholder?: string;
  default?: unknown;
  /** For select/multiselect */
  options?: string[] | { label: string; value: string }[];
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
    optionsFrom?: { siblingField: string };

    /**
     * Switch this field's input type based on the upstream output's `type`.
     * E.g. render as number input when comparing to a number output.
     */
    typeFrom?: { siblingField: string };

    /**
     * Filter available operator options based on the upstream output's `type`.
     * E.g. hide "greater_than" when comparing strings, hide "contains" for numbers.
     */
    operatorsFor?: { siblingField: string };

    /**
     * Override this field's visibility based on the upstream output's metadata.
     * Key is the output property to check, value is the required value(s).
     * E.g. `{ type: ["enum"] }` → only show this field when the output is an enum.
     */
    visibleWhenOutput?: Record<string, string | string[]>;
  };
}

export interface NodeOutputDef {
  description: string;
  example: unknown;

  // ── Type system ──

  /** Data type of this output. Drives operator filtering and input rendering. */
  type?: 'string' | 'number' | 'boolean' | 'enum' | 'date' | 'array';

  /** Valid values when type is "enum". Rendered as dropdown in condition builder. */
  enum?: string[];

  // ── Display hints ──

  /** How to render the value in the UI. */
  format?: 'phone' | 'email' | 'url' | 'currency' | 'duration' | 'datetime' | 'percent';

  /** Map enum values to colors for badge rendering. */
  color?: Record<string, string>;

  // ── Grouping ──

  /** Group name for organizing outputs in the picker UI. */
  group?: string;

  /** Only meaningful when conversation is on this channel. UI can dim/hide otherwise. */
  channel?: 'voice' | 'sms' | 'email' | 'whatsapp';
}

export interface BranchDef {
  label: string;
  description: string;
}

export interface NodeSchema {
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
  retry?: { maxAttempts: number; backoffMs: number; fallbackBranch?: string };
}
