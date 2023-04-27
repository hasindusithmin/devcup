const fetch = require('node-fetch');

export default async function handler(req, res) {
    const { id } = req.query;
    const url = `${process.env.NEXT_PUBLIC_APP_SERVICE}/endpoint/codeHander?method=GET`
    try {
        const response = await fetch(url);
        if (!response.ok) throw Error("data not available at this moment");

        let { codes } = await response.json();
        codes = codes.reverse()
        const startIndex = (id - 1) * 3;
        const endIndex = startIndex + 3;
        const result = codes.slice(startIndex, endIndex);
        if (result.length === 0) {
            res.status(404).json([]);
        } else {
            res.status(200).json({ total: codes.length, codes: result });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
