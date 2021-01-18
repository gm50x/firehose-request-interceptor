const express = require('express')
const bodyParser = require('body-parser');

const main = () => {
  const requests = [];
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('*', (req, res) => res.send(requests))

  app.post('*', (req, res) => {
    requests.push({
      headers: req.headers,
      path: req.path,
      params: req.params,
      query: req.query,
      body: req.body,
    })

    res.send({
      requestId: req.body.requestId,
      timestamp: Date.now(),
    })
  })

  app.listen(process.env.PORT || 3005, () => {
    console.log('Application is running.')
  })
}

main();