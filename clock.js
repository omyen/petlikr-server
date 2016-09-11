//require('log-buffer');
var log = require('loglevel');

log.setLevel('debug');



//======================
//set up cron job
var CronJob = require('cron').CronJob;

new CronJob({
  cronTime: "15 * * * * *",//15 seconds after every minute
  onTick: rankUsers,
  start: true,
  timeZone: "America/Los_Angeles"
});