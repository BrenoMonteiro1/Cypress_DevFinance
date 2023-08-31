describe('Testes de Cadastro e Exclusão de Transações', () => {

    // Hook
    beforeEach(() => {
        cy.visit("https://dev-finance.netlify.app/");
    });

    // Função para criar uma transação
    function criarTransacao(descricao, valor) {
        cy.get('#transaction > .button').click();

        cy.get("#description").type(descricao);
        cy.get("#amount").type(valor);
        cy.get("#date").type("2023-08-28");

        cy.contains('button', 'Salvar').click();
    }

    // Teste para cadastrar uma entrada
    it('Cadastrar uma entrada', () => {
        criarTransacao("Freelance", 1000);

        // Verifica se os detalhes da entrada estão visíveis
        cy.contains('Freelance').should('be.visible');
        cy.contains('R$ 1.000,00').should('be.visible');
        cy.contains('28/08/2023').should('be.visible');
    });

    // Teste para cadastrar uma saída
    it('Cadastrar uma saída', () => {
        criarTransacao("Cinema", 100);

        // Verifica se os detalhes da saída estão visíveis
        cy.contains('Cinema').should('be.visible');
        cy.contains('R$ 100,00').should('be.visible');
        cy.contains('28/08/2023').should('be.visible');
    });

    // Teste para excluir uma transação de Entrada
    it('Excluir uma transação de Entrada', () => {
        criarTransacao("Freela", 1000); // Vamos criar uma transação de despesa para excluir

        // Encontrar o botão de exclusão pelo atributo onclick
        cy.contains('Freela')
            .parent() // obtém o elemento pai (linha da transação)
            .find('[onclick="Transaction.remove(0)"]') // seleciona a imagem com o atributo onclick
            .click();

        // Verifica se a transação foi removida da lista
        cy.contains('Freeela').should('not.exist');
    });

    // Teste para excluir uma transação de Saída
    it('Excluir uma transação de Saída', () => {
        criarTransacao("Compras", -500); // Vamos criar uma transação de despesa para excluir

        // Encontrar o botão de exclusão pelo atributo onclick
        cy.contains('Compras')
            .parent() // obtém o elemento pai (linha da transação)
            .find('[onclick="Transaction.remove(0)"]') // seleciona a imagem com o atributo onclick
            .click();

        // Verifica se a transação foi removida da lista
        cy.contains('Compras').should('not.exist');
    });
    
});
