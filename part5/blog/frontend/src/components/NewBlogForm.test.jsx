import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

describe('<NewBlogForm />', () => {
  test('createBlog is triggered correctly', async () => {
    const newBlog = {
      title: 'blog title',
      author: 'blog author',
      url: 'blog url',
    }
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<NewBlogForm createBlog={createBlog} />)

    const formTitle = container.querySelector('#blog-form-title')
    await user.type(formTitle, newBlog.title)

    const formAuthor = container.querySelector('#blog-form-author')
    await user.type(formAuthor, newBlog.author)

    const formUrl = container.querySelector('#blog-form-url')
    await user.type(formUrl, newBlog.url)

    const sendButton = screen.getByText('create')
    await user.click(sendButton)

    expect(createBlog.mock.calls[0][0]).toStrictEqual(newBlog)
  })
})

// test('<NoteForm /> updates parent state and calls onSubmit', async () => {
//   const input = screen.getByRole('textbox')
//   const sendButton = screen.getByText('save')

//   await user.type(input, 'testing a form...')
//   await user.click(sendButton)

//   expect(createNote.mock.calls).toHaveLength(1)
//   expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
// })
