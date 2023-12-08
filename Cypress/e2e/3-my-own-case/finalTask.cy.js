describe('Test Cases for Sauce Demo site', () => {

    it('verify thet user is able to log in with valid credentials and check the page URL and logout element', () => {
        // Visit the login page
        cy.visit('https://www.saucedemo.com/v1/');

        // Enter valid credentials and click the login button
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.get('#login-button').click();

        // Verify the URL is changed to the expected page after successful login
        cy.url().should('include', '/inventory.html');

        // Open the sidebar
        cy.get('.bm-burger-button').click();

        // Verify the logout element is available in the sidebar
        cy.get('#logout_sidebar_link').should('be.visible');
    });


    it('verify that user is able to log out and check the initial page URL', () => {
        cy.visit('https://www.saucedemo.com/v1/');

        // Enter valid credentials and click the login button
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.get('#login-button').click();

        // Verify the URL is changed to the expected page after successful login
        cy.url().should('include', '/inventory.html');

        // Open the sidebar
        cy.get('.bm-burger-button').click();

        // Verify the logout element is available in the sidebar
        cy.get('#logout_sidebar_link').should('be.visible');

        // Click the logout button
        cy.get('#logout_sidebar_link').click();
        
        // Verify the URL is changed back to the initial login page after logout
        cy.url().should('eq', 'https://www.saucedemo.com/v1/index.html');
    });

    it('Check that a valid (standard_user) user cannot log-in with the invalid credentials', () => {
        // Visit the login page
        cy.visit('https://www.saucedemo.com/v1/');

        // Enter invalid credentials (password) and click the login button
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('pineapple');
        cy.get('#login-button').click();
        // Verify label with the text
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Check that a locked_out_user user cannot log-in with the valid credentials', () => {
        // Visit the login page
        cy.visit('https://www.saucedemo.com/v1/');

        // Enter valid credentials and click the login button
        cy.get('[data-test=username]').type('locked_out_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.get('#login-button').click();
        // Verify label with the text
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
    });

    it('Check that a valid performance_glitch_user user can log-in with the valid credentials, but with long timeout', () => {
        // Visit the login page
        cy.visit('https://www.saucedemo.com/v1/');

        // Enter valid credentials and click the login button
        cy.get('[data-test=username]').type('performance_glitch_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.wait(7000);
        cy.get('#login-button').click();

        // Verify the URL is changed to the expected page after successful login
        cy.url().should('include', '/inventory.html');

        // Open the sidebar
        cy.get('.bm-burger-button').click();
        
        // Verify the logout element is available in the sidebar
        cy.get('#logout_sidebar_link').should('be.visible');

    });

    it('Check that a valid user can add any item from the items list to the cart', () => {
        // Visit the login page
        cy.visit('https://www.saucedemo.com/v1/');

        // Enter valid credentials and click the login button
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.get('#login-button').click();

        // Verify the URL is changed to the expected page after successful login
        cy.url().should('include', '/inventory.html');

        // Add specific item to the cart
        cy.get('div[class=inventory_list] >div:has(a>div:contains(Sauce Labs Bike Light)) button').click();
        cy.get('div[class=inventory_list] >div:has(a>div:contains(Sauce Labs Bike Light)) button').should('have.text', 'REMOVE');

        // Open the cart
        cy.get('.shopping_cart_link').click();

        // Verify the URL is changed to the expected page
        cy.url().should('include', '/cart.html');

        // Verify the added item in the cart
        cy.get('.cart_list').should('be.visible');
        cy.get('.cart_item').should('have.length', 1);

        // Check the name and price of the added item
        cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Bike Light');
        cy.get('.inventory_item_price').should('have.text', '9.99');

        // Check if the checkout button is visible and enabled
        cy.get('.btn_action')
            .should('be.visible')
            .should('not.be.disabled');

    });

    it('Check that a valid user can add any item from the items list to the cart and is able to proceed with the checkout till confirmation page', () => {
        // Visit the login page
        cy.visit('https://www.saucedemo.com/v1/');

        // Enter valid credentials and click the login button
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.get('#login-button').click();

        // Verify the URL is changed to the expected page 
        cy.url().should('include', '/inventory.html');
        // Add specific item to the cart
        cy.get('div[class=inventory_list] >div:has(a>div:contains(Sauce Labs Bike Light)) button').click();

        // Open the cart
        cy.get('.shopping_cart_link').click();

        // Verify the URL is changed to the expected page
        cy.url().should('include', '/cart.html');

        // Verify redirection to the expected page after clicking 'CHECKOUT' link
        cy.get('.btn_action').click();
        cy.url().should('include', '/checkout-step-one.html');
        cy.get('div[class=subheader]').should('have.text', 'Checkout: Your Information');

        // Enter checkout information
        cy.get('#first-name').type('Lolla');
        cy.get('#last-name').type('Bradshaw');
        cy.get('#postal-code').type('334422');
        cy.get('.btn_primary').click();

        // Verify the URL is changed to the expected page
        cy.url().should('include', '/checkout-step-two.html');

        // Complete the purchase
        cy.get('.summary_info').should('be.visible');
        cy.get('.btn_action').click();

        // Verify the "Thank you" message
        cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER');

        // Verify that the user is on the confirmation page
        cy.url().should('include', '/checkout-complete.html');
    });

    it('Check that a valid user can login when screen width is less than 1060px', () => {
        // Set screen width less than 1060px
        cy.viewport(800, 600);

        // Visit the login page
        cy.visit('https://www.saucedemo.com/v1/');

        // Enter valid credentials and click the login button
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.get('#login-button').click();

        // Verify the URL is changed to the expected page after successful login
        cy.url().should('include', '/inventory.html');

        // Open the sidebar
        cy.get('.bm-burger-button').click();

        // Verify the logout element is available in the sidebar
        cy.get('#logout_sidebar_link').should('be.visible');
    });
});