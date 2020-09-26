import socketIO from 'socket.io'
import { BaseGame } from '../base/BaseGame'
import { SuzumejanRoom } from './SuzumejanRoom'
import { Player } from './Player'
import { CpuPlayer } from './CpuPlayer'
import {
  StartTrainingEvent,
  StartTrainingMessage,
} from './messages/StartTrainingMessage'
import { InitRoomEvent } from './messages/InitRoomMessage'
import { CpuAccountList } from '~/server/account/cpu-accounts'

export class Suzumejan extends BaseGame<SuzumejanRoom> {
  public nsp: string = 'suzumejan'
  protected myNamespace = 'suzumejan'

  protected register(io: socketIO.Server): void {
    io.of(this.myNamespace).on('connection', (socket) => {
      // TODO: ログイン自体はここで行わないので後で消す
      socket.on('login', (playerName: string) => {
        console.log('login as ' + playerName)
        // ログインに成功したと通知を返す
        // 単発のemitではこの接続のユーザのみ
        // ルームを指定するとそこへの全員になる
        socket.emit('login', { result: 'success', username: playerName })
      })

      // 一人用トレーニング開始処理
      socket.on(StartTrainingEvent, (message: StartTrainingMessage) => {
        const roomId = 'room000'
        const owner = new Player(message.account)
        const room = new SuzumejanRoom(owner)
        room.joinMember(new CpuPlayer(CpuAccountList[0]))
        room.joinMember(new CpuPlayer(CpuAccountList[1]))
        room.joinMember(new CpuPlayer(CpuAccountList[2]))

        this.gameRooms[roomId] = room
        const response = room.initRoom()
        response.roomId = roomId
        socket.join(roomId)
        console.log(JSON.stringify(message.account))

        socket.emit(InitRoomEvent, response)
      })

      // 一人用トレーニング実行中処理
      socket.on('shuffle', (data) => {
        console.log('shuffle : ' + JSON.stringify(data))
        const result = this.gameRooms[data.roomId].shuffle()
        // シャッフル後の描画完了待ち
        this.gameRooms[data.roomId].start2wait()
        io.to(data.roomId).emit('shuffle', result)
      })

      socket.on('ready2Draw', (data) => {
        console.log('ready2Draw : ' + JSON.stringify(data))
        const room = this.gameRooms[data.roomId]
        room.ready2Draw()
      })
    })
  }
}
