import Controller from './Controller.js';

export default class RouteManager {
    constructor(controller) {
        this.controller = controller;
        this.setupRoutes();
    }

    setupRoutes() {
        this.routeEventListeners();
        this.loadPageBasedOnURL();
    }

    routeEventListeners() {
        document.addEventListener('click', (event) => {
            const target = event.target;
            if (target.matches('[data-route]')) {
                event.preventDefault();
                const route = target.dataset.route;
                history.pushState({}, '', route);
                this.loadPage(route);
            }
        });
    }

    loadPageBasedOnURL() {
        const path = window.location.pathname;
        this.loadPage(path);
    }

    loadPage(path) {
        switch (path) {
            case '/about':
                this.controller.loadAboutPage();
                break;
            case '/contact':
                this.controller.loadContactPage();
                break;
            case '/services':
                this.controller.loadServicesPage();
                break;
            // Add more cases as needed
        }
    }
}
