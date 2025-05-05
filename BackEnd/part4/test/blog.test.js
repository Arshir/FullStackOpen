const app = require('../app')
const mongoose = require('mongoose')
const config = require('../utils/config')
const supertest = require('supertest')
const api = supertest(app)
const {beforeEach,after,describe,test,it}= require('node:test')
const assert=require('assert')
const Blog= require('../model/blog')
const { title } = require('process')

describe('blog testing', () => {
    const testData=[
        {title: 'Indexing', author: 'Fmohammed', url: 'indexingurl.com', likes: 10},
        {title: 'Sorting', author: 'Arshir', url: 'sortingurl.com', likes: 20},
        {title: 'Searching', author: 'Ali', url: 'searchingurl.com', likes: 30},
        {title: 'Recursion', author: 'Ali', url: 'recursionurl.com', likes: 40},
        {title: 'Dynamic Programming', author: 'Ali', url: 'dynamicurl.com', likes: 50},
        {title: 'Greedy Algorithms', author: 'Ali', url: 'greedyurl.com', likes: 60},
       ]    
   
       beforeEach(async()=>{
       await Blog.deleteMany({})
  
       await Blog.insertMany(testData)
       
    })

        test('all six blogs are returned', async()=>{
                const res= await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
                console.log(res.body)    
                assert.strictEqual(res.body.length,6)   
        })

        test('unique identifier property of the blog posts is named id', async()=>{
            const res= await api.get('/api/blogs')
            res.body.forEach((blog)=>{
                assert.ok(blog.id)
                assert(blog.hasOwnProperty('id'))
            })
        })

        test('making an HTTP POST request to the /api/blogs URL successfully creates a new blog post',async()=>{
        
            const newBlog=  {title: 'Design Patterns', author: 'Fmohammed', url: 'designpatterns.com', likes: 35}
            const res= await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type',/application\/json/)  
            
            const addedBlog={title: res.body.title, author: res.body.author, url: res.body.url, likes: res.body.likes}   
        
            assert.deepStrictEqual(addedBlog,newBlog)

            const blogs = await api.get('/api/blogs')

            assert.equal(blogs.body.length,testData.length+1)
            const titles = blogs.body.map((b) => b.title)
            assert(titles.includes('Design Patterns'))

        })


        test('verifies that if the likes property is missing from the request, it will default to the value 0',async()=>{
        
            let newBlog=  {title: 'Pointers', author: 'Fmohammed', url: 'pointers.com'}            
        
            const res= await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type',/application\/json/)  
            
            const addedBlog={title: res.body.title, author: res.body.author, url: res.body.url, likes: res.body.likes}   

            assert.equal(addedBlog.likes,0)

            const blogs = await api.get('/api/blogs')    
            assert.equal(blogs.body.length,testData.length+1)
            const titles = blogs.body.map((b) => b.title)
            assert(titles.includes('Pointers')) 

        })

        it('verify that if the title or url properties are missing  the backend responds to the request with the status code 400 Bad Request.',async()=>{
        
            let newBlog=  { author: 'Fmohammed'}
                   
            const res= await api.post('/api/blogs').send(newBlog).expect(400).expect('Content-Type',/application\/json/)  
            
            const blogs = await api.get('/api/blogs')    
            assert.equal(blogs.body.length,testData.length)
        
        })

})



describe('closing database connection',()=>{
    after(async()=>{
        await mongoose.connection.close()
    })
})