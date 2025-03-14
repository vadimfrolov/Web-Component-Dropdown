var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * Custom dropdown component that replaces the native select element
 *
 * @element custom-dropdown
 */
let CustomDropdown = class CustomDropdown extends LitElement {
    render() {
        return html `
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
          ${this.options.map((option, index) => html `
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
        /**
         * Array of dropdown options
         */
        this.options = [];
        /**
         * The currently selected index (0 means placeholder)
         */
        this.selectedIndex = 0;
        /**
         * Width of the dropdown
         */
        this.width = '200px';
        /**
         * Label for when no option is selected
         */
        this.placeholder = 'Select an option';
        /**
         * Whether the dropdown is currently open
         */
        this.isOpen = false;
        this._closeAllSelect = (e) => {
            // Close if clicked outside this element
            if (!this.contains(e.target)) {
                this.isOpen = false;
            }
        };
        // Set up global event listener for handling dropdown coordination
        document.addEventListener('dropdown-opened', ((e) => {
            if (e.detail.source !== this) {
                this.isOpen = false;
            }
        }));
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this._closeAllSelect);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._closeAllSelect);
    }
    _toggleDropdown(e) {
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
    _selectOption(index) {
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
};
CustomDropdown.styles = css `
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
__decorate([
    property({ type: Array })
], CustomDropdown.prototype, "options", void 0);
__decorate([
    property({ type: Number })
], CustomDropdown.prototype, "selectedIndex", void 0);
__decorate([
    property({ type: String })
], CustomDropdown.prototype, "width", void 0);
__decorate([
    property({ type: String })
], CustomDropdown.prototype, "placeholder", void 0);
__decorate([
    state()
], CustomDropdown.prototype, "isOpen", void 0);
CustomDropdown = __decorate([
    customElement('custom-dropdown')
], CustomDropdown);
export { CustomDropdown };
//# sourceMappingURL=custom-dropdown.js.map