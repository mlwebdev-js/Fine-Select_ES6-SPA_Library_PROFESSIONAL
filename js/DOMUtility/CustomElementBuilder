export class MyCustomElement extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');

        const style = document.createElement('style');
        style.textContent = `
            .wrapper {
                background-color: #f0f0f0;
                padding: 10px;
                border-radius: 5px;
            }
            .wrapper:hover {
                background-color: #e0e0e0;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.wrapper').addEventListener('click', () => {
            console.log('Custom element clicked!');
        });
    }
}

customElements.define('my-custom-element', MyCustomElement);
