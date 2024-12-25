import {io} from 'socket.io-client'

export const socketInit = () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 100000,
        transports : ['websocket']
    };
    return io(import.meta.env.VITE_API_URL);
}
