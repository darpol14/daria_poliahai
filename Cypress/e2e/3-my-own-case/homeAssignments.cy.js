describe('TRANSACTION FEED TESTS', () => {


it('TC1.1 - Verify that initiating the transactions feed the network request status for transactions is 200', function(){
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
//Check status code
cy.intercept('GET', 'http://localhost:3001/transactions/public').as('allPublicTransactions')
cy.wait('@allPublicTransactions').then((interception) => {
  expect(interception.response.statusCode).to.be.oneOf([200, 304]) 
})

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


})

it('TC1.2 - Verify that elements such as checkboxes, radiobuttons, and dropdowns can be interacted with', () => {

})

it('TC1.3 - Verify that the application correctly renders and paginates all transaction feeds', () => {
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

//Intercept for the general request
cy.intercept('GET', 'http://localhost:3001/transactions/public').as('allPublicTransactions')
cy.intercept('GET', 'http://localhost:3001/transactions/public?page=2').as('allPublicTransactionsPage2')

//Scroll to load more
cy.get('[class="ReactVirtualized__Grid__innerScrollContainer"] div').last().scrollIntoView()

//Wait for the 2nd page request to complete and assert the conditions
cy.wait('@allPublicTransactionsPage2').then((interception) => {
//check status code
  expect(interception.response.statusCode).to.be.oneOf([200, 304]);
})
})

it.only('TC1.4 - Verify that transactions can be filtered by a specific date range', () => {

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

//Filter Transactions by Date Range being on Home page
cy.intercept ('GET', 'transactions/public').as('allPublicTransactions')
cy.getBySelLike('filter-date-range-button').click({force: true })
cy.get('.Cal__Header__root').should('be.visible')
cy.get('[data-date="2023-10-22"]').click();
cy.get('[data-date="2023-10-25"]').click();
cy.get('.Cal__Header__root').should('not.exist')
cy.getBySelLike('transaction-item').should('have.length', 0)
cy.getBySel('empty-list-header').should('contain', "No Transactions")
cy.getBySelLike('empty-create-transaction-button')
.should("have.attr", "href", "/transaction/new")
.contains("create a transaction", { matchCase: false })
.should("have.css", { "text-transform": "uppercase" })
//Clearing date range filter
cy.getBySelLike('filter-date-clear-button').click({force: true })
cy.getBySelLike('filter-date-range-button').should('contain', "ALL")

})

it('TC1.5 - Verify that transactions can be filtered by a specific amount range.', () => {
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

})

})
