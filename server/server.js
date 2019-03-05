import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import moment from 'moment';
import config from './config';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
const port = config.port || 3000;

let users = [];
let sockets = {};

app.get('/', (req, res) => {
    res.send('Home');
})
app.get('api/test', (req, res) => {

});
// app.listen(config.port, () => {
//     console.log('Server started');
// });

const validName = (name) => {
    const regex = /^\w*$/;
    return regex.exec(name) !== null;
};

const findUser = (arr, id) => {
    const foundUsers = arr.map(user => {
        if (user.id === id) { return user; }
    });

    return foundUsers[0];
};

const sanitizeString = (message) => {
    return message.replace(/(<([^>]+)>)/ig,'').substring(0, 35);
};

io.on('connection', (socket) => {
    const name = socket.handshake.query.name;
    const currentUser = {
        id: socket.id,
        name: name,
    };

    if (users.find(u => u.id === id)) {
        console.log(`[INFO] User with this ID(${currentUser.id}) is already connected, kicking!`);
        socket.disconnect();
    } else if (!validName(currentUser.name)) {
        socket.disconnect();
    } else {
        console.log(`[INFO] User ${currentUser.name}(${currentUser.id}) connected.`);
        sockets[currentUser.id] = socket;
        // TODO: Find solution & fix this error.
        users = [...users, currentUser];
        io.emit('userConnected', {name: currentUser.name});

        console.log(`[INFO] Total users: ${users.length}`);
    }

    socket.on('marko', () => {
        socket.emit('polo');
    });

    socket.on('login', (username) => {
        console.log(username);
    });

    socket.on('disconnect', () => {
        if (users.find(u => u.id === currentUser.id)) {
            users.splice(users.findIndex(u => u.id === currentUser.id), 1);
        }
        console.log(`[INFO] User ${currentUser.name}(${currentUser.id}) disconnected.`);

        socket.broadcast.emit('userDisconnected', {
            name: currentUser.name,
        });
    })

    socket.on('userSentMessage', (data) => {
        const name = sanitizeString(data.name);
        const message = sanitizeString(data.message);

        const date = moment();
        const time = date.format('YYYY-MM-DD HH:mm:ss');

        console.log(`[CHAT] [${time}] ${name}: ${message}`);

        socket.broadcast.emit('serverGotMessage', {name, message});
    });
})


server.listen(port, () => {
    console.log(`[INFO] Listening on *:${port}`);
});