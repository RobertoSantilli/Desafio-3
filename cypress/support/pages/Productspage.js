export class Productspage {

constructor(){
    this.searchproductbar = '#search-bar';
    this.closebuttonproductadded = '#closeModal';
    this.gotoshoppingcartbutton = '#goShoppingCart';

}

searchaproduct(product){
    cy.get(this.searchproductbar, {timeout: 5000}).type(product);
};

addtocartproduct(product){
   cy.get('p').contains(product).siblings('div').children("button[aria-label='Add to cart']").click();

};

closemessageproductadded(){
   cy.get(this.closebuttonproductadded, {timeout: 5000}).click();
};

clickongotoshoppingcart(){
    cy.get(this.gotoshoppingcartbutton).click();
};

};