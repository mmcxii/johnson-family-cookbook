before(() => {
  cy.request("http://localhost:4000/api/test/user");
});

after(() => {
  cy.request("http://localhost:4000/api/test/user/delete");
});
