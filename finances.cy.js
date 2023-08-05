describe('Transações', () => {

    function criarTransacao(descricao, valor) {
        
        cy.get('#transaction > .button').click() //Clique no botão "Nova Transação"

        cy.get('#description').type(descricao)

        cy.get('#amount').type(valor) //Inserindo a data
        
        cy.get('#date').type("2023-08-05") //Clique no botão "Salvar"
        
        cy.contains('button', 'Salvar').click()
    }

    beforeEach(() => { //Hook
        
        cy.visit("https://dev-finance.netlify.app/") //Acesso a URL do sistema

    });

    it('Cadastrar uma entrada', () => {

        criarTransacao("Freelancer", 1000) //Chamada da função
        
        cy.get("tbody tr td.description").should("have.text", "Freelancer") //Validação com assertion

    });

    it('Cadastrar uma saída', () => {

        criarTransacao("Cinema", -80) //Chamada da função
        
        cy.get("tbody tr td.description").should("have.text", "Cinema") //Validação com assertion

    });


    it('Excluir transação', () => {

        criarTransacao("Cinema", 80) //Chamada da função

        cy.contains(".description", "Cinema") //td => referencia

            .parent() // tr

            .find('img') //Elemento que a gente precisa

            .click() //Clique
            
    });

});







