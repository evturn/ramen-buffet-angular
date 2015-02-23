module.exports = {

  'twitterAuth' : {
    'consumerKey'       : process.env.TWITTER_KEY,
    'consumerSecret'    : process.env.TWITTER_SECRET,
    'callbackURL'       : 'http://127.0.0.1:8080/auth/twitter/callback'
  }

};