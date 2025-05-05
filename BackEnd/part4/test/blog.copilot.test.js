const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const Blog = require('../model/blog');
const {test, describe,beforeEach,after} = require('node:test')


const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    const initialBlogs = [
        { title: 'First Blog', author: 'Author 1', url: 'http://example.com/1', likes: 5 },
        { title: 'Second Blog', author: 'Author 2', url: 'http://example.com/2', likes: 10 },
    ];
    await Blog.insertMany(initialBlogs);
    console.log('Test data created in copilot test');
});

describe('GET /api/blogs', () => {
    test('blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2);
    });

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs');
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined();
        });
    });
});

describe('POST /api/blogs', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'New Blog',
            author: 'Author 3',
            url: 'http://example.com/3',
            likes: 15,
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await Blog.find({});
        expect(blogsAtEnd).toHaveLength(3);

        const titles = blogsAtEnd.map((b) => b.title);
        expect(titles).toContain('New Blog');
    });

    test('if likes property is missing, it defaults to 0', async () => {
        const newBlog = {
            title: 'Blog Without Likes',
            author: 'Author 4',
            url: 'http://example.com/4',
        };

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        expect(response.body.likes).toBe(0);
    });

    test('blog without title and url is not added', async () => {
        const newBlog = {
            author: 'Author 5',
            likes: 5,
        };

        await api.post('/api/blogs').send(newBlog).expect(400);

        const blogsAtEnd = await Blog.find({});
        expect(blogsAtEnd).toHaveLength(2);
    });
});

after(async () => {
    await mongoose.connection.close();
});