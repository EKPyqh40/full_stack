import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)

  if (!expanded) {
    return (
      <div className="blog">
        {blog.title} {blog.author}{' '}
        <button onClick={() => setExpanded(true)}>view</button>
      </div>
    )
  }
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
