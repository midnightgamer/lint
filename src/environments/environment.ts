export const environment = {
  production: false,
  mlayer_url: 'https://mlayer.iudx.io/',
  web_url: 'catalogue.iudx.io',
  res_url: 'https://k8s-rs.iudx.io/',
  auth_url: 'https://authvertx.iudx.io/',
  sso_url: 'http://localhost:4200/',
  consumer_web: 'http://localhost:5000/',
  provider_web: 'http://localhost:8000/',
  parent_domain: 'localhost',
  keycloak: {
    url: 'https://identitydev.iudx.io/auth/',
    realm:'demo',
    clientId: 'angular-iudx-client'
  },
  res_public_token_url: 'rs.iudx.io'
};
