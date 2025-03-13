var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 *
 * @element test-button
 */
let TestButton = class TestButton extends LitElement {
    constructor() {
        super(...arguments);
        this.message = 'Button clicked!';
        this.buttonText = 'Click Me';
    }
    render() {
        return html `
      <button @click=${this._showAlert}>
        ${this.buttonText}
      </button>
    `;
    }
    _showAlert() {
        alert(this.message);
        this.dispatchEvent(new CustomEvent('button-clicked', {
            bubbles: true,
            composed: true
        }));
    }
};
TestButton.styles = css `
    :host {
      display: inline-block;
    }

    button {
      background-color: #4285f4;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.1s;
    }

    button:hover {
      background-color: #3367d6;
    }
    
    button:active {
      transform: scale(0.97);
    }
  `;
__decorate([
    property({ type: String })
], TestButton.prototype, "message", void 0);
__decorate([
    property({ type: String })
], TestButton.prototype, "buttonText", void 0);
TestButton = __decorate([
    customElement('test-button')
], TestButton);
export { TestButton };
//# sourceMappingURL=test-button.js.map