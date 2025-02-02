export class Shoppingcartpage {

constructor() {

    this.productquantity = '#productAmount';
    this.unitpriceproduct = '#unitPrice';
    this.totalpriceproduct = '#totalPrice';
    this.showtotalprice = '#price';
}

verifyproductname(product) {
    return cy.get('p').contains(product).should('exist').and('have.text',product);
};

verifyquantityproduct(product) {
    return cy.get('p').contains(product).siblings(this.productquantity);
};

verifyunitpriceproduct(product) {
    return cy.get('p').contains(product).siblings(this.unitpriceproduct);
};

verifytotalpriceproduct(product) {
    return cy.get('p').contains(product).siblings(this.totalpriceproduct);
};

clickonshowtotalprice(){
    cy.get('button').contains("Show total price").click();
};

verifytotalprice() {
    return cy.get(this.showtotalprice);
};

};