describe("Open the homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("finds an element", () => {
    cy.get('[href="/"]');
  });
  it("finds an element", () => {
    cy.get(":nth-child(2) > #order-pizza");
  });

  it("finds an element", () => {
    cy.get(
      '[style="background-color: white; height: 620px; width: 500px; display: flex; flex-direction: column; justify-content: center; padding: 0px 20px; letter-spacing: 1.3px;"] > h1'
    );
  });

  it("checks for an element", () => {
    cy.get(".sc-bcXHqe").click();
    cy.url().should("include", "/pizza");
  });

  it("checks for false conditions", () => {
    cy.get(".sc-bcXHqe").click();
    cy.get("#name-input").type("i").should("have.value", "i");

    cy.wait(2000);
    cy.get(".cy-nameError").should(
      "include.text",
      "isim en az 2 karakter olmalıdır"
    );

    cy.get("#size-dropdown").select("Medium").should("have.value", "Medium");

    cy.get("#size-dropdown")
      .select("--- Please select the size of the pizza ---")
      .should("have.value", "");

    cy.wait(2000);
    cy.get(".cy-sizeError").should(
      "include.text",
      "You must select one of sizes."
    );

    cy.get(".cy-submit").should("be.disabled");
  });

  it("checks for true conditions", () => {
    cy.get(".sc-bcXHqe").click();
    cy.get("#name-input").type("İstanbul").should("have.value", "İstanbul");

    cy.get("#size-dropdown").select("Large").should("have.value", "Large");

    cy.get('[type="radio"]').check("bbq");
    cy.get('input[type="checkbox"]').check([
      "pepperoni",
      "salami",
      "bacon",
      "extraCheese",
    ]);

    cy.get("#special-text")
      .type("Bol malzeme pls.Thanks!")
      .should("have.value", "Bol malzeme pls.Thanks!");

    cy.get(".cy-submit").click();
    cy.wait(1000);
    cy.get(".cy-orderDiv").should("be.visible");
  });
});
