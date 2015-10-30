'use strict';

var Agenda = require('agenda');

module.exports = function() {
  var agenda = new Agenda({db: { address: 'localhost:27017/cohort-dev', collection: 'agendaJobs' }});

  require('./email.server.job')(agenda);

  agenda.on('ready', function() {
    /* [format]
     * (1) seconds - 0~59
     * (2) minutes - 0~59
     * (3) hours - 0~59
     * (4) date - 1~31
     * (5) months - 0~11
     * (6) day - 0(Sunday)~5(Friday)
    */ 

    // Runs every weekday Monday at 09:00:00 AM
    agenda.every('0 0 9 * * 1', 'sending fitness weekly report');

    // Runs every month 1st at 09:00:00 AM
    agenda.every('0 0 9 1 * *', 'sending fitness monthly report');

    agenda.start();
  });

};