'use strict';

require('dotenv').config();

var subscribeToRecruitment = require('./lib/subscribeToRecruitment');

module.exports.subscribeToRecruitment = (event, context, callback) => {

  subscribeToRecruitment(JSON.parse(event.body)).then(function (result) {

    const response = {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: result }),
    };

    callback(null, response);

  }, function (err) {

    const response = {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: err.message }),
    };

    callback(null, response);

  });

};
