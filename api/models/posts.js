const path = './data.json';
const fs = require('fs')

class Posts {
    get() {
        // get posts
        return this.readData()
    }

    getIndividualBlog(postId) {
        // get one blog post
        const posts = this.readData();
        const foundPost = posts.find((post) => post.id == postId )
        console.log(foundPost)
        return foundPost
    }

    add(newPost) {
        // add new post
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts)
    }

    readData() {
        // fetch(path).then(response => { JSON.parse(response) })
        let rawdata = fs.readFileSync(path);
        let posts = JSON.parse(rawdata);
        return posts
    }

    storeData(rawdata) {
        let data = JSON.stringify(rawdata)
        fs.writeFileSync(path, data)
    }
}

module.exports = Posts