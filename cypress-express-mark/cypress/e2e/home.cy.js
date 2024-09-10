// Validando apenas a função visit que é visitar a página.

describe('home', () => {
  it('webapp deve estar online', () => {
    cy.visit('/')

    cy.title().should('eq','Gerencie suas tarefas com Mark L')

  })
})