require('dotenv').config();
const http = require('http');
const app = require('./app.js')
const { PORT } = require('./settings/global.settings');

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log('Server', PORT, 'running...')
})