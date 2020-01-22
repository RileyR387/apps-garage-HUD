
/**
 * Requires/imports
 */
const express = require('express')
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
app.set('view engine', 'ejs')

/**
 * Static content (css,js,etc)
 */
app.use("/static/", express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
  /**
   * No.. this inline object shouldn't live in the middle of our route control code...
   * Ideally, it would come from 'model' code.. and model code will be retrieving it from somewhere else (config/db/directory)
   * Probably config in this special scenario!
   */
  let contactGroups = [
    {
      name: 'Applications',
      contacts: [
        {name: 'Riley', ext: '0101'},
        {name: 'OtherPerson', ext: '0102'},
      ]
    },
    {
      name: 'Field Services',
      contacts: [
        {name: 'AnotherPer', ext: '1010'},
        {name: 'RamJam', ext: '1011'},
      ]
    },
    {
      name: 'Server',
      contacts: [
        {name: 'Demo Uno', ext: '0103'},
        {name: 'Demo Dos', ext: '0104'},
      ],
    },
    {
      name: 'Networking',
      contacts: [
        {name: 'Too Many', ext: '0105'},
        {name: 'Json is Cool', ext: '0106'},
      ]
    },
    {
      name: 'Security',
      contacts: [
        {name: 'Contact 4', ext: '0107'},
        {name: 'Contact 5 ', ext: '0000'},
      ]
    },
  ]
  res.render('home', { contactGroups: contactGroups });
});

app.listen(port, () => console.log(`Express server started on port: ${port}!`))

