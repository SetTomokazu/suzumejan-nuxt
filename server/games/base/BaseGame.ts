import socketIO from 'socket.io'
import { GameAccount } from '../../account/game-account'
import { BaseGameRoom } from './BaseGameRoom'

export interface IBaseGame {
  nsp: string
  registerSocketIO(socket: socketIO.Server): void
}

/**
 * ゲーム実装の基底クラス
 */
export abstract class BaseGame<T extends BaseGameRoom<GameAccount>>
  implements IBaseGame {
  /** ゲームのNamespace */
  protected abstract myNamespace: string
  protected gameRooms: { [index: string]: T } = {}
  public abstract nsp: string

  /** とりあえず登録用 */
  protected server: socketIO.Server

  /** コンストラクタ */
  constructor(io: socketIO.Server) {
    this.server = io
  }

  public registerSocketIO(io: socketIO.Server): void {
    this.register(io)
  }

  /** ゲーム用メソッド登録 */
  protected abstract register(io: socketIO.Server): void
}
