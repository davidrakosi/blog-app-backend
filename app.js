const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

const multer = require('multer')
const getExt = (mimeType)=>{
    switch(mimeType){
        case 'image/png':
            return '.png';
        case 'image/jpeg':
            return '.jpeg'
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
})
let upload = multer({ storage: storage })

const Post = require('./api/models/posts');
const postsData = new Post();

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
    res.status(200).send('hello world')
})

app.get('/api/posts', (req, res) => {
    res.send(postsData.get())
})

app.get('/api/posts/:post_id', (req, res) => {
    const postId = req.params.post_id
    console.log(postId)
    const foundPost = postsData.getIndividualBlog(postId)
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.status(404).send('Not found')
    }
    res.status(200).send(postsData.getIndividualBlog(postId))
})

app.post('/api/posts', upload.single('post-image'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const newPostData = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path,
        "added_date": `${Date.now()}`
    }
    postsData.add(newPostData)
    res.status(201).send('Success')
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))