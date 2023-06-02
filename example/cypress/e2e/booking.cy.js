describe('Booking and Confirmation', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173/')
  })

  it('add date for booking', () => {
    cy.get('.input__field').eq(0).should('be.visible')
    cy.get('.input__field').eq(0).type('2023-05-29') 
    cy.get('.input__field').eq(0).should('have.value', '2023-05-29')
  })

  it('add time for booking', () => {
    cy.get('.input__field').eq(1).should('be.visible')
    cy.get('.input__field').eq(1).type('20')
    cy.get('.input__field').eq(1).should('have.value', '20')
  })

  it('add how many players', () => {
    cy.get('.input__field').eq(2).should('be.visible')
    cy.get('.input__field').eq(2).type('2')
    cy.get('.input__field').eq(2).should('have.value', '2')
  })

  it('add number of lanes ', () => {
    cy.get('.input__field').eq(3).should('be.visible')
    cy.get('.input__field').eq(3).type('1')
    cy.get('.input__field').eq(3).should('have.value', '1')
  })
  
  it('add shoes ', () => {
    cy.get('.shoes__button').click()
    cy.get('.input__field').eq(4).should('be.visible')
    cy.get('.input__field').eq(4).type('43')
    cy.get('.input__field').eq(4).should('have.value', '43')
  })

  it('add shoes and remove shoes ', () => {
    cy.get('.shoes__button').click().click()
    cy.get('.shoes__form').should('have.length.greaterThan', 1)
    cy.get('.shoes__button--small').first().click()
    cy.get('.shoes__form').should('have.length', 1)
  })

  it('add shoes and compare to number of people', () => {
    cy.get('.input__field').eq(2).type('3')
    cy.get('.input__field').eq(2).should('have.value', '3')
    cy.get('.shoes__button').click().click().click()
    cy.get('.shoes__form').should('have.length.greaterThan', 2)
  })

  it('add a booking and click, go to confirm booking.', () => {
    cy.get('.input__field').first().type('2023-05-29') //lägg in datum
    cy.get('.input__field').should('have.value', '2023-05-29')
    cy.get('.input__field').eq(1).type('20')// tid
    cy.get('.input__field').eq(1).should('have.value', '20')
    cy.get('.input__field').eq(2).type('2')//antal spelare
    cy.get('.input__field').eq(2).should('have.value', '2')
    cy.get('.input__field').eq(3).type('1')//antal banor
    cy.get('.input__field').eq(3).should('have.value', '1')
    cy.get('.shoes__button').click().click() // lägg till skor
    cy.get('.booking__button').click()
    cy.wait(1000) // pausar testet
    cy.get('.confirmation__price > p').last().should('contain', '340')
    cy.get('.input__label').eq(3).should('have.text', 'Booking number')// bokningsnummert
    cy.get('.input__field').eq(3).should('not.have.value', '' )
  })

  it('add a booking without all input filled in', () => {
    cy.get('.input__field').eq(1).type('20')// tid
    cy.get('.input__field').eq(1).should('have.value', '20')
    cy.get('.input__field').eq(2).type('2')//antal spelare
    cy.get('.input__field').eq(2).should('have.value', '2')
    cy.get('.input__field').eq(3).type('1')// antal banor
    cy.get('.input__field').eq(3).should('have.value', '1')
    cy.get('.shoes__button').click().click() // lägg till skor
    cy.get('.booking__button').click()
    cy.get('.error-message').should('contain', 'Fill out all the fields')
  })

  it('add a booking and click and get total sum per person ', () => {
    cy.get('.input__field').first().type('2023-05-29') //lägg in datum
    cy.get('.input__field').should('have.value', '2023-05-29')
    cy.get('.input__field').eq(1).type('20')// tid
    cy.get('.input__field').eq(1).should('have.value', '20')
    cy.get('.input__field').eq(2).type('2')//antal spelare
    cy.get('.input__field').eq(2).should('have.value', '2')
    cy.get('.input__field').eq(3).type('1')// antal banor
    cy.get('.input__field').eq(3).should('have.value', '1')
    cy.get('.shoes__button').click().click() // lägg till skor
    cy.get('.booking__button').click()
    cy.wait(1000) // pausar testet
    cy.get('.confirmation__price > p').last().should('contain', '340')// total summan är (120 kr / person + 100 kr / bana)
    cy.get('.input__label').eq(3).should('have.text', 'Booking number')// bokningsnummer
    cy.get('.input__field').eq(3).should('not.have.value', '' )// kommer det något värde tillbaka
  })
  it('check the input fields on confirmation page', () => {
    cy.get('.input__field').first().type('2023-05-29') //lägg in datum
    cy.get('.input__field').should('have.value', '2023-05-29')
    cy.get('.input__field').eq(1).type('20')// tid
    cy.get('.input__field').eq(1).should('have.value', '20')
    cy.get('.input__field').eq(2).type('2')//antal spelare
    cy.get('.input__field').eq(2).should('have.value', '2')
    cy.get('.input__field').eq(3).type('1')//antal banor
    cy.get('.input__field').eq(3).should('have.value', '1')
    cy.get('.shoes__button').click().click() // lägg till skor
    cy.get('.booking__button').click()
    cy.wait(1000) // pausar testet
    cy.get('.confirmation__price > p').last().should('contain', '340')
    cy.get('.input__label').eq(3).should('have.text', 'Booking number')// bokningsnummer
    cy.get('.input__field').eq(3).should('not.have.value', '' )// kommer det något värde tillbaka
  })


  it('add a booking but without date filled out', () => {
    cy.get('.input__field').eq(1).type('20')// tid
    cy.get('.input__field').eq(1).should('have.value', '20')
    cy.get('.input__field').eq(2).type('2')//antal spelare
    cy.get('.input__field').eq(2).should('have.value', '2')
    cy.get('.input__field').eq(3).type('1')// antal banor
    cy.get('.input__field').eq(3).should('have.value', '1')
    cy.get('.shoes__button').click().click() // lägg till skor
    cy.get('.booking__button').click()
    cy.get('.error-message').should('contain', 'Fill out all the fields')
  })

  it('add a booking but without time filled out', () => {
    cy.get('.input__field').first().type('2023-05-29') //lägg in datum
    cy.get('.input__field').should('have.value', '2023-05-29')
    cy.get('.input__field').eq(2).type('2')//antal spelare
    cy.get('.input__field').eq(2).should('have.value', '2')
    cy.get('.input__field').eq(3).type('1')// antal banor
    cy.get('.input__field').eq(3).should('have.value', '1')
    cy.get('.shoes__button').click().click() // lägg till skor
    cy.get('.booking__button').click()
    cy.get('.error-message').should('contain', 'Fill out all the fields')
  })

  it('add a booking but without player filled out', () => {
    cy.get('.input__field').first().type('2023-05-29') //lägg in datum
    cy.get('.input__field').should('have.value', '2023-05-29')
    cy.get('.input__field').eq(1).type('20')// tid
    cy.get('.input__field').eq(1).should('have.value', '20')
    cy.get('.input__field').eq(3).type('1')// antal banor
    cy.get('.input__field').eq(3).should('have.value', '1')
    cy.get('.shoes__button').click().click() // lägg till skor
    cy.get('.booking__button').click()
    cy.get('.error-message').should('contain', 'Fill out all the fields')
  })

  it('add a booking but without lanes filled out', () => {
    cy.get('.input__field').first().type('2023-05-29') //lägg in datum
    cy.get('.input__field').should('have.value', '2023-05-29')
    cy.get('.input__field').eq(1).type('20')// tid
    cy.get('.input__field').eq(1).should('have.value', '20')
    cy.get('.input__field').eq(2).type('2')//antal spelare
    cy.get('.input__field').eq(2).should('have.value', '2')
    cy.get('.shoes__button').click().click() // lägg till skor
    cy.get('.booking__button').click()
    cy.get('.error-message').should('contain', 'Fill out all the fields')
  })
  
  it('add a booking but without shoes filled out', () => {
    cy.get('.input__field').first().type('2023-05-29') //lägg in datum
    cy.get('.input__field').should('have.value', '2023-05-29')
    cy.get('.input__field').eq(1).type('20')// tid
    cy.get('.input__field').eq(1).should('have.value', '20')
    cy.get('.input__field').eq(2).type('2')//antal spelare
    cy.get('.input__field').eq(2).should('have.value', '2')
    cy.get('.input__field').eq(3).type('1')// antal banor
    cy.get('.input__field').eq(3).should('have.value', '1')
    cy.get('.booking__button').click()
    cy.get('.error-message').should('contain', 'Fill out all the fields')
  })
  it('add a booking number of shoes need to match number of players', () => {
    cy.get('.input__field').first().type('2023-05-29') //lägg in datum
    cy.get('.input__field').should('have.value', '2023-05-29')
    cy.get('.input__field').eq(1).type('20')// tid
    cy.get('.input__field').eq(1).should('have.value', '20')
    cy.get('.input__field').eq(2).type('2')//antal spelare
    cy.get('.input__field').eq(2).should('have.value', '2')
    cy.get('.input__field').eq(3).type('1')// antal banor
    cy.get('.input__field').eq(3).should('have.value', '1')
    cy.get('.shoes__button').click()
    cy.get('.booking__button').click()
    cy.get('.error-message').should('contain', 'Fill out all the fields')
  })


})