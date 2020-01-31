
/**
 * Requires/imports
 */
const express = require('express')
const partials = require('express-partials')
const config  = require('config')
const path = require('path')

/**
 * Server Side App init
 */
const app = express()
const port = config.get('server.port')

/**
 * Doc: https://ejs.co/#docs
 * This part picks out syntax/features for stuff under ./views/*
 * ** THERE ARE TOO MANY WAYS TO SKIN THIS CAT **
 */
app.use(partials())
app.set('view engine', 'ejs')

/**
 * Static content (css,js,etc)
 */
app.use("/static/", express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
  let contactGroups =  config.contactGroups
  res.render('home', { contactGroups: contactGroups })
});

app.listen(port, () => console.log(`Express server started on port: ${port}!`))

