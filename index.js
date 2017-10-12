const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongooseURI);

const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/api/what', (req, res) => {
  res.send(req.user);
});

if (process.env.NODE_ENV === 'production') {
  // If prod, expres serves production assets like
  // main.css and main.justifyContent:
  app.use(express.static('client/build'));

  // express should serve up the index.html file if it
  // doesnt recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.port || 5000;
app.listen(PORT);
