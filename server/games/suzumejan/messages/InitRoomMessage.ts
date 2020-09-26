import { BaseMessage } from '../../base/BaseMessage'
import { Player } from '../Player'

export const InitRoomEvent = 'InitRoom'

export interface InitRoomMessage extends BaseMessage {
  members: { [index: number]: Player }
}
