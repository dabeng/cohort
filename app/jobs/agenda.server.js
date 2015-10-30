'use strict';

var Agenda = require('agenda');

module.exports = function() {		
  var agenda = new Agenda({db: { address: 'localhost:27017/cohort-dev', collection: 'agendaJobs' }});

  require('./email.server.job')(agenda);

  agenda.on('ready', function() {
    agenda.every('10 seconds', 'sending fitness report to user');
    agenda.start();
  });
};