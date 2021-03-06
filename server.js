const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport')
const path = require('path')
const users = require('./routes/api/users')
const plaid = require('./routes/api/plaid')

const app = express();

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/plaid', plaid);

//if get url, server side
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))

  //everything * doesn't match api route
  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 
                              'client', 
                              'build', 
                              'index.html'))
  })
}
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));