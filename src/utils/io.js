import * as IO from 'socket.io-client';
import { API_BASE_URL } from '../config';

export default () => {
  let socket;

  const connect = (jwt, onError) => {
    socket = IO.connect(API_BASE_URL, { query: { jwt } });
    /* socket.on('error', (error) => {
      const [message, status = 500, code = 'INTERNAL_ERROR'] = error.message.split('|');
      onError({ message, status: Number(status), code });
    }); */
  };

  const close = () => {
    if (socket) socket.close();
  };

  const on = (event, handler) => {
    if (socket) socket.on(event, handler);
    else console.warn('Cannot subscribe to socket.io events, because socket is undefined');
  };

  return {
    connect,
    close,
    on
  };
};
