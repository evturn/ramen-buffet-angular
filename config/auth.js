module.exports = {

  'twitterAuth' : {
    'consumerKey'       : process.env.TWITTER_KEY,
    'consumerSecret'    : process.env.TWITTER_SECRET,
    'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
  },
    'facebookAuth' : {
    'clientID'      : process.env.FACEBOOK_ID,
    'clientSecret'  : process.env.FACEBOOK_SECRET,
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
  }

};