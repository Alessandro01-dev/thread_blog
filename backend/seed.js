const mongoose = require('mongoose');
require('dotenv').config();
const Author = require('./modules/author/author.schema');
const BlogPost = require('./modules/blogPost/blogPost.schema');
const Comment = require('./modules/comment/comment.schema');

const authorsData = require('./authorsData');
const blogPostsData = require('./blogPostData');
const commentsData = require('./commentsData');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    await Author.deleteMany({});
    await BlogPost.deleteMany({});
    await Comment.deleteMany({});
    console.log("Database cleared! 🧹");

    const createdAuthors = await Author.create(authorsData);
    console.log(`- Created ${createdAuthors.length} authors`);

    const postsWithAuthors = blogPostsData.map(post => ({
      ...post,
      author: createdAuthors[Math.floor(Math.random() * createdAuthors.length)]._id
    }));
    const createdPosts = await BlogPost.create(postsWithAuthors);
    console.log(`- Created ${createdPosts.length} blog posts`);

    const finalComments = [];
    createdPosts.forEach((post, index) => {
      const startIndex = index * 10;
      const postCommentsBlock = commentsData.slice(startIndex, startIndex + 10);

      postCommentsBlock.forEach(commentObj => {
        finalComments.push({
          content: commentObj.content,
          rating: commentObj.rating,
          blogPost: post._id,
          author: createdAuthors[Math.floor(Math.random() * createdAuthors.length)]._id
        });
      });
    });

    const createdComments = await Comment.create(finalComments);
    console.log(`- Created ${createdComments.length} comments (10 per post)`);

    for (const post of createdPosts) {
      const postCommentsIds = createdComments
        .filter(c => c.blogPost.equals(post._id))
        .map(c => c._id);
      
      await BlogPost.findByIdAndUpdate(post._id, { $set: { comments: postCommentsIds } });
    }
    console.log("- Updated blog posts with comment references");

    console.log("Database Seeded Successfully! 🌱");
    mongoose.connection.close();
    process.exit(0);

  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
};

seedDB();