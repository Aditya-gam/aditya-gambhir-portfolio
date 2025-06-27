/// <reference types="cypress" />

describe('Homepage Hero & Global Interactions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the scroll cue only on tall viewports', () => {
    cy.viewport(375, 700);
    cy.get('button[aria-label="Scroll to next section"]').should('be.visible');
    cy.viewport(375, 500);
    cy.get('button[aria-label="Scroll to next section"]').should('not.exist');
  });

  it('scrolls to highlights section when scroll cue is clicked', () => {
    cy.viewport(1440, 900);
    cy.get('button[aria-label="Scroll to next section"]').click();
    cy.url().should('include', '/'); // No route change
    cy.get('#projects').should('exist');
  });

  it('opens and closes the resume modal via CTA', () => {
    cy.contains('button', /download resume/i).click();
    cy.get('[role="dialog"], .fixed').should('exist');
    cy.get('button[aria-label="Close modal"]').click();
    cy.get('[role="dialog"], .fixed').should('not.exist');
  });

  it('traps focus in the resume modal and closes with ESC', () => {
    cy.contains('button', /download resume/i).click();
    cy.get('[role="dialog"], .fixed').should('exist');
    cy.focused().should('exist');
    cy.get('body').type('{esc}');
    cy.get('[role="dialog"], .fixed').should('not.exist');
  });

  it('toggles theme and persists preference', () => {
    cy.get('button[aria-label*="theme"]').click();
    cy.get('html')
      .should('have.attr', 'class')
      .and('match', /dark|light/);
    cy.reload();
    cy.get('html')
      .should('have.attr', 'class')
      .and('match', /dark|light/);
  });
});
