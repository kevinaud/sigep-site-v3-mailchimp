'use strict';

require('dotenv').config();

var subscribeToRecruitment = require('./lib/subscribeToRecruitment');
var subscribeToAlumni      = require('./lib/subscribeToAlumni');

module.exports.subscribeToRecruitment = (event, context, callback) => {

  subscribeToRecruitment(JSON.parse(event.body)).then(function (result) {

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify({ success: true, message: result }),
    };

    callback(null, response);

  }, function (err) {

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify({ success: false, message: err.message }),
    };

    callback(null, response);

  });

};

module.exports.subscribeToAlumni = (event, context, callback) => {

  subscribeToAlumni(JSON.parse(event.body)).then(function (result) {

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify({ success: true, message: result }),
    };

    callback(null, response);

  }, function (err) {

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify({ success: false, message: err.message }),
    };

    callback(null, response);

  });

};
