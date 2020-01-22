
const express = require('express')
const config  = require('config')

const app = express()
const port = config.get('server.port')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => console.log(`Express server started on port: ${port}!`))

