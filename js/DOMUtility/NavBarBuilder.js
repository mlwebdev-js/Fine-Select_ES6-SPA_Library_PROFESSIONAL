import Utility from './Utility.js';

export default class NavBarBuilder {
    constructor(utility) {
        this.utility = utility;
        this.nav_ul = this.utility.fs('#nav-ul');
    }

    initNavBar() {
        this.setupDynamicNav();
    }

    setupDynamicNav() {
        const NavBarData = [
            // ...other nav items...
            {
                tagName: 'li',
                attributes: { class: 'nav-item' },
                children: [
                    {
                        tagName: 'a',
                        content: 'Services',
                        attributes: { href: '#', 'data-route': '/services' }
                    }
                ]
            },
            {
                tagName: 'li',
                attributes: { class: 'nav-item' },
                children: [
                    {
                        tagName: 'a',
                        content: 'About',
                        attributes: { href: '#', 'data-route': '/about' }
                    }
                ]
            },
            {
                tagName: 'li',
                attributes: { class: 'nav-item' },
                children: [
                    {
                        tagName: 'a',
                        content: 'Contact',
                        attributes: { href: '#', 'data-route': '/contact' }
                    }
                ]
            }
            // ...other nav items...
        ];

        const navlinks = this.utility.createElements(NavBarData);
        navlinks.forEach(navlink => this.nav_ul.appendChild(navlink));
    }
}
