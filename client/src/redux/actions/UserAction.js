import axios from "axios"

function loginUser (body)
{

    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: '/user/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(body)
          }).then(res=>{
              resolve(res.data)
          }).catch(err=>
            {
                if(!err.response)
                {
                    return reject({message:"No internet connection"})
                }

             reject(err?.response?.data)
          });
    })
}

export {loginUser}