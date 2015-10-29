var Agenda = require('agenda');


var agenda = new Agenda(connectionOpts);


var jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];

jobTypes.forEach(function(type) {
  require('./lib/jobs/' + type)(agenda);
})

if(jobTypes.length) {
  agenda.start();
}

module.exports = agenda;