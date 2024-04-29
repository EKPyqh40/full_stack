// const createNote = async (page, content) => {
//   await page.getByRole('button', { name: 'new note' }).click()
//   await page.getByRole('textbox').fill(content)
//   await page.getByRole('button', { name: 'save' }).click()
//   await page.getByText(content).waitFor()
// }

const user = {
  name: 'Matti Luukkainen',
  username: 'mluukkai',
  password: 'salainen',
}

const blog = {
  title: 'test blog title',
  author: 'test blog author',
  url: 'testblogurl.com',
}

const loginUser = async (page, user) => {
  await page.locator('input[name="Username"]').fill(user.username)
  await page.locator('input[name="Password"]').fill(user.password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'Add blog' }).click()
  await page.locator('#blog-form-url').fill(blog.url)
  await page.locator('#blog-form-title').fill(blog.title)
  await page.locator('#blog-form-author').fill(blog.author)
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginUser, createBlog, user, blog }
