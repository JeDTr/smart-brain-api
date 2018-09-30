const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'smart-brain'
  }
});
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  db.select('*').from('users')
  .then (users => {
    res.json(users);
  })
})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})

// PORT=3001 npm start
const PORT = process.env.PORT
app.listen(PORT, ()=> {
// app.listen(3001, () => {
  console.log(`app is running on port ${PORT}`)
  // console.log('app is running on port 3001');
})
