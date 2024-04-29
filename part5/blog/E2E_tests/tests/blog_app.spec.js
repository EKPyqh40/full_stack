const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginUser, createBlog, user, blog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', { data: user })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
  })
  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginUser(page, user)
      const succesDiv = page.locator('.succes')
      await expect(succesDiv).toContainText(`Login ${user.name} succesful`)
      await expect(succesDiv).toHaveCSS('border-style', 'solid')
      await expect(succesDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      await expect(page.getByText('logout')).toBeVisible()
    })
    test('error with incorrect credentials', async ({ page }) => {
      await loginUser(page, { ...user, password: 'wrong' })
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText(/wrong credentials*/i)
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginUser(page, user)
      await createBlog(page, blog)
    })
    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText(blog.title)).toBeVisible()
    })
    test('a blog can be edited (liked)', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0 like')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1 like')).toBeVisible()
    })
    test('a blog can be deleted by the user', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', (dialog) => dialog.accept())
      await expect(page.locator('html')).toContainText('remove')
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText(blog.title)).not.toBeVisible()
    })
  })
  test('cannot delete someone else his post', async ({ page, request }) => {
    await loginUser(page, user)
    await createBlog(page, blog)
    await page.getByRole('button', { name: 'logout' }).click()

    const otherUser = { ...user, username: 'otherUser' }
    await request.post('/api/users', { data: otherUser })
    await loginUser(page, otherUser)
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.locator('html')).not.toContainText('remove')
  })

  test.only('blog change order depending on likes', async ({ page }) => {
    // kinda works, pretty shitty though
    await loginUser(page, user)
    await createBlog(page, blog)
    await page.getByRole('button', { name: 'cancel' }).click()
    await createBlog(page, { ...blog, title: 'a second blog' })
    await page
      .locator('div')
      .filter({ hasText: /^a second blog test blog author view$/ })
      .getByRole('button')
      .click()
    await expect(page.locator('.blog').first()).not.toContainText(
      'a second blog'
    )
    await page.getByRole('button', { name: 'like' }).click()

    await expect(page.locator('.blog').first()).toContainText('a second blog')

    await page.waitForTimeout(3000)
  })
})
