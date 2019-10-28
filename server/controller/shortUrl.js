const shortid = require('shortid');
const ShortLink = require('../models/ShortenLink');
const request = require('request');
const path = require('path');
const url = require('url');
const ShortenLink = {
  async shortenUrl(req, res, next) {
    try {
      let newUrl = []
      let response = [...res.locals]

      response.forEach(item => {

        const awsUrl = item.awsUrl;
        const fileName = item.originalName;
        const shortUrlParam = shortid.generate();
        const createShortUrl = new ShortLink({
          awsUrl,
          shortUrlParam,
          fileName,
          // shortUrl: `https://x-shareserver.herokuapp.com/${shortUrlParam}`
          shortUrl: `http://xshare.ga/${shortUrlParam}`
          //shortUrl: `http://localhost:4000/${shortUrlParam}`
        });
        createShortUrl.save();

        let url = {
          message: 'Link shortened successfully',
          shortCode: shortUrlParam,
          shortUrl: createShortUrl.shortUrl,
          longUrl: awsUrl
        }

        newUrl.push(url)
      })

      res.json({
        success: true,
        data: newUrl
      });

    } catch (error) {
      res.json({
        success: true,
        message: error.message
      });
    }
  },
  async redirectShortenUrl(req, res) {
    try {
      const {
        cloudinaryUrl
      } = res.locals;

      res.redirect(cloudinaryUrl);
    } catch (error) {
      res.json({
        success: true,
        message: error.message
      });
    }
  },
  async downloadShortenUrl(req, res) {
    try {
      const {
        cloudinaryUrl,
        fileName
      } = res.locals;
      let file = fileName;
      res.setHeader('Content-Disposition', `attachment; filename=${file}`);
      request(cloudinaryUrl)
        .once('data', data => {
          console.log(data);
        })
        .on('error', err => {
          console.log(err);
        })
        .pipe(res);
    } catch (error) {
      res.json({
        success: true,
        message: error.message
      });
    }
  }
};

module.exports = ShortenLink;