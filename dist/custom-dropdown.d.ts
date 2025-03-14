import { LitElement } from 'lit';
export interface DropdownOption {
    value: string;
    label: string;
}
/**
 * Custom dropdown component that replaces the native select element
 *
 * @element custom-dropdown
 */
export declare class CustomDropdown extends LitElement {
    /**
     * Array of dropdown options
     */
    options: DropdownOption[];
    /**
     * The currently selected index (0 means placeholder)
     */
    selectedIndex: number;
    /**
     * Width of the dropdown
     */
    width: string;
    /**
     * Label for when no option is selected
     */
    placeholder: string;
    /**
     * Whether the dropdown is currently open
     */
    private isOpen;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _toggleDropdown;
    private _selectOption;
    private _closeAllSelect;
}
declare global {
    interface HTMLElementTagNameMap {
        'custom-dropdown': CustomDropdown;
    }
}
