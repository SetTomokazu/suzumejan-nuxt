import { GameAccount } from '../../account/game-account'
import { BaseTurnController } from './BaseTurnController'

/**
 * ゲーム実装の基底クラス
 */
export abstract class BaseGameRoom<T extends GameAccount> {
  /** 部屋へ参加しているアカウント達 */
  private members: T[] = []
  /** ルームのホスト */
  private owner: T

  /** ターンコントローラ */
  protected turnController: BaseTurnController<T> = new BaseTurnController<T>()

  /** 読み取り専用Members */
  public get Members(): T[] {
    return this.members
  }

  /** コンストラクタ */
  constructor(owner: T) {
    this.owner = owner
    this.members.push(owner)
  }
}
