'use strict';

var co = require('co'),
    rp = require('request-promise');

var username = process.env.MAILCHIMP_USERNAME;
var apiKey = process.env.MAILCHIMP_API_KEY;
var apiUri = process.env.MAILCHIMP_API_URI;

module.exports = co.wrap(function* (subscriber) {

  var options = {
    method: 'POST',
    uri: apiUri + '/lists/67524d5b75/members',
    headers: {
      'Authorization': 'Basic ' + new Buffer(username + ':' + apiKey, 'utf-8').toString('base64')
    },
    body: {
      email_address: subscriber.email,
      merge_fields: {
        'FNAME': subscriber.firstName,
        'LNAME': subscriber.lastName,
        'CLASS': subscriber.class,
        'MAJOR': subscriber.major
      },
      status: 'subscribed'
    },
    json: true // Automatically stringifies the body to JSON
  };

  var requestPromise = rp(options)
    .then(function (parsedBody) {
      return parsedBody;
    })
    .catch(function (err) {
      if(err.hasOwnProperty('error') && err.error.title === 'Member Exists') {
        throw new Error('You are already subscribed');
      } else {
        throw new Error('An unexpected error occurred')
      }
    });

  try {
    var result = yield requestPromise;
    
    return "You have been added to the recruitment mailing list!";
  }
  catch(err) {
    throw(err);
  }

})