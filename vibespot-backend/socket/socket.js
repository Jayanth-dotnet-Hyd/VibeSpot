import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
    console.log("Initializing Socket.IO...");

    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Socket Connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Socket Disconnected:", socket.id);
        });
    });
};

export const getIO = () => io;