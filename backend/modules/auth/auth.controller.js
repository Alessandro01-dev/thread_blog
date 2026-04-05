const authService = require('./auth.service')

const login = async (req, res, next) => {
  const { body } = req
  try {
    const token = await authService.login(body)

    res.status(200).send({
      statusCode: 200,
      message: "Login successfully",
      token
    })
  } catch (e) {
    next(e)
  }
}

const loggedUser = (req, res) => {
  res.send(req.user)
}

module.exports = {
  login,
  loggedUser
}