/// <reference types="Cypress" />

const { action } = require("commander")




describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html') 
    })

    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, teste, teste, Teste, teste, teste, Teste, teste, teste, Teste, teste, teste, Teste, teste, teste, Teste, teste, teste'
        
        
        cy.get('#firstName').type('Fernanda')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('teste@mail.com')
        cy.get('#open-text-area').type(longText, {delay:0}) // sobrescreve o delay do type para que seja escrito mais rapidamente no campo, fazendo o teste ser cuncluido mais rapidamente
        cy.contains('button', 'Enviar').click()  //
        
        cy.get('.success').should('be.visible')    //o ponto indica que o elemento é uma classe
    })


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Fernanda')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('teste')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')

    })
   
    it('campo telefone continua vazio quando preenchido com não numérico', function(){
        cy.get('#phone')
        .type('asdfg')
        .should('have.value','')

    })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Fernanda')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('teste@mail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')      
       
           
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Fernanda')
            .should('have.value','Fernanda')
            .clear()
            .should('have.value','')

        cy.get('#lastName').type('Lima')
            .should('have.value','Lima')
            .clear()
            .should('have.value','')

        cy.get('#email').type('teste@mail.com')
            .should('have.value','teste@mail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('123456')
            .should('have.value','123456')
            .clear()
            .should('have.value', '')    
           
               
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório', function(){
        cy.contains('button', 'Enviar').click()        
        cy.get('.error').should('be.visible')      
       
           
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit() 
        cy.get('.success').should('be.visible')       
           
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
                

            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check () // ambos checkboxes marcdos
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })
 

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload') //pegando elemnto pelo tipo e id
            .should('not.have.value') //verifica que não tem nada no campo
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })
    
    it('seleciona um arquivo simulando um drag-and-drop', function(){ //simula arrastar o documento para a importação
        cy.get('input[type="file"]#file-upload') //pegando elemnto pelo tipo e id
            .should('not.have.value') //verifica que não tem nada no campo
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
       
        
            })

                 

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){ //simula arrastar o documento para a importação
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
       
        
            })                 

    


    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){ 
        cy.get('#privacy a').should('have.attr', 'target', '_blank') // verificando que quando clicar no botão de privacidade uma nova aba será aberta, de acordo com os atributos
       
        
        })    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){ 
        cy.get('#privacy a')
            .invoke('removeAttr','target') //remove o target blank para que seja carregada a página na mesma aba 
            .click()
        cy.contains('Talking About Testing').should('be.visible')
            
            })
            

        
        

 })
            


  




         

  


