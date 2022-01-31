const express = require('express')
const fs = require('fs')
const newsRouter = express.Router()
const axios = require('axios')

// const rootAddress='http://localhost/'
const rootAddress='.'

newsRouter.get('', async(req, res) => {
    try {
        // const newsAPI = await axios.get(`${rootAddress}/src/data/data.json`)
        const newsAPI = await JSON.parse(fs.readFileSync(`${rootAddress}/src/data/data.json`, 'utf8'));
        // res.render('news', { articles : newsAPI.data })
        // console.log('newsAPI', newsAPI);
        // console.log('newsAPI', newsAPI.users);
        res.render('data', { articles : newsAPI.users })
    } catch (err) {
        if(err.response) {
            res.render('data', { articles : null })
            console.log('err.response.data', err.response.data)
            console.log('err.response.status', err.response.status)
            console.log('err.response.headers', err.response.headers)
        } else if(err.request) {
            res.render('news', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
    } 
})

newsRouter.get('/:id', async(req, res) => {
    let articleID = req.params.id

    try {
        // const newsAPI = await axios.get(`${rootAddress}/wp-json/wp/v2/posts/${articleID}`)
        const newsAPI = await JSON.parse(fs.readFileSync(`${rootAddress}/src/data/data.json`, 'utf8'));
        res.render('newsSingle', { article : newsAPI.data })
    } catch (err) {
        if(err.response) {
            res.render('newsSingle', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSingle', { article : null })
            console.log(err.requiest)
        } else {
            res.render('newsSingle', { article : null })
            console.error('Error', err.message)
        }
    } 
})


newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        // const newsAPI = await axios.get(`${rootAddress}/wp-json/wp/v2/posts?search=${search}`)
        const newsAPI = await JSON.parse(fs.readFileSync(`${rootAddress}/src/data/data.json`, 'utf8'));
        res.render('newsSearch', { articles : newsAPI.data })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})


module.exports = newsRouter 
