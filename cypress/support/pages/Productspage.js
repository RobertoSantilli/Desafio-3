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
   cy.get(`button[name="${product}"]`).click();
   
};

closemessageproductadded(){
   cy.get(this.closebuttonproductadded, {timeout: 5000}).click();
};

clickongotoshoppingcart(){
    cy.get(this.gotoshoppingcartbutton).click();
};

};