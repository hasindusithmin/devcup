const fetch = require('node-fetch');

export default async function handler(req, res) {
    const { id } = req.query;
    const url = `${process.env.NEXT_PUBLIC_APP_SERVICE}/endpoint/codeHander?method=GET`
    try {
        const response = await fetch(url);
        if (!response.ok) throw Error("data not available at this moment");

        let { codes } = await response.json();
        res.status(200).json(codes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
