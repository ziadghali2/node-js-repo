console.log('Statrting app.js');

const fs = require('fs')
const express = require('express')
const hbs = require('hbs')

const port = process.env.PORT || 3000

var app = express()

app.set('view engine','hbs')

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  })
  next()
})

app.get('/',(req,res) => {
  res.render('home.hbs', {
    pageTitle: 'ex Home page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  })
})

app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    pageTitle: 'Projects'
  })
})

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    pageTitle: 'ex About page',
    currentYear: new Date().getFullYear()
  })
})

app.listen(port,() => {
  console.log(`server is up ${port}`);
})
