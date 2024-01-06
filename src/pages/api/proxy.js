// pages/api/proxy.js
export default async function handler(req, res) {
    const url = "http://api.fournierfamily.ovh/user/connect"; // L'URL de votre API externe

    const apiRes = await fetch(url, {
        method: req.method,
        headers: {
            ...req.headers,
            "Content-Type": "application/json",
        },
        body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });

    const data = await apiRes.json();

    res.status(apiRes.status).json(data);
}
