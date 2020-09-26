import socketIO from 'socket.io'
import { Suzumejan } from './suzumejan'
import { IBaseGame } from './base/BaseGame'

export class Games {
  private list: IBaseGame[] = []
  constructor(io: socketIO.Server) {
    this.list.push(new Suzumejan(io))
  }

  public register(socket: SocketIO.Server): void {
    this.list.forEach((game) => {
      game.registerSocketIO(socket)
    })
  }
}
