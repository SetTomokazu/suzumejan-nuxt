import socketIO from 'socket.io'

export interface Action {
  name: string
  func: (socket: socketIO.Socket, ...args: unknown[]) => void
}

export interface Game {
  dir: string
  actions: Action[]
}
