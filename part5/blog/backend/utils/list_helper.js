const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((likes, blog) => blog.likes + likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((favoriteBlog, blog) => {
    if (blog.likes > favoriteBlog.likes) {
      return { title: blog.title, author: blog.author, likes: blog.likes };
    } else {
      return favoriteBlog;
    }
  });
};

const authorBlogsList = (blogs) => {
  return blogs.reduce((authorBlogsList, blog) => {
    if (
      authorBlogsList
        .map((authorBlogs) => authorBlogs.author)
        .includes(blog.author)
    ) {
      const authorBlogsIndex = authorBlogsList.findIndex((authorBlogs) => {
        return authorBlogs.author === blog.author;
      });

      authorBlogsList[authorBlogsIndex].blogs += 1;
      authorBlogsList[authorBlogsIndex].likes += blog.likes;
      return authorBlogsList;
    } else {
      return authorBlogsList.concat({
        author: blog.author,
        blogs: 1,
        likes: blog.likes,
      });
    }
  }, []);
};

const mostBlogs = (blogs) => {
  const mostBlogs = authorBlogsList(blogs).reduce((mostBlogs, authorBlogs) => {
    if (authorBlogs.blogs > mostBlogs.blogs) {
      return authorBlogs;
    } else {
      return mostBlogs;
    }
  });
  delete mostBlogs.likes;
  return mostBlogs;
};

const mostLikes = (blogs) => {
  const mostLikes = authorBlogsList(blogs).reduce((mostLikes, authorBlogs) => {
    if (authorBlogs.likes > mostLikes.likes) {
      return authorBlogs;
    } else {
      return mostLikes;
    }
  });
  delete mostLikes.blogs;
  return mostLikes;
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
