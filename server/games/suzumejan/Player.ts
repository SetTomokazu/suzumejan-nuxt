import { GameAccount } from '@/server/account/game-account'
import { Card } from './typings/type'

/**
 * すずめ雀プレイヤー
 */
export class Player extends GameAccount {
  protected hands: Card[]
  protected discards: Card[]
  protected totalScore: number
  protected hasDone = false

  public get isAuto(): boolean {
    return false
  }

  constructor(account: GameAccount) {
    super(account.Id, account.Name)
    this.totalScore = 0
    this.hands = []
    this.discards = []
  }

  public reset(): void {
    this.hands = []
    this.discards = []
    this.hasDone = false
  }

  public draw(card: Card): void {
    this.hands.push(card)
  }
}
