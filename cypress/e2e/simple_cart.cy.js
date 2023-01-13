describe("Simple cart", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="product-link-1"]').click();
    cy.get('[data-testid="add-to-cart-button"]').click();

    cy.visit("http://localhost:3000/cart");
  });

  it("add item to cart", () => {
    cy.contains("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
  });

  it("remove item from cart", () => {
    cy.get('[data-testid="remove-from-cart-button-product-1"]').click();
    cy.get('[data-testid="cart-container"]').should(
      "not.contain",
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    );
  });

  it("increase item quantity", () => {
    cy.get('[data-testid="increase-item-quantity-button"]').click();
    cy.get('[data-testid="item-quantity"]').should("contain", "2");
  });

  it("decrease item quantity", () => {
    cy.get('[data-testid="increase-item-quantity-button"]').click();
    cy.get('[data-testid="decrease-item-quantity-button"]').click();
    cy.get('[data-testid="item-quantity"]').should("contain", "1");
  });
});
