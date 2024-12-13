export class Registerpage {

    constructor() {
        this.gotologinpagelinkbutton = '#registertoggle';
    };

    clickonloginpagebutton() {
        cy.get(this.gotologinpagelinkbutton).dblclick();
    }
};