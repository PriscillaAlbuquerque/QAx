// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Função customizada que implementa 3 ações de uma única vez, a fim de não ficar repetindo código(encapsulamento)
Cypress.Commands.add('createTask',(taskName = '') =>{
    cy.visit('/') // faz a visita na página. O / é a rota principal da url base

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')

    if(taskName !==''){
        cy.get('@inputTask') // preenche o campo
        .type(taskName)
    }

      
        
        cy.contains('button', 'Create').click()// clica no botão create
})
Cypress.Commands.add('isRequired',(targetMessage)=>{


    cy.get('@inputTask')
    .invoke('prop','validationMessage')
    .should((text) =>{
        expect(
            targetMessage
        ).to.eq(text)
    })
})


Cypress.Commands.add('removeTaskByName', (taskName)=>{
    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE',
        body: { name: taskName }
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('postTask', (task)=>{
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.eq(201)
    })

})