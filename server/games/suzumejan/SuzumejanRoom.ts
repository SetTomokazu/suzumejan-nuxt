import { BaseGameRoom } from '../base/BaseGameRoom'
import { Deck } from './Deck'
import { Player } from './Player'
import { Calculator } from './Calculator'
import { InitRoomMessage } from './messages/InitRoomMessage'

export class SuzumejanRoom extends BaseGameRoom<Player> {
  private deck: Deck
  private calculator: Calculator

  constructor(owner: Player) {
    super(owner)
    this.deck = new Deck()
    this.calculator = new Calculator()
  }

  public joinMember(account: Player): void {
    this.Members.push(account)
  }

  /** 順番決めを行う */
  public initRoom(): InitRoomMessage {
    this.turnController.init(this.Members)
    this.turnController.shuffle()
    const order = this.turnController.Order

    const message: InitRoomMessage = {
      roomId: '',
      members: order,
    }
    return message
  }

  /**
   * 初期配牌
   */
  public shuffle(): void {
    this.Members.forEach((m) => m.reset())
    this.deck = new Deck()
    // 初期配牌
    this.Members.forEach((m) => Array(5).forEach(() => m.draw(this.deck.next)))
    this.calculator.setDora(this.deck.next)
  }

  /**
   * プレイヤーへの行動選択開始
   */
  public start2wait(): void {
    // this.members.forEach((m: Player) => {})
  }

  public ready2Draw(): void {
    // this.readyMembersNum++
    // if (this.isReady) {
    //   this.turn++
    //   this.currentPlayer.draw(this.deck.next)
    //   console.log(
    //     this.currentPlayer.name +
    //       'の手牌' +
    //       JSON.stringify(this.currentPlayer.hand)
    //   )
    // }
  }
}
