describe("Payment Form", () => {
  it("should visit the payment form", () => {
    cy.visit("./payment-form.html");
  });

  it("should have a main header", () => {
    cy.get("h1")
      .should("have.length", 1)
      .should("contain.text", "Payment Form");
  });

  describe("Form", () => {
    it("should include a single form tag", () => {
      cy.get("form").should("have.length", 1);
    });

    it("should include a single paragraph tag explaining required fields", () => {
      cy.get("p")
        .should("have.length", 1)
        .should("have.text", "Required fields are marked by *");
    });

    it("should have the 2 sub headers", () => {
      cy.get("h2")
        .should("have.length", 2)
        .and((headings) => {
          expect(headings[0]).to.contain.text("Contact Information");
          expect(headings[1]).to.contain.text("Payment Information");
        });
    });

    describe("Radio Buttons", () => {
      it("should have 4 radio buttons", () => {
        cy.get("input[type='radio']").should("have.length", 4);
        cy.contains("Mx.");
        cy.contains("Mr.");
        cy.contains("Ms.");
        cy.contains("Mrs.");
      });

      it("should check the first radio button when the page loads, whatever it is", () => {
        cy.get("input[type='radio']").first().should("be.checked");
      });

      it("should uncheck other radio buttons when a new option is selected", () => {
        cy.get("input[type='radio']").last().click();

        cy.get("input[type='radio']").each(($el, index, $list) => {
          if (index === $list.length - 1) {
            cy.wrap($el).should("be.checked");
          } else {
            cy.wrap($el).not("be.checked");
          }
        });
      });
    });

    describe("Text Inputs", () => {
      it("should have an name input with Name as placeholder", () => {
        cy.get("input[placeholder='Name']").should("have.attr", "type", "text");
        cy.get("input[placeholder='Name']").should("have.attr", "required");
      });

      it("should have an email input with Email as placeholder", () => {
        cy.get("input[placeholder='Email']").should(
          "have.attr",
          "type",
          "email"
        );
        cy.get("input[placeholder='Email']").should("have.attr", "required");
      });
    });

    describe("Dropdown", () => {
      it("should have a select with 4 different card types", () => {
        cy.get("select").children().should("have.length", 4);
        cy.get("option").should((ops) => {
          expect(ops[0]).to.contain.text("Visa");
          expect(ops[1]).to.contain.text("Mastercard");
          expect(ops[2]).to.contain.text("American Express");
          expect(ops[3]).to.contain.text("Discover");
        });

        cy.get("select").select("visa");
        cy.get("select").should("have.value", "visa");

        cy.get("select").select("mastercard");
        cy.get("select").should("have.value", "mastercard");

        cy.get("select").select("american-express");
        cy.get("select").should("have.value", "american-express");

        cy.get("select").select("discover");
        cy.get("select").should("have.value", "discover");
      });
    });

    describe("Credit Card", () => {
      it("should have an Credit Card input with a placeholder", () => {
        cy.get("input[placeholder='xxxx xxxx xxxx xxxx']").should(
          "have.attr",
          "required"
        );
      });

      it("should have an Expiration input with 'mm/yy' as placeholder", () => {
        cy.get("input[placeholder='mm/yy']").should(
          "have.attr",
          "type",
          "text"
        );
        cy.get("input[placeholder='mm/yy']").should("have.attr", "required");
      });
    });

    it("should have a submit button", () => {
      cy.get("input[type='submit']").should("have.value", "Submit Payment");
    });
  });
});
