const express = require('express');
const Url = require('../model/url');

// // Helper function to validate URLs
// function isValidUrl(url) {
//     try {
//         const parsed = new URL(url);
//         return parsed.protocol === 'http:' || parsed.protocol === 'https:';
//     } catch (e) {
//         return false;
//     }
// }

function normalizeUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
        return 'https://' + url;
    }
    return url;
}

exports.createShortUrl = async (req, res) => {
    try {
        let { originalUrl, shortUrl } = req.body;
        if (!originalUrl) {
            return res.status(400).json({ message: 'Original URL is required' });
        }

        // Check if the URL contains at least one dot
        if (!originalUrl.includes('.')) {
            return res.status(400).json({ message: 'Not a valid url' });
        }

        // Auto-correct missing protocol
        originalUrl = normalizeUrl(originalUrl);

        // // Custom validation for URL format
        // if (!isValidUrl(originalUrl)) {
        //     return res.status(400).json({ message: 'Original URL is not a valid http or https link' });
        // }

        if (shortUrl) {
            const existingUrl = await Url.findOne({ shortUrl });
            if (existingUrl) {
                return res.status(400).json({ message: 'Short URL already exists' });
            }
        }

        // If shortUrl not provided, generate a random one
        let generatedShortUrl = shortUrl;
        if (!generatedShortUrl) {
            generatedShortUrl = Math.random().toString(36).substring(2, 8);
            // Ensure uniqueness
            let exists = await Url.findOne({ shortUrl: generatedShortUrl });
            while (exists) {
                generatedShortUrl = Math.random().toString(36).substring(2, 8);
                exists = await Url.findOne({ shortUrl: generatedShortUrl });
            }
        }

        const newUrl = new Url({ originalUrl, shortUrl: generatedShortUrl });
        await newUrl.save();

        res.status(201).json({
            message: 'Short URL created successfully',
            data: newUrl
        });
    }
    catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json({ message: error.message });
    }
}