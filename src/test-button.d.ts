import { LitElement } from 'lit';
/**
 *
 * @element test-button
 */
export declare class TestButton extends LitElement {
    message: string;
    buttonText: string;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    private _showAlert;
}
declare global {
    interface HTMLElementTagNameMap {
        'test-button': TestButton;
    }
}
