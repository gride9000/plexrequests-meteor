Meteor.methods({
  getLogs: function (start, limit) {
    check(start, Number);
    check(limit, Number);

    var options = {
      limit: limit,
      start: start,
      order: 'desc',
      fields: ['message', 'level', 'timestamp']
    };

    function query (start, limit, callback) {
      logger.query(options, function (error, results) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      })
    }

    var wrapperLogQuery = Async.wrap(query);

    return wrapperLogQuery(0, 10);
  }
});
