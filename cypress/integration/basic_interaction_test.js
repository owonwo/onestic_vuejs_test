/// <reference types="Cypress" />

context("User order stories", () => {
  it("Customer can calculator meals", () => {
    cy.visit("/meals");
    const recipeForm = cy.get("form.recipe-form__form");

    const fields = Object.entries({
      eggs: "40923",
      pasta: "800",
      butter: "2094",
      milk: "2000",
      oil: "700",
      bacon: "1200",
    });

    // type the values into their respective fields in the meal calculator form
    fields.map(([fieldname, value]) => {
      const field = recipeForm.get(`[name=${fieldname}]`);
      field.clear();
      field.type(value);
    });

    recipeForm.get("button[type=submit]").click();
    recipeForm
      .get(".recipe-form__total-meals")
      .should("include.text", "1 meal");
    cy.wait(2000);
  });

  it("Customer can toggle between light (default) and dark mode", () => {
    cy.visit("/");
    cy.get("#app").as("root");
    cy.get(".theme-toggler").as("toggleBtn");
    cy.get("@toggleBtn").click();

    cy.wait(200);
    cy.get("@root").should("have.class", "theme-dark");

    cy.get("@toggleBtn").click();
    cy.get("@root").should("not.have.class", "theme-dark");
  });

  it("Customer can search for Store", () => {
    cy.visit("/restaurants");
    cy.get(".search > input").as("searchInput");

    const searchStr = "192";

    // try searching for an existing Store
    cy.get("@searchInput").type(searchStr);
    cy.get(".store-list__grid").children().should('have.length.greaterThan', 0)
    cy.wait(5000)
    
    // try searching for a non-existent store
    cy.get("@searchInput").clear().type("Macdonald's Store")
    cy.get(".store-list__grid").children().should('have.length', 0)
    cy.wait(5000)
  });
});
