// class Server {
//     constructor(app, io) {
//         this.app = app;
//         this.io = io;
//     }

//     async start() {
//         this.app.get('/', (req, res) => {
//             res.send('Home');
//         });

//         this.app.listen(config.port, () => {
//             console.log('Server started');
//         });

//         this.io.on('connection', (socket) => {
//             console.log(`User login, id: ${socket.id}`);
//             socket.on('disconnect', () => {
//                 console.log(`User with id: ${socket.id} logout`);
//             })
//         });
    
//     }
// }


// const socket = new Server(app, io);