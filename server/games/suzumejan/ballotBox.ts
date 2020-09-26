import { Ballot } from './Ballot'
import { GameAccount } from '~/server/account/game-account'

export class BallotBox {
  private ballots: Ballot[] = []
  constructor(accounts: GameAccount[]) {
    this.ballots = accounts.map((a) => new Ballot(a))
  }

  public init(): void {
    this.ballots = []
  }
}
