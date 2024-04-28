import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockHandler

  const blog = {
    title: 'Test blog',
    author: 'snorry',
    user: { name: 'bob' },
    likes: 0,
    url: 'betty.com',
  }
  beforeEach(() => {
    mockHandler = vi.fn()
    container = render(<Blog blog={blog} likeBlog={mockHandler} />).container
  })

  test('renders summarized content', async () => {
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(blog.title).toHaveTextContent(blog.author)
    expect(div)
      .not.toHaveTextContent(blog.likes)
      .toHaveTextContent(blog.user.name)
      .toHaveTextContent(blog.url)
  })
  test('renders extended content', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')

    expect(div)
      .toHaveTextContent(blog.title)
      .toHaveTextContent(blog.author)
      .toHaveTextContent(blog.likes)
      .toHaveTextContent(blog.user.name)
      .toHaveTextContent(blog.url)
  })
  test('likeBlog is triggered correctly', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
