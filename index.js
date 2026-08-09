import express from "express";

const server = express();

// default Request handler
server.get('/', (req, res) => {
    res.send("Welcome to our E-commerce Website");
});

export default server;