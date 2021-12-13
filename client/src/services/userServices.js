import axios from "axios"

function signupUser(body) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: '/user/signup',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(body)
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

function logoutUser() {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: '/user/logout',
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


export { signupUser, logoutUser }