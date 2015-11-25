var _ = require('underscore'),
    client = require('./lib/client'),
    formatter = require('./lib/formatter');

module.exports = _.extend({}, client, { formatter: formatter });
