const { test, after, beforeEach, describe } = require('node:test');
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const helper = require('./test_helper.js');

const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('the first blog is about react patterns', async () => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map((e) => e.title);
  assert(contents.includes('React patterns'));
});

test('Valid POST request test ', async () => {
  const newBlog = {
    title: '<3',
    author: 'Christophe Vakaet',
    url: 'https://vakaet.be/',
    likes: 99,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  const contents = blogsAtEnd.map((n) => n.title);

  assert(contents.includes('<3'));
});

test('Check id is set', async () => {
  const response = await api.get('/api/blogs');
  assert(Object.keys(response.body[0]).includes('id'));
});

test('Autocomplete likes', async () => {
  const newBlog = {
    title: '<3',
    author: 'Christophe Vakaet',
    url: 'https://vakaet.be/',
  };

  const returnedObject = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/); // not strictly necessary
  assert(returnedObject.body.likes === 0);
});

test('Title required for POST', async () => {
  const newBlog = {
    author: 'Christophe Vakaet',
    url: 'https://vakaet.be/',
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/); // not strictly necessary
});

test('Url required for POST', async () => {
  const newBlog = {
    title: '<3',
    author: 'Christophe Vakaet',
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/); // not strictly necessary
});

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.deepStrictEqual(resultBlog.body, blogToView);
  });

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    assert(!titles.includes(blogToDelete.title));
  });
});

describe('update of a blog', () => {
  test('Add 1 like to blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const newBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    console.log(blogToUpdate, newBlog);
    resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/); // not strictly necessary

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

    assert.strictEqual(blogToUpdate.likes + 1, resultBlog.body.likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
