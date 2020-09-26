import { GameAccount } from '../../account/game-account'

export class BaseTurnController<T extends GameAccount> {
  protected accounts: T[] = []
  protected order: { [index: number]: T } = {}
  protected round = 0
  protected turnCount = 0
  protected offset = 0

  /** 参加者初期化 */
  public init(accounts: T[]): void {
    this.accounts = accounts
    this.shuffle()
  }

  /** 順番シャッフル */
  public shuffle(): void {
    for (let i = this.accounts.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1))
      const tmp = this.accounts[i]
      this.accounts[i] = this.accounts[r]
      this.accounts[r] = tmp
    }
  }

  /** 現在のプレイヤーを取得する */
  public get CurrentPlayer(): T {
    return this.accounts[(this.turnCount + this.offset) % this.accounts.length]
  }

  /** 次のターンへ進む */
  public step(): void {
    this.turnCount++
  }

  /** 次のゲームへ進む */
  public nextGame(): void {
    this.turnCount = 0
    this.offset++
    this.round++
  }

  public get Round(): number {
    return this.round
  }

  /** ゲーム開始時にメンバーの順番を取得する */
  public get Order(): { [index: number]: T } {
    const order: { [index: number]: T } = {}
    this.accounts.forEach((value, index) => {
      order[index] = value
    })
    return order
  }
}
