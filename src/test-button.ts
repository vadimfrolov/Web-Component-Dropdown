import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * 
 * @element test-button
 */
@customElement('test-button')
export class TestButton extends LitElement {
  @property({ type: String }) message = 'Button clicked!';
  @property({ type: String }) buttonText = 'Click Me';
  
  static styles = css`
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

  render() {
    return html`
      <button @click=${this._showAlert}>
        ${this.buttonText}
      </button>
    `;
  }

  private _showAlert() {
    alert(this.message);
    
    this.dispatchEvent(new CustomEvent('button-clicked', {
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'test-button': TestButton;
  }
}
