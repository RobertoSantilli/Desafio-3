const baseAPIUrl = "https://pushing-it-3.onrender.com/api";

Cypress.Commands.add('RegisterUser', (user,password,gender,birthday,birthmonth,birthyear) => {
    cy.request({
        method: 'POST',
        url: `${baseAPIUrl}/register`,
        body: {
            username : user,
            password: password,
            gender: gender,
            day: birthday,
            month: birthmonth,
            year: birthyear
        }
    })
})

Cypress.Commands.add('LoginUser', (user,password) => {
    cy.request({
        method: 'POST',
        url: `${baseAPIUrl}/login`,
        body: {
            username : user,
            password: password
        }
    }).then((response) => {
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('token', response.body.user.username);
        window.localStorage.setItem('token', response.body.user._id);
    })
})

Cypress.Commands.add('DeleteUser', (user) => {
    cy.request({
        method: 'DELETE',
        url: `${baseAPIUrl}/deleteuser/${user}`,
    })
})