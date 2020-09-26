import http from 'http'
import express from 'express'
import socketIO from 'socket.io'

import bodyParser from 'body-parser'
import { Games } from './games'
const app = express()
const server = http.createServer(app)

const io: socketIO.Server = socketIO(server, { origins: '*:*' })
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const games = new Games(io)

io.on('connection', (socket) => {
  console.log(`Client ${socket.conn.remoteAddress} connected`)
  socket.on('disconnect', () =>
    console.log(`Client ${socket.conn.remoteAddress} disconnected`)
  )
  // 各ゲームにて使用するsocketイベント登録
  games.register(socket)
})

app.use(bodyParser.json())

module.exports = app
