const AuthorSchema = require("../author/author.schema")
const BlogPostSchema = require("../blogPost/blogPost.schema")
const CommentSchema = require("./comment.schema")

const getBlogPostComments = async (page, pageSize, blogPostId) => {
  const comments = await CommentSchema.find({ blogPost: blogPostId })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("author", "name surname avatar")
  const totalComments = await CommentSchema.countDocuments({ blogPost: blogPostId })
  const totalPages = Math.ceil(totalComments / pageSize)
  return {
    page,
    pageSize,
    totalComments,
    totalPages,
    comments
  }
}

const getBlogPostCommentById = async (blogPostId, commentId) => {
  const comment = await CommentSchema.findOne({
    _id: commentId,
    blogPost: blogPostId
  })

  return comment
}

const createBlogPostComment = async (body) => {
  const blogPostId = body.blogPost
  const userId = body.author
  const newComment = new CommentSchema(body)
  const savedComment = await newComment.save()

  await BlogPostSchema.updateOne({ _id: blogPostId }, { $push: { comments: newComment._id } })

  await AuthorSchema.updateOne({ _id: userId }, { $push: { comments: newComment._id } })

  return savedComment
}

const updateBlogPostComment = async (blogPostId, commentId, { content, rating }) => {
  const options = { new: true }
  const updatedComment = await CommentSchema.findOneAndUpdate({
    _id: commentId,
    blogPost: blogPostId
  }, { content, rating }, options)
  return updatedComment
}

const deleteBlogPostComment = async (blogPostId, commentId, userId) => {
  const deletedComment = await CommentSchema.findOneAndDelete({
    _id: commentId,
    blogPost: blogPostId,
    author: userId
  })

  await BlogPostSchema.updateOne(
    { _id: blogPostId },
    { $pull: { comments: commentId } }
  )

  await AuthorSchema.updateOne(
    { _id: deletedComment.author },
    { $pull: { comments: commentId } }
  )

  return deletedComment
}

module.exports = {
  getBlogPostComments,
  getBlogPostCommentById,
  updateBlogPostComment,
  createBlogPostComment,
  deleteBlogPostComment
}