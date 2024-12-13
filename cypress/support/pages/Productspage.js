export class Productspage {

constructor(){
    this.searchproductbar = '#search-bar';
    this.closebuttonproductadded = '#closeModal';
    this.gotoshoppingcartbutton = '#goShoppingCart';

}

searchaproduct(product){
    return cy.get(this.searchproductbar, {timeout: 5000}).should('exist').type(product);
};

addtocartproduct(product){
   return cy.get('p').contains(product).siblings('div').children("button[aria-label='Add to cart']").should('exist').click();

};

closemessageproductadded(){
   return cy.get(this.closebuttonproductadded, {timeout: 5000}).should('exist').click();
};

clickongotoshoppingcart(){
    return cy.get(this.gotoshoppingcartbutton).should('exist').click();
};

};