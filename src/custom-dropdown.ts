import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Custom dropdown component that replaces the native select element
 *
 * @element custom-dropdown
 */
@customElement('custom-dropdown')
export class CustomDropdown extends LitElement {
  /**
   * Array of dropdown options
   */
  @property({ type: Array }) 
  options: DropdownOption[] = [];

  /**
   * The currently selected index (0 means placeholder)
   */
  @property({ type: Number }) 
  selectedIndex = 0;

  /**
   * Width of the dropdown
   */
  @property({ type: String }) 
  width = '200px';
  
  /**
   * Label for when no option is selected
   */
  @property({ type: String }) 
  placeholder = 'Select an option';

  /**
   * Whether the dropdown is currently open
   */
  @state() 
  private isOpen = false;

  static styles = css`
    :host {
      display: block;
    }
    
    .custom-select {
      position: relative;
      font-family: Arial;
    }

    .custom-select select {
      display: none;
    }

    .select-selected {
      padding: 8px 16px;
      border: 1px solid transparent;
      border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
      cursor: pointer;
      user-select: none;
    }
    
    .select-selected:after {
      position: absolute;
      content: "";
      top: 14px;
      right: 10px;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-color: #000000 transparent transparent transparent;
    }
    
    .select-selected.select-arrow-active:after {
      border-color: transparent transparent #000000 transparent;
      top: 7px;
    }
    
    .select-items {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 99;
    }
    
    .select-items div {
      padding: 8px 16px;
      border: 1px solid transparent;
      border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
      cursor: pointer;
      user-select: none;
    }
    
    .select-hide {
      display: none;
    }
    
    .select-items div:hover, .same-as-selected {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `;

  render() {
    return html`
      <div class="custom-select" style="width: ${this.width};">
        <div 
          class="select-selected ${this.isOpen ? 'select-arrow-active' : ''}"
          @click="${this._toggleDropdown}"
        >
          ${this.selectedIndex === 0 
            ? this.placeholder 
            : this.options[this.selectedIndex - 1].label}
        </div>
        <div class="select-items ${this.isOpen ? '' : 'select-hide'}">
          ${this.options.map((option, index) => html`
            <div
              class="${this.selectedIndex === index + 1 ? 'same-as-selected' : ''}"
              @click="${() => this._selectOption(index + 1)}"
            >
              ${option.label}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  constructor() {
    super();
    // Set up global event listener for handling dropdown coordination
    document.addEventListener('dropdown-opened', ((e: CustomEvent) => {
      if (e.detail.source !== this) {
        this.isOpen = false;
      }
    }) as EventListener);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._closeAllSelect);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._closeAllSelect);
  }

  private _toggleDropdown(e: Event) {
    e.stopPropagation();
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      // Close all other dropdowns when this one opens
      document.dispatchEvent(new CustomEvent('dropdown-opened', {
        bubbles: true,
        composed: true,
        detail: { source: this }
      }));
    }
  }

  private _selectOption(index: number) {
    this.selectedIndex = index;
    this.isOpen = false;
    
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.options[index - 1].value,
        index: index,
        option: this.options[index - 1]
      }
    }));
  }

  private _closeAllSelect = (e: MouseEvent) => {
    // Close if clicked outside this element
    if (!this.contains(e.target as Node)) {
      this.isOpen = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'custom-dropdown': CustomDropdown;
  }
}
