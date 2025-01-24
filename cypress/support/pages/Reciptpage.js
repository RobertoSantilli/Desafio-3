export class Reciptpage {

    constructor() {
        this.usernameonrecipt = '[data-cy="name"]';
        this.creditcardonrecipt = '[data-cy="creditCard"]';
        this.totalammountrecipt = '[data-cy="totalPrice"]';
    };

    verifyusernameonrecipt() {
        return cy.get(this.usernameonrecipt);
    };

    verifycreditcardonrecipt() {
        return cy.get(this.creditcardonrecipt);
    };

    verifyproductsonrecipt(quantity, product){
        return cy.get('p').contains(quantity, product);
    };

    verifytotalammountrecipt() {
        return cy.get(this.totalammountrecipt);
    };


}