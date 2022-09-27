const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { RequestError } = require('../helpers')
const { SECRET_KEY } = process.env

const authenticateUser = async (req, _, next) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')

  bearer !== 'Bearer' && next(RequestError(401))

  try {
    jwt.verify(token, SECRET_KEY)

    const user = await User.findOne({ token })

    !user && next(RequestError(401))

    req.user = user

    next()
  } catch (error) {
    next(RequestError(401, error.message))
  }
}

module.exports = { authenticateUser }
