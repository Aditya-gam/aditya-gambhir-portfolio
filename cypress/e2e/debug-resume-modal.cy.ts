/// <reference types="cypress" />

describe('Debug Resume Modal', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('forces button click regardless of animation state', () => {
    // Wait for page to load
    cy.get('button').contains('Download Resume').should('exist');

    // Force click the button regardless of visibility
    cy.get('button').contains('Download Resume').click({ force: true });

    // Wait for modal to appear
    cy.wait(1000);

    // Check if modal appears
    cy.get('body').then(($body) => {
      if ($body.find('.resume-modal-content').length > 0) {
        cy.log('✅ Modal appeared after force click!');
        cy.get('.resume-modal-content').should('exist');
      } else {
        cy.log('❌ Modal did not appear even with force click');
      }
    });
  });

  it('checks if ResumeModalProvider context is working', () => {
    cy.window().then((win) => {
      // Check if React is loaded
      cy.wrap(win.React).should('exist');
    });

    // Check if the page has expected elements
    cy.get('[id="hero"]').should('exist');
    cy.get('button').contains('Download Resume').should('exist');
  });
});
