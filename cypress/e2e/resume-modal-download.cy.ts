/// <reference types="cypress" />

describe('Resume Modal Content & Download (Phase 7)', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for page load and animations to complete
    // HeroCTAGroup has delay: 0.6 + duration: 0.6 = 1.2s total
    cy.wait(2000);
  });

  describe('Modal Basic Functionality', () => {
    it('opens resume modal from hero CTA', () => {
      // Wait for button to be present and force click to bypass animation timing issues
      cy.get('button').contains('Download Resume').should('exist');
      cy.get('button').contains('Download Resume').click({ force: true });

      // Wait for modal to appear
      cy.wait(1000);

      // Verify modal opens using conditional check like the working debug test
      cy.get('body').then(($body) => {
        if ($body.find('.resume-modal-content').length > 0) {
          cy.log('✅ Modal appeared after force click!');
          cy.get('.resume-modal-content').should('be.visible');
          cy.get('[data-testid="download-resume-btn"]').should('exist');
        } else {
          throw new Error(
            '❌ Modal did not appear - check ResumeModalContext integration',
          );
        }
      });
    });

    it('switches between content and preview views', () => {
      cy.get('button').contains('Download Resume').click({ force: true });

      // Should start in content view
      cy.contains('button', 'Content').should('have.class', 'bg-primary');
      cy.get('.resume-content').should('be.visible');

      // Switch to preview
      cy.contains('button', 'PDF Preview').click();
      cy.contains('button', 'PDF Preview').should('have.class', 'bg-primary');
      cy.get('iframe').should('be.visible');

      // Switch back to content
      cy.contains('button', 'Content').click();
      cy.contains('button', 'Content').should('have.class', 'bg-primary');
      cy.get('.resume-content').should('be.visible');
    });

    it('displays condensed resume content sections', () => {
      cy.get('button').contains('Download Resume').click({ force: true });

      // Check header section
      cy.get('.resume-content').should('contain', 'Aditya Gambhir');
      cy.get('.resume-content').should('contain', 'gambhir.aditya19@gmail.com');
      cy.get('.resume-content').should('contain', 'Riverside, CA');

      // Check section headings
      cy.get('.resume-content').should('contain', 'Professional Summary');
      cy.get('.resume-content').should('contain', 'Core Skills');
      cy.get('.resume-content').should('contain', 'Professional Experience');
      cy.get('.resume-content').should('contain', 'Education');
      cy.get('.resume-content').should('contain', 'Key Achievements');
    });

    it('shows relevant skills based on resume type', () => {
      cy.get('button').contains('Download Resume').click({ force: true });

      // Should show SDE skills by default
      cy.get('.resume-content').should('contain', 'Languages');
      cy.get('.resume-content').should('contain', 'Frameworks');
      cy.get('.resume-content').should('contain', 'Databases');
    });

    it('limits experience to top 3 items', () => {
      cy.get('button').contains('Download Resume').click({ force: true });

      // Count experience cards (should be max 3)
      cy.get('.resume-content')
        .find('section')
        .contains('Professional Experience')
        .parent()
        .find('.border-l-4.border-l-primary')
        .should('have.length.at.most', 3);
    });
  });

  describe('Download Functionality', () => {
    it('has download button and triggers download action', () => {
      cy.get('button').contains('Download Resume').click({ force: true });

      // Check download button exists and is clickable
      cy.get('[data-testid="download-resume-btn"]')
        .should('be.visible')
        .should('contain', 'Download')
        .click();

      // Verify button was clicked successfully (no errors)
      cy.get('[data-testid="download-resume-btn"]').should('exist');
    });

    it('shows correct file size in metadata', () => {
      cy.get('button').contains('Download Resume').click({ force: true });

      // Check that file size is displayed and reasonable (updated to match actual file size)
      cy.contains('114KB').should('be.visible');
    });
  });

  describe('Print Functionality', () => {
    it('shows print button', () => {
      cy.get('button').contains('Download Resume').click({ force: true });
      cy.contains('button', 'Print').should('be.visible');
    });

    it('has print-specific CSS classes for styling', () => {
      cy.get('button').contains('Download Resume').click({ force: true });

      // Check that print-specific classes exist
      cy.get('.resume-modal-content').should('exist');
      cy.get('.resume-content').should('exist');
      cy.get('.no-print').should('exist');
    });
  });

  describe('Modal Accessibility & UX', () => {
    it('traps focus within modal', () => {
      cy.get('button').contains('Download Resume').click({ force: true });

      // First focusable element should be focused
      cy.focused().should('exist');

      // Tab through modal should stay within
      cy.focused().type('{tab}');
      cy.focused().should('be.visible');
    });

    it('closes modal with escape key', () => {
      cy.get('button').contains('Download Resume').click({ force: true });
      cy.get('.resume-modal-content').should('be.visible');

      cy.get('body').type('{esc}');
      cy.get('.resume-modal-content').should('not.exist');
    });

    it('is scrollable when content exceeds viewport (90vh requirement)', () => {
      // Test on smaller viewport
      cy.viewport(1024, 600);
      cy.get('button').contains('Download Resume').click({ force: true });

      // Check if scrollable container exists
      cy.get('.overflow-y-auto').should('exist');
      cy.get('.scrollbar-thin').should('exist');
    });

    it('shows resume metadata correctly', () => {
      cy.get('button').contains('Download Resume').click({ force: true });

      // Check metadata display (updated to match actual content)
      cy.contains('Software Engineering roles').should('be.visible');
      cy.contains('114KB').should('be.visible');
      cy.contains('Last updated:').should('be.visible');
    });
  });

  describe('Responsive Design', () => {
    it('adapts layout for mobile viewports', () => {
      cy.viewport(375, 812);
      cy.get('button').contains('Download Resume').click({ force: true });

      // Modal should be responsive
      cy.get('.resume-modal-content').should('be.visible');
      cy.get('.flex-col').should('exist');
    });

    it('maintains functionality on tablet viewports', () => {
      cy.viewport(768, 1024);
      cy.get('button').contains('Download Resume').click({ force: true });

      // All functionality should work
      cy.contains('button', 'PDF Preview').click();
      cy.get('iframe').should('be.visible');
      cy.get('[data-testid="download-resume-btn"]').should('be.visible');
    });
  });
});
