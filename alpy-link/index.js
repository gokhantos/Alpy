const http = require('http');
const url = require('url');
const {Server} = require('ws');
const sessionTypes = {
    "/scratch/ble": require('./bleSession'),
    "/scratch/bt": require('./btSession')
};

// Port used by Scratch-Link
//https://github.com/LLK/scratch-link
const PORT = 20110;

const httpServer = http.createServer().listen(PORT, "127.0.0.1", () => {
    console.log("Socket server created at: ", `http://127.0.0.1:${PORT}`);
})

const socketServer = new Server({server: httpServer});

async function webSocketHandler(websocket, path){
    
}
socketServer.on('connection', (socket, request) => {
    var Session = sessionTypes[path]
    let session;
    if(Session){
        session = new Session(socket);
    }else{
        return socket.close();
    }
})