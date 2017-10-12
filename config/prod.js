// prod.js okay to commit
module.exports = {
  redditClientID: process.env.REDDIT_CLIENT_ID,
  redditClientSecret: process.env.REDDIT_CLIENT_SECRET,
  redditUserAgent: process.env.REDDIT_USER_AGENT,
  mongooseURI: process.env.MONGOOSE_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};
