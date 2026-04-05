const AuthorSchema = require("./author.schema")
const BlogPostSchema = require("../blogPost/blogPost.schema");
const CommentSchema = require("../comment/comment.schema")

const getAuthors = async (page, pageSize) => {
  const users = await AuthorSchema.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize)
  const totalUsers = await AuthorSchema.countDocuments()
  const totalPages = Math.ceil(totalUsers / pageSize)
  return {
    page,
    pageSize,
    totalUsers,
    totalPages,
    users
  }
}

const getAuthorById = async (userId) => {
  const user = await AuthorSchema.findById(userId)
  return user
}

const getAuthorByEmail = async (email) => {
  const existingAuthor = await AuthorSchema.findOne({ email })
  return existingAuthor
}

const createAuthor = async (body) => {
  const newAuthor = new AuthorSchema(body)
  const savedUser = await newAuthor.save()
  return savedUser
}

const updateAuthor = async (userId, body) => {

  const options = { new: true }
  return await AuthorSchema.findByIdAndUpdate(userId, body, options)

}

const updateAllDocuments = async () => {
  return await AuthorSchema.updateMany(
    { password: { $exists: false } },
    { $set: { password: '' } }
  )
}

const deleteAuthor = async (userId) => {
  const authorPosts = await BlogPostSchema.find({ author: userId });
  const postIds = authorPosts.map(post => post._id);

  const authorComments = await CommentSchema.find({ author: userId });
  const commentIds = authorComments.map(c => c._id);

  await BlogPostSchema.updateMany(
    { comments: { $in: commentIds } },
    { $pull: { comments: { $in: commentIds } } }
  );

  const commentsOnAuthorPosts = await CommentSchema.find({ blogPost: { $in: postIds } });
  const commentIdsOnPosts = commentsOnAuthorPosts.map(c => c._id);

  await AuthorSchema.updateMany(
    { comments: { $in: commentIdsOnPosts } },
    { $pull: { comments: { $in: commentIdsOnPosts } } }
  );

  await CommentSchema.deleteMany({ _id: { $in: [...commentIds, ...commentIdsOnPosts] } });
  await BlogPostSchema.deleteMany({ author: userId });

  return await AuthorSchema.findByIdAndDelete(userId);
};



module.exports = {
  getAuthors,
  getAuthorById,
  getAuthorByEmail,
  createAuthor,
  updateAuthor,
  updateAllDocuments,
  deleteAuthor
}