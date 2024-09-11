const express = require('express');
const { igdl, ttdl, fbdown, twitter, youtube } = require('btch-downloader');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/ig', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).send('URL is required');
        const data = await igdl(url);
        const videoUrl = data.url || null;
        if (!videoUrl) return res.status(404).send('Video URL not found');
        res.json({ videoUrl });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/tt', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).send('URL is required');
        const data = await ttdl(url);
        const videoUrl = data.video ? data.video[0] : null;
        if (!videoUrl) return res.status(404).send('Video URL not found');
        res.json({ videoUrl });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/fb', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).send('URL is required');
        const data = await fbdown(url);
        const videoUrl = data.HD || data.Normal_video;
        if (!videoUrl) return res.status(404).send('Video URL not found');
        res.json({ videoUrl });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/x', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).send('URL is required');
        const data = await twitter(url);
        const videoUrl = data.hd || data.sd;
        if (!videoUrl) return res.status(404).send('Video URL not found');
        res.json({ videoUrl });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/yt', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).send('URL is required');
        const data = await youtube(url);
        const mp4Url = data.mp4 || null;
        if (!mp4Url) return res.status(404).send('MP4 URL not found');
        res.json({ 'data.mp4': mp4Url });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
});