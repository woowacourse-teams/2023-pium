const login = () => {
  const COOKIE = 'piumCypressSessionId';
  const currentTime = Date.now();
  const sixHoursLater = currentTime + 6 * 60 * 60 * 1000;
  cy.setCookie('JSESSION', COOKIE, { expiry: sixHoursLater });
};

export default login;
