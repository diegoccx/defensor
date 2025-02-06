describe('Tela de Transações', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/transactions'); // Acessa a página de transações
  });

  it('Deve carregar a página corretamente', () => {
    cy.contains('Transações').should('be.visible'); // Verifica se o título está visível
  });

  it('Deve exibir transações', () => {
    cy.get('.history-header').should('have.length.at.least', 1); // Verifica se há pelo menos uma transação listada
  });

  it('Deve exibir o total de transações', () => {
    cy.contains('Total: R$').should('be.visible'); // Verifica se o total aparece na tela
  });

  it('Deve navegar para a página de todas as transações', () => {
    cy.contains('Ver tudo').click(); // Clica no botão "Ver tudo"
    cy.url().should('include', '/transactions'); // Confirma que ainda está na página de transações
  });
});
