const blogPostService = require("./blogPost.service")
const EmailService = require('../mail/mail.service')

const email = new EmailService()

const findAll = async (request, response, next) => {
  const { page = 1, pageSize = 4 } = request.query
  try {
    const {
      totalBlogPosts,
      totalPages,
      blogPosts
    } = await blogPostService.getBlogPosts(page, pageSize)
    if (blogPosts.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "Blog posts not found"
      })
    }
    response.status(200).send({
      statusCode: 200,
      page: Number(page),
      pageSize: Number(pageSize),
      totalBlogPosts: Number(totalBlogPosts),
      totalPages: Number(totalPages),
      blogPosts
    })
  } catch (error) {
    next(error)
  }
}

const findByTitle = async (request, response) => {
  const { title, page = 1, pageSize = 4 } = request.query
  try {
    const {
      totalBlogPosts,
      totalPages,
      blogPosts
    } = await blogPostService.getBlogPostsByTitle(title, page, pageSize)
    if (blogPosts.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "Blog posts not found"
      })
    }
    response.status(200).send({
      statusCode: 200,
      page: Number(page),
      pageSize: Number(pageSize),
      totalBlogPosts: Number(totalBlogPosts),
      totalPages: Number(totalPages),
      blogPosts
    })
  } catch (error) {
    next(error)
  }
}

const findOne = async (request, response, next) => {
  const { blogPostId } = request.params
  try {
    if (!blogPostId) {
      return response.status(400).send({
        statusCode: 400,
        message: "Invalid param provided"
      })
    }
    const blogPost = await blogPostService.getBlogPostById(blogPostId)
    if (!blogPost) {
      return response.status(404).send({
        statusCode: 404,
        message: "Blog post not found"
      })
    }
    response.status(200).send({
      statusCode: 200,
      blogPost
    })
  } catch (error) {
    next(error)
  }
}

const create = async (request, response, next) => {
  const { body } = request
  try {
    const newBlogPost = await blogPostService.createBlogPost(body)
    response.status(201).send({
      statusCode: 201,
      message: "Blog post created successfully",
      newBlogPost
    })
    await email.send(
      'user@gmail.com',
      'Blog post created successfully',
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

const update = async (request, response, next) => {
  const { body } = request
  const { blogPostId } = request.params
  try {
    const updatedBlogPost = await blogPostService.updateBlogPost(blogPostId, body)
    if (!blogPostId) {
      return response.status(404).send({
        statusCode: 404,
        message: "Cannot update blog post"
      })
    }
    response.status(200).send({
      statusCode: 200,
      message: "Blog post updated successfully",
      updatedBlogPost
    })
  } catch (error) {
    next(error)
  }
}

const deleteOne = async (request, response, next) => {
  const { blogPostId } = request.params
  try {
    if (!blogPostId) {
      return response.status(400).send({
        statusCode: 400,
        message: "Invalid param provided"
      })
    }
    await blogPostService.deleteBlogPost(blogPostId)

    response.status(200).send({
      statusCode: 200,
      message: "Blog post deleted successfully"
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAll,
  findByTitle,
  findOne,
  create,
  uploadFileOnCloud,
  update,
  deleteOne,
}