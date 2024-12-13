import { Registerpage } from "../support/pages/Registerpage";
import { Loginpage } from "../support/pages/Loginpage";
import { Homepage } from "../support/pages/Homepage";
import { Productspage } from "../support/pages/Productspage";
import { Shoppingcartpage } from "../support/pages/Shoppingcartpage";

describe('Desafio #3 / Roberto Santilli', () => {

const registerpage = new Registerpage();
const loginpage = new Loginpage();
const homepage = new Homepage();
const productspage = new Productspage();
const shoppingcartpage = new Shoppingcartpage();

let data;

before('Cargar parametros para realizar el test', () => {
    cy.fixture('Basededatos').then(Datos =>{
        data=Datos;
    });
 });

beforeEach('Inicio de Sesion en pagina web', () => {
    cy.visit('');
    registerpage.clickonloginpagebutton();
    loginpage.typeusername(Cypress.env().user);
    loginpage.typeuserpassword(Cypress.env().password);
    loginpage.clickonloginbutton();
});

it('Test Desafio 3', () => {
    homepage.gettodolistpagebutton().should('exist').and('have.text', 'To Do List');
    homepage.getwaitspagebutton().should('exist').and('have.text', 'Waits');
    homepage.getalertspagebutton().should('exist').and('have.text', 'Alerts');
    homepage.getformutilspagebutton().should('exist').and('have.text', 'Form Utils');
    homepage.getfileuploadpagebutton().should('exist').and('have.text', 'File Upload');
    homepage.getonlineshoppagebutton().should('exist').and('have.text', 'Online Shop').click();

    productspage.searchaproduct(`${data.producto.buzo_azul}{enter}`);
    productspage.addtocartproduct(data.producto.buzo_azul);
    productspage.closemessageproductadded();
    productspage.addtocartproduct(data.producto.buzo_azul);
    productspage.closemessageproductadded();
    productspage.searchaproduct(`{selectall}{del}${data.producto.jean_azul}{enter}`);
    productspage.addtocartproduct(data.producto.jean_azul);
    productspage.closemessageproductadded();
    productspage.clickongotoshoppingcart();
    
    shoppingcartpage.verifyproductname(data.producto.buzo_azul);
    shoppingcartpage.verifyquantityproduct(data.producto.buzo_azul).should('have.text', `${data.cantidad.dos}`).and('exist');
    shoppingcartpage.verifyunitpriceproduct(data.producto.buzo_azul).should('have.text',`$${data.precio_unit.buzo_azul}`).and('exist');
    shoppingcartpage.verifytotalpriceproduct(data.producto.buzo_azul).should('have.attr','name',`${data.cantidad.dos*data.precio_unit.buzo_azul}`).and('exist');

    shoppingcartpage.verifyproductname(data.producto.jean_azul);
    shoppingcartpage.verifyquantityproduct(data.producto.jean_azul).should('have.text', `${data.cantidad.uno}`).and('exist');
    shoppingcartpage.verifyunitpriceproduct(data.producto.jean_azul).should('have.text',`$${data.precio_unit.jean_azul}`).and('exist');
    shoppingcartpage.verifytotalpriceproduct(data.producto.jean_azul).should('have.attr','name',`${data.cantidad.uno*data.precio_unit.jean_azul}`).and('exist');

    shoppingcartpage.clickonshowtotalprice();
    shoppingcartpage.verifytotalprice().should('have.text',(data.cantidad.dos*data.precio_unit.buzo_azul+data.cantidad.uno*data.precio_unit.jean_azul).toFixed(2)).and('exist'); 
});
});