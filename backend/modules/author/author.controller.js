const authorService = require("./author.service")
const EmailService = require('../mail/mail.service')

const email = new EmailService()

const findAll = async (request, response, next) => {
  const { page = 1, pageSize = 3 } = request.query
  try {
    const {
      totalUsers,
      totalPages,
      users
    } = await authorService.getAuthors(page, pageSize)
    if (users.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "Authors not found"
      })
    }
    response.status(200).send({
      statusCode: 200,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Number(totalPages),
      totalUsers: Number(totalUsers),
      users
    })
  } catch (error) {
    next(error)
  }
}

const findOne = async (request, response, next) => {
  try {
    const { userId } = request.params
    if (!userId) {
      return response.status(400).send({
        statusCode: 400,
        message: "Invalid param provided"
      })
    }
    const author = await authorService.getAuthorById(userId)
    if (!author) {
      return response.status(404).send({
        statusCode: 404,
        message: "Author not found"
      })
    }
    response.status(200).send({
      statusCode: 200,
      author
    })
  } catch (error) {
    next(error)
  }
}

const create = async (request, response, next) => {
  const { body } = request
  try {
    const existingAuthorEmail = await authorService.getAuthorByEmail(body.email)
    if (existingAuthorEmail) {
      return response.status(400).send({
        statusCode: 400,
        message: "Email already exists"
      })
    }
    const newAuthor = await authorService.createAuthor(body)
    response.status(201).send({
      statusCode: 201,
      message: "Author created successfully",
      newAuthor
    })
    await email.send(
      'newuser@gmail.com',
      'Account created successfully',
      'This is the email message/html'
    )
  } catch (error) {
    next(error)
  }
}

const uploadFileOnCloud = async (req, res, next) => {
  try {
    const img = req.file.path
    res.status(200).json({
      img: img
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  const { body } = req
  const userId = req.user.id

  try {
    const updatedAuthor = await authorService.updateAuthor(userId, body)
    res.status(200).send({
      statusCode: 200,
      message: "Your profile has been updated successfully",
      updatedAuthor
    })
  } catch (error) {
    next(error)
  }
}

const deleteOne = async (req, res, next) => {
  const userId = req.user.id

  try {
    await authorService.deleteAuthor(userId)
    res.status(200).send({
      statusCode: 200,
      message: "Your account has been deleted"
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  uploadFileOnCloud,
  update,
  deleteOne
}