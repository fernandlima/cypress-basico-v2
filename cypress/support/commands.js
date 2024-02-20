Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){

    cy.get('#firstName').type('Fernanda')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('teste@mail.com')
    cy.get('#open-text-area').type('teste') 
    cy.get('button[type="submit"]').click() 
})