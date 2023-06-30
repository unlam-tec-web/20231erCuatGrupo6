const port = 8080

export const environment = {
  production: false,
  checkoutUrl: `http://localhost:${port}/checkout`,
  loginUrl: `http://localhost:${port}/login`,
  registerUrl: `http://localhost:${port}/register`,
  verifyUrl: `http://localhost:${port}/confirm/:confirmationCode`,
};
