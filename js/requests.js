import axios from "axios";

const pythonAPI = "https://devcuppythonapi-1-u1261875.deta.app"

export const extract = (url, fn) => {
    const options = {
        url: `${pythonAPI}/extract`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            url
        }
    };
    axios(options)
        .then(res => {
            fn(res.data, null)
        })
        .catch(err => {
            fn(null, err.message)
        })
}
