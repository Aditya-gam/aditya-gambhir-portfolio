/// <reference types="cypress" />

describe('Debug Homepage', () => {
  it('should show what buttons are available on the homepage', () => {
    cy.visit('/');

    // Wait for page to load
    cy.wait(2000);

    // Log all buttons on the page
    cy.get('button').then(($buttons) => {
      const buttonTexts = $buttons.map((i, btn) => btn.innerText).get();
      cy.log('Found buttons:', JSON.stringify(buttonTexts));
    });

    // Check if we can find any text containing "Resume"
    cy.contains('Resume').should('be.visible');

    // Check if we can find any text containing "Download"
    cy.contains('Download').should('be.visible');

    // Look for the specific button text
    cy.contains('Download Resume').should('be.visible');
  });
});
