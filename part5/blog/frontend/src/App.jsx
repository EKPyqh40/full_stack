import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Toggleable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
      console.log(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setDisappearingNotification = (message, type) => {
    setNotification({ message: message, type: type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setDisappearingNotification(`Login ${user.name} succesful`, 'succes')
    } catch (exception) {
      setDisappearingNotification(`Wrong credentials, ${exception}`, 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setDisappearingNotification('Logout succesful', 'succes')
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
    } catch (exception) {
      setDisappearingNotification(`Failled creation, ${exception}`, 'error')
    }
  }

  const likeBlog = async (blog) => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    try {
      const returnedBlog = await blogService.update(blog.id, newBlog)
      console.log(returnedBlog, newBlog)
      setBlogs(
        blogs.filter((p) => p.id !== returnedBlog.id).concat(returnedBlog)
      )
    } catch (exception) {
      setDisappearingNotification(
        `Failled like, ${exception}, ${exception.response.data.error}`,
        'error'
      )
    }
  }

  const deleteBlog = async (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (!confirm) {
      return
    }
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((p) => p.id !== blog.id)) // TODO
    } catch (exception) {
      setDisappearingNotification(
        `Failled delete, ${exception}, ${exception.response.data.error}`,
        'error'
      )
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="Add blog">
        <NewBlogForm createBlog={addBlog} />
      </Togglable>

      <h3>list</h3>
      {blogs
        .sort((a, b) => {
          if (a.likes < b.likes) {
            return 1
          } else if (a.likes > b.likes) {
            return -1
          } else {
            return 0
          }
        })
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={() => likeBlog(blog)}
            deleteBlog={() => deleteBlog(blog)}
          />
        ))}
    </div>
  )
}

export default App
