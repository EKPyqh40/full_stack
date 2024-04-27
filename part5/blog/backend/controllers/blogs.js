const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const userExtractor = require('../utils/middleware').userExtractor;

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  blog ? response.json(blog) : response.status(404).end();
});

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  console.log('test', blog); // Issue is that there is no blog with a user, should work on this, i.e. can only delete if a blog is created with user and that blgo should be deleted by that user
  console.log('DELETE', blog.user.toString(), request.user.id);
  if (blog.user.toString() !== request.user.id.toString()) {
    return response.status(403).json({ error: 'user not authorized' });
  }

  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  });
  response.json(updatedBlog);
});

module.exports = blogRouter;
