import { GameAccount } from '~/server/account/game-account'

export class Ballot {
  private account: GameAccount
  private action: string
  constructor(account: GameAccount) {
    this.account = account
    this.action = ''
  }

  public vote(vote: string): void {
    this.action = vote
  }

  public get hasVoted(): boolean {
    return this.action !== ''
  }
}
