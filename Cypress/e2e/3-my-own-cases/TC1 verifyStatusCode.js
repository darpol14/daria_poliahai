it.only('Verify that initiating the transactions feed the network request status for transactions is 200', function(){
    const userInfo = {
        firstName: "Daria",
        lastName: "Poliahai",
        userName: "newUser" + Math.floor(Math.random() * 10000),
        password: "s3cret"
      }
      cy.visit('http://localhost:3000')

//Sign up
cy.get('[data-test="signup"]').click()
cy.get('#firstName').type(userInfo.firstName)
cy.get('#lastName').type(userInfo.lastName)
cy.get('#username').type(userInfo.userName)
cy.get('#password').type(userInfo.password)
cy.get('#confirmPassword').type(userInfo.password)
cy.get('.MuiButton-label').click()

//Log in
cy.get('#username').type(userInfo.userName)
cy.get('#password').type(userInfo.password)
cy.get('.MuiButton-label').click()

//Onboarding 
 cy.getBySel('user-onboarding-dialog-title').should('be.visible').should('contain', 'Get Started with Real World App')
 cy.getBySel('user-onboarding-next').click()
 cy.getBySel('user-onboarding-dialog-title').should('contain', 'Create Bank Account')
 cy.getBySelLike('bankName-input').type('The Best Bank')
 cy.getBySelLike('accountNumber-input').type('123456789')
 cy.getBySelLike('routingNumber-input').type('987654321')
 cy.getByClassLike('MuiButton-fullWidth').click()
 cy.getBySel('user-onboarding-dialog-title').should('contain','Finished')
 cy.getBySelLike('user-onboarding-next').click()
 cy.getBySelLike('bankaccounts').click()
 cy.location("pathname").should("eq","/bankaccounts")

 cy.intercept('GET', '/users').as('allUsers')
 cy.getBySelLike('new-transaction').click()
 cy.wait('@allUsers')
 cy.getBySel('user-list-search-input').type('Arely', {force: true })
 cy.getBySelLike('user-list-item').contains('Arely').click({force: true })
 cy.getBySelLike('amount-input').type('23')
 cy.getBySelLike('description-input').type("Pizza")
 cy.intercept('POST', '/transactions').as('transactions')
 
 cy.getBySelLike('submit-payment').click()

 cy.wait('@transactions').its('response.statusCode').should('equal', 200)
 cy.get('[data-test = "alert-bar-success"]')
 .should('exist')
})
 
