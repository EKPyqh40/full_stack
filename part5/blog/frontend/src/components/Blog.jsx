import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)
  // const [likes, setLikes] = useState(blog.likes); // Downside of keeping the likes in Blog is that it doesn't update the order, I think this is okay, changing order while liking seems annoying.

  if (!expanded) {
    return (
      <div className="blog">
        {blog.title} {blog.author}{' '}
        <button onClick={() => setExpanded(true)}>view</button>
      </div>
    )
  }
  console.log(blog)
  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setExpanded(false)}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={likeBlog}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <div>
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
