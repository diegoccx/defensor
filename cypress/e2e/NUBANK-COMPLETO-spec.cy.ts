describe('Testando Navegação entre Páginas', () => {
  const pages = [
    { path: '/', title: 'Login' }, // Ajuste o título conforme o que aparece na tela de login
    { path: '/home', title: 'Home' },
    { path: '/add', title: 'Adicionar' },
    { path: '/cards', title: 'Cartões' },
    { path: '/profile', title: 'Perfil' },
    { path: '/savings', title: 'Poupança' },
    { path: '/transactions', title: 'Transações' },
  ];

  pages.forEach((page) => {
    it(`Deve carregar a página ${page.path} corretamente`, () => {
      cy.visit(`http://localhost:3000${page.path}`); // Acessa a página
      cy.contains(page.title).should('be.visible'); // Verifica se o título está visível
      cy.wait(2000); // Aguarda 2 segundos antes de passar para a próxima página
    });
  });
});
