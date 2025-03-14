import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
// Import raw SCSS content and process with unsafeCSS
import styles from './custom-dropdown.scss';

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
   * Alignment of the dropdown options (left or right)
   */
  @property({ type: String }) 
  optionsAlign: 'left' | 'right' | undefined = undefined;

  /**
   * Color variant of the dropdown
   */
  @property({ type: String }) 
  variant: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

  /**
   * Whether the dropdown is currently open
   */
  @state() 
  private isOpen = false;

  static styles = css`${unsafeCSS(styles)}`;

  render() {
    // Determine alignment class based on optionsAlign property
    let alignmentClass = '';
    if (this.optionsAlign === 'left') {
      alignmentClass = 'align-left';
    } else if (this.optionsAlign === 'right') {
      alignmentClass = 'align-right';
    }
    
    return html`
      <div class="custom-select" style=${styleMap({ width: this.width })}>
        <div 
          class="select-selected ${this.isOpen ? 'select-arrow-active' : ''} variant-${this.variant}"
          @click="${this._toggleDropdown}"
        >
          ${this.selectedIndex === 0 
            ? this.placeholder 
            : this.options[this.selectedIndex - 1].label}
        </div>
        <div class="select-items ${this.isOpen ? '' : 'select-hide'} ${alignmentClass}">
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
