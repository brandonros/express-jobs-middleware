const camelcaseKeys = require('camelcase-keys')

module.exports = (fn) => {
  return (req, res) => {
    fn(req, res)
    .then(({ statusCode, body }) => {
      res.status(statusCode).send(camelcaseKeys(body))
    })
    .catch((err) => {
      res.status(500).end(err.stack)
    })
  }
}
