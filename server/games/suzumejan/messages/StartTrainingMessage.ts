import { BaseMessage } from '../../base/BaseMessage'
import { GameAccount } from '~/server/account/game-account'

export const StartTrainingEvent = 'StartTraining'

export interface StartTrainingMessage extends BaseMessage {
  account: GameAccount
}
