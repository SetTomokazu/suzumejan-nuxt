import { BaseMessage } from '../../base/BaseMessage'
import { Player } from '../Player'

export const ActionEvent = 'Action'

export interface ActionMessage extends BaseMessage {
  player: Player
  detail: {
    action: string
    id: string
  }
}
