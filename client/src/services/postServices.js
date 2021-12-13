import axios from "axios"

function createPost(body) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: '/posts',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: body
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            if (!err.response) {
                return reject({ message: "No internet connection" })
            }

            reject(err ?.response ?.data)
        });
    })
}

function updatePost(id, body) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'PATCH',
            url: `/posts/${id}`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: body
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            if (!err.response) {
                return reject({ message: "No internet connection" })
            }

            reject(err ?.response ?.data)
        });
    })
}

function deletePost(id) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            url: `/posts/${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            if (!err.response) {
                return reject({ message: "No internet connection" })
            }

            reject(err ?.response ?.data)
            console.log(err)
        });
    })
}

function likePost(id) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'PATCH',
            url: `/posts/${id}/likePost`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            if (!err.response) {
                return reject({ message: "No internet connection" })
            }

            reject(err ?.response ?.data)
            console.log(err)
        });
    })
}

export { createPost, updatePost, deletePost, likePost }