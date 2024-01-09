import Utility from './Utility.js';

export default class PageManager {
    constructor(utility) {
        this.utility = utility;
        this.root = this.utility.fs('#root');
    }

    initPageManager() {
        this.createButtons();
    }

    createButtons() {
        const buttonData = [
            /*
            {
                tagName: 'button',
                content: 'Load About Page',
                attributes: { 
                    'data-route': '/about',
                    'id': 'loadAbout'
                }
            },
            {
                tagName: 'button',
                content: 'Load Contact Page',
                attributes: { 
                    'data-route': '/contact',
                    'id': 'loadContact' 
                }
            }
            */
        ];

        const buttons = this.utility.createElements(buttonData);
        buttons.forEach(button => this.root.appendChild(button));
    }
}
