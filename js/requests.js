import axios from "axios";

export const pythonAPI = "https://devcuppythonapi-1-u1261875.deta.app"

export const extractContent = (url, fn) => {
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

export const generateQuestions = (url, fn) => {
    const options = {
        url: `${pythonAPI}/questions`,
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

export const myTestFunc = (url, fn) => {
    const options = {
        url: `${pythonAPI}/questions`,
        method: 'PUT',
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