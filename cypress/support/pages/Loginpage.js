export class Loginpage {

constructor() {
    this.userinput = '//input[@id="user"]';
    this.passwordinput = '//input[@id="pass"]';
    this.loginbutton = '#submitForm';
};

typeusername(user) {
    cy.xpath(this.userinput).type(user);
};

typeuserpassword(password) {
    cy.xpath(this.passwordinput).type(password);
};

clickonloginbutton() {
    cy.get(this.loginbutton).click();
};

};