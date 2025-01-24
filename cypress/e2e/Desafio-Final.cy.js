import { Registerpage } from "../support/pages/Registerpage";
import { Loginpage } from "../support/pages/Loginpage";
import { Homepage } from "../support/pages/Homepage";
import { Productspage } from "../support/pages/Productspage";
import { Shoppingcartpage } from "../support/pages/Shoppingcartpage";
import { Billingsummarypage } from "../support/pages/Billingsummarypage";
import { Checkoutpage } from "../support/pages/Checkoutpage"
import { Reciptpage } from "../support/pages/Reciptpage";

describe('Desafio Final / Roberto Santilli', () => {

const registerpage = new Registerpage();
const loginpage = new Loginpage();
const homepage = new Homepage();
const productspage = new Productspage();
const shoppingcartpage = new Shoppingcartpage();
const billingsummarypage = new Billingsummarypage();
const checkoutpage = new Checkoutpage();
const reciptpage = new Reciptpage ();

let data;

before('Cargar datos para realizar el test', () => {
    cy.fixture('Basededatos').then(Datos =>{
        data=Datos;
    });
 });

beforeEach('Registro de usuario e Inicio de Sesion en pagina web', () => {
    cy.RegisterUser(Cypress.env().user,Cypress.env().password,'Male','29','June','1987').then((response) => {
        expect(response.status).eq(201);
    });
    cy.LoginUser(Cypress.env().user,Cypress.env().password).then((response) => {
        expect(response.status).eq(201);
    });
    cy.visit('');
    });

it('Test Desafio Final', () => {
    homepage.getonlineshoppagebutton().and('have.text', 'Online Shop').click();

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
    shoppingcartpage.verifyquantityproduct(data.producto.buzo_azul).should('have.text',`${data.cantidad.dos}`);
    shoppingcartpage.verifyunitpriceproduct(data.producto.buzo_azul).should('have.text',`$${data.precio_unit.buzo_azul}`);
    shoppingcartpage.verifytotalpriceproduct(data.producto.buzo_azul).should('have.attr','name',`${data.cantidad.dos*data.precio_unit.buzo_azul}`);

    shoppingcartpage.verifyproductname(data.producto.jean_azul);
    shoppingcartpage.verifyquantityproduct(data.producto.jean_azul).should('have.text', `${data.cantidad.uno}`);
    shoppingcartpage.verifyunitpriceproduct(data.producto.jean_azul).should('have.text',`$${data.precio_unit.jean_azul}`);
    shoppingcartpage.verifytotalpriceproduct(data.producto.jean_azul).should('have.attr','name',`${data.cantidad.uno*data.precio_unit.jean_azul}`);

    shoppingcartpage.clickonshowtotalprice();
    shoppingcartpage.verifytotalprice().should('have.text',(data.cantidad.dos*data.precio_unit.buzo_azul+data.cantidad.uno*data.precio_unit.jean_azul).toFixed(2)); 
    shoppingcartpage.clickongotobillingsummary();

    billingsummarypage.verifysubtotalbillingammount().should('have.text',`$${(data.cantidad.dos*data.precio_unit.buzo_azul+data.cantidad.uno*data.precio_unit.jean_azul).toFixed(2)}`);
    billingsummarypage.verifytotalbillingammount().should('have.text',`$${(data.cantidad.dos*data.precio_unit.buzo_azul+data.cantidad.uno*data.precio_unit.jean_azul).toFixed(2)}`);
    billingsummarypage.clickoncheckout();

    checkoutpage.typeuserfirstname(data.userdata.name);
    checkoutpage.typeuserlastname(data.userdata.lastname);
    checkoutpage.typeusercreditcard(data.userdata.creditcard);
    checkoutpage.clickonpurchasebutton();

    reciptpage.verifyusernameonrecipt().should('have.text', `${data.userdata.name} ${data.userdata.lastname} has succesfully purchased the following items:`);
    reciptpage.verifyproductsonrecipt(`${data.cantidad.dos} x ${data.producto.buzo_azul}`).should('have.text',`${data.cantidad.dos} x ${data.producto.buzo_azul}`);
    reciptpage.verifyproductsonrecipt(`${data.cantidad.uno} x ${data.producto.jean_azul}`).should('have.text',`${data.cantidad.uno} x ${data.producto.jean_azul}`);
    reciptpage.verifycreditcardonrecipt().should('have.text',`${data.userdata.creditcard}`);
    reciptpage.verifytotalammountrecipt().should('have.text',`Monney spent $${(data.cantidad.dos*data.precio_unit.buzo_azul+data.cantidad.uno*data.precio_unit.jean_azul).toFixed(2)}`);
});

after('Eliminacion del usuario', () =>{
    cy.DeleteUser(Cypress.env().user).then((response) => {
        expect(response.status).eq(202);
    });
});

});