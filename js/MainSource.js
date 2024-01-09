import RouteManager from './DOMUtility/RouteManager.js';
import PageManager from './DOMUtility/PageManager.js';
import NavBarBuilder from './DOMUtility/NavBarBuilder.js';
// import FormMain from '../FormUtility/FormMain.js'; 
import Utility from './DOMUtility/Utility.js';
import Controller from './DOMUtility/Controller.js';

class MainSource {
    constructor() {
        this.utility = new Utility();
        this.controller = new Controller(this.utility);
        this.routeManager = new RouteManager(this.controller);
        this.pageManager = new PageManager(this.utility);
        this.navBarBuilder = new NavBarBuilder(this.utility);
        // this.formMain = new FormMain();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.routeManager.setupRoutes();
            this.pageManager.initPageManager();
            this.navBarBuilder.initNavBar();
            // this.formMain.initializeForm();
        });
    }
}

const mainSource = new MainSource();
mainSource.init();
