<!-- index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FS - SPA ES6 Library 2</title>
    <link rel="stylesheet" href="css/main.css">
    <!-- <link rel="stylesheet" href="css/bootstrap.css"> -->
</head>
<body>

    <nav id="nav-bar">
        <h1>Fine Select ES6 SPA Library</h1>
        <ul id="nav-ul"></ul>
    </nav>

    <div id="root"></div><!-- Buttons will be dynamically added here -->

    <div id="contentArea"></div><!-- Content loaded from external HTML files will appear here -->

    <div id="form-container"></div>


    <!-- Include the JavaScript files -->
   
    </script>
    <script type="module" src="js/DOMUtility/Utility.js"></script>
    <script type="module" src="js/DOMUtility/Controller.js"></script>
    <script type="module" src="js/DOMUtility/PageManager.js"></script>
    <script type="module" src="js/DOMUtility/RouteManager .js"></script>
    <script type="module" src="js/DOMUtility/NavBarBuilder.js"></script>
    <script type="module" src="js/DOMUtility/MainSource.js"></script>
    <script type="module">
        // Initialize the application
        const mainSource = new MainSource();
        mainSource.init();
</script>


        
</body>
</html>
<!-- End index.html-->



// js/DOMUtility/Utility.js
export default class Utility {
    constructor() {}

    /* Method:  fs => Invocation 
     * Purpose:  Returns the first element that matches the given CSS selector.
    */
    fs(selector) {
        return document.querySelector(selector);
    }

    /* Method:  createElements => Invocation 
     * Purpose:  Creates an array of elements from an array of objects.
    */

    createElements(elements) {
        return elements.map(({ tagName, content, attributes, children }) => {
            const element = document.createElement(tagName);
            if (content) {
                element.textContent = content;
            }
            Object.entries(attributes || {}).forEach(([attr, value]) => {
                element.setAttribute(attr, value);
            });

            if (children && children.length > 0) {
                children.forEach(child => {
                    const childElement = this.createElements([child])[0];
                    element.appendChild(childElement);
                });
            }

            return element;
        });
    }

    // ... other methods ...



    
        /* Method:  setAttributes => Invocation
        *  Purpose:  Sets the attributes of an element.
        *  Parameters:
        *  - element: The element to set the attributes on.
        *  - attributes: An object containing the attributes to set.
        *  Returns: None.
        *  Throws:  None.
        *  Example:
        *  const element = document.createElement('div');
        *  const attributes = {

        *  setAttributes(element, attributes);
        *  This will set the attributes on the element.
        *  The element will have the following attributes:
        *  - id: 'my-div'
        *  - class: 'my-class'
        *  - data-id: '123'
        *  - data-name: 'John'
        *  The element will be updated with the new attributes.
        */
        setAttributes(element, attributes) {
            for (const key in attributes) {
                element.setAttribute(key, attributes[key]);
            }
        }
    
    /* Method:  loadHtmlTemplate => Invocation 
    *  Purpose:  Loads an HTML template from a URL and inserts it into a target element.
    *  Parameters:
    *  - url: The URL of the HTML template to load.
    *  - targetElementId: The ID of the target element to insert the HTML template into.
    *  Returns: - A Promise that resolves when the HTML template is loaded and inserted into the target element.
    *  Throws: - An error if the HTML template cannot be loaded or inserted into the target element.
    *  Example:
    *  loadHtmlTemplate('https://example.com/template.html', 'targetElementId');
    *  This will load the HTML template from the given URL and insert it into the target element with the given ID.
    *  The Promise will resolve when the HTML template is loaded and inserted into the target element.
    *  If there is an error loading or inserting the HTML template, the Promise will reject with the error.
    *  The error will be logged to the console.
    *  Note: This method is not specific to the DOMUtility library. It can be used in any JavaScript application. 
    *  It can be used with other frameworks or libraries. 
    *  The loadHtmlTemplate method can be used to load and insert HTML templates into any HTML element. 
    *  It can be used to dynamically load and insert HTML templates into the DOM, 
    *  any other application, into any other website, into any HTML element or frameworks or libraries. 
    */
    async loadHtmlTemplate(url, targetElementId) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            const targetElement = this.fs(targetElementId);
            targetElement.innerHTML = html;
        } catch (e) {
            console.error("Error loading template:", e);
        }
    }
}
// End Utility.js

// js/DOMUtility/PageManager.js
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
            {
                tagName: 'button',
                content: 'Load About Page',
                attributes: { 'data-route': '/about' }
            },
            {
                tagName: 'button',
                content: 'Load Contact Page',
                attributes: { 'data-route': '/contact' }
            }
        ];

        const buttons = this.utility.createElements(buttonData);
        buttons.forEach(button => this.root.appendChild(button));
    }
}
// End PageManager


// js/DOMUtility/NavBarBuilder.js
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
            // ...other nav items...
        ];

        const navlinks = this.utility.createElements(NavBarData);
        navlinks.forEach(navlink => this.nav_ul.appendChild(navlink));
    }
}

// End NavBarBuilder.js // End DOMUtility folder


// js/FormUtility/FormModel.js
export class FormModel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.fields = [];
    }

    addField(type, attributes) {
        this.fields.push({ type, attributes });
    }

    renderForm() {
        const form = document.createElement('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = this.getFormData(form);
            this.storeFormData(formData);
        });

        this.fields.forEach(field => {
            const input = document.createElement('input');
            input.type = field.type;
            Object.keys(field.attributes).forEach(key => {
                if (key === 'class') {
                    input.className = field.attributes[key]; // Handle multiple classes
                } else {
                    input.setAttribute(key, field.attributes[key]);
                }
            });
            form.appendChild(input);
        });
        this.container.appendChild(form);
    }

    getFormData(form) {
        return Array.from(form.elements).reduce((data, element) => {
            if (element.name && element.type !== 'submit') {
                data[element.name] = element.value;
            }
            return data;
        }, {});
    }

    storeFormData(formData) {
        const uniqueId = `formData-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        storedData.push({ id: uniqueId, ...formData });
        
        try {
            localStorage.setItem('formSubmissions', JSON.stringify(storedData));
            // Verifying if the data was saved correctly
            const verify = localStorage.getItem('formSubmissions');
            const isSuccessful = verify && JSON.parse(verify).some(item => item.id === uniqueId);
    
            console.log(isSuccessful ? "Successful Submission" : "ERROR: Unsuccessful Submission");
        } catch (error) {
            console.log("ERROR: Unsuccessful Submission");
        }
    }   
}
// End FormModel.js


// js/FormUtility/FormMain.js
import { FormModel } from './FormModel.js'; // Assuming default export

export default class FormMain {
    constructor() {
        this.formModel = new FormModel('form-container');
    }

    initializeForm() {
        this.addFormFields();
        this.formModel.renderForm();
    }

    addFormFields() {

        this.formModel.addField('text', {
            placeholder: 'Enter username',
            name: 'textField',
            id: 'username',
            class: 'size-up strong-text'
        });
        this.formModel.addField('text', {
            placeholder: 'Enter password',
            name: 'textField',
            id: 'password',
            class: 'size-up strong-text'
        });
        this.formModel.addField('text', {
            placeholder: 'Confirm password',
            name: 'textField',
            id: 'confirm-password',
            class: 'size-up strong-text'
        });
        this.formModel.addField('text', {
            placeholder: 'Enter First name',
            name: 'textField',
            id: 'firstname',
            class: 'size-up strong-text'
        });

        this.formModel.addField('text', {
            placeholder: 'Enter Last name',
            name: 'textField',
            id: 'fName',
            class: 'size-up'
        });

        this.formModel.addField('email', {
            placeholder: 'Enter Email',
            name: 'emailField',
            id: 'emailId',
            class: 'size-up'
        });

        this.formModel.addField('submit', {
            value: 'Submit',
            type: 'submit',
            class: 'form-submit-button'
        });
    }
}

// Usage of FormMain
document.addEventListener('DOMContentLoaded', () => {
    const formMain = new FormMain();
    formMain.initializeForm();
});
// End FormMain.js  // End FormUtility folder


<!-- templates/about.html-->
<div id="about">
    <p id="content">This is from the about.html page</p>
</div>
<!-- End about.html -->



<!-- templates/contact.html -->
<div id="contact">
    <p id="content">This is from the contact.html page</p>
</div>
<!-- End contact.html -->

<!-- services.html -->
<div id="services_Container">

    <p>Web Development</p>
    <p>Auto Repair</p>
    <p>Auto Detailing</p>
    <p>Entertainment</p>
</div>
<!-- End services.html -->


<!-- store.html -->
<p>Store content </p>
<!-- End store.html  --> 
// End templates folder





/*  css/main.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif; /* You can choose your preferred font */
}

/* Styling the navigation bar */
#nav-bar {
    background-color: black; /* Black background */
    color: white; /* White text */
    position: sticky; /* Makes the navbar sticky */
    top: 0; /* Stick to the top of the page */
    z-index: 1000; /* Ensures navbar stays above other content */
    padding: 20px 20px; /* Some padding around the content */
}

/* Styling the list inside the navbar */
#nav-ul {
    list-style: none; /* Removes bullet points */
    display: flex; /* Aligns items in a row */
    justify-content: flex-end; /* Aligns links to the right */
}

/* Styling each navigation item */
.nav-item {
    margin-left: 20px; /* Adds space between the links */
}

/* Styling the links */
.nav-item a {
    color: white; /* White text color */
    text-decoration: none; /* Removes underline */
    font-size: 16px; /* Sets the font size */
    transition: color 0.3s; /* Smooth transition for hover effect */
}

/* Hover effect on links */
.nav-item a:hover {
    color: grey; /* Changes color when hovered */
}



.size-up {
    width:200px;
    padding:20px;
    height: 10px;
    width:250px;
    border: 1px solid #f7f0f0;
    border-style: outset;
    border-radius: 20px;
}

.strong-text {
    font-weight: bold sans-serif ;
}

.form-submit-button, #loadAbout, #loadContact {
    background: #44a2ee;
    color: #fff;
    height: 50px;
    width:250px;
    background: #44a2ee;
    color: #fff;
    border: 1px solid #eee;
    border-style: outset;
    border-radius: 20px;
    font: bold 15px arial,sans-serif;
    text-shadow: none;
    margin: 20px 0px 20px 0px;
    padding:20px;
    }



/*  */
    .form-submit-button:hover {
    background: #016ABC;
    color: #fff;
    border: 1px solid #eee;
    border-radius: 20px;
    box-shadow: 5px 5px 5px #eee;
    text-shadow: none;
    }


input {
    display: block;
    margin: 20px 0px 20px 0px;
}

input[type="text"]::placeholder {
    color: gray;
    font-size: 14px;
    /* Other placeholder styling properties */
}


/* End main.css // End css folder */












