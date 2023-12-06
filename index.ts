import { Server } from "./app/server.js";
import express from 'express';
import dotenv from 'dotenv'
dotenv.config()

declare global {
    interface Worker {}

    interface WebSocket {}
  
    namespace WebAssembly {
      interface Module {}
    }
  }

const domain = process.env.DB_HOST
const port = process.env.PORT

const server = new Server();
server.start(domain, port);