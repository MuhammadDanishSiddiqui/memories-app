import axios from "axios"

function getPosts() {

    return function (dispatch) {
        axios({
            method: 'GET',
            url: '/posts',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(res => {
            dispatch({ type: "GET_POST", payload: res.data })
        }).catch(err => {
            if (!err.response) {
                return console.log("No internet connection")
            }
            console.log(err)

        });
    }


}

export { getPosts }