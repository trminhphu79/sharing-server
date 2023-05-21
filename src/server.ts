import dotenv from 'dotenv'
import http from 'http'
import { GLOBAL_SETTING } from './settings'
import app from './app';

dotenv.config();

const server = http.createServer(app);
server.listen(GLOBAL_SETTING.PORT, () => {
  console.log('Server', GLOBAL_SETTING.PORT, 'running...')
})