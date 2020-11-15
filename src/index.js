// Load configuration
const config = require('config');

// Load modules
const express = require('express');
const logger = require('./logger');
var os = require('os');

// Start server
var app = express();

// Listen server
app.use('*', (req, res) => {
  try {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>Hello world!</h1>`);
    res.write(`<br>`);
    res.write(`<h3>I'm Shunter whoami's container</h3>`);
    res.write(`<br>`);
    res.write(`<h3>Domain: <span style="color: gray;">${req.headers.host}</span></h3>`);
    res.write(`<h3>Container ID: <span style="color: gray;">${os.hostname()}</span></h3>`);
    res.write(`<h3>Container IP: <span style="color: gray;">${req.connection.localAddress}</span></h3>`);
    res.write(`<h3>Container port: <span style="color: gray;">${req.connection.localPort}</span></h3>`);
    res.write(`<br>`);
    res.write(`<h3>Request IP: <span style="color: gray;">${req.connection.remoteAddress}</span></h3>`);
    res.write(`<h3>Request port: <span style="color: gray;">${req.connection.remotePort}</span></h3>`);
    res.write(`<br>`);
    res.write(`<h3>Forwarded IP: <span style="color: gray;">${req.headers['x-forwarded-for'] || "seem you aren't forwarded"}</span></h3>`);
    res.end();
  } catch (err) {
    logger.error(err);  
  }
})

const server = app.listen(config.get('server.port'), config.get('server.host'));
server.on('listening', () => {
  logger.info('Server started on http://%s:%d', config.get('server.host'), config.get('server.port'));
});

// Catch process events
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception: ', err);
});
process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise ', p, reason);
});