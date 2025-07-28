const express = require('express');
const Url = require('../model/url');

exports.getShortUrl = async (req, res) => {
  try {
    const { shortUrl } =  req.params ;
    if (!shortUrl) {
      return res.status(400).json({ error: 'shortUrl is required' });
    }

    const foundUrl = await Url.findOne({ shortUrl });
    if (!foundUrl) {
      return res.status(404).json({ error: 'URL not found' });
    }
    return res.status(200).json({ message: 'URL found', data: foundUrl });
  } catch (error) {
    console.error('Error finding URL:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};