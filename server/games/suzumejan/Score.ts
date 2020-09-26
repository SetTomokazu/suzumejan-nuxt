import { ScoreDetail } from './typings/type'

export class Score {
  public details: ScoreDetail[] = []

  public add(detail: ScoreDetail): void {
    this.details.push(detail)
    this.details.sort((a, b) => a.priority - b.priority)
  }

  /** アガリ可能か */
  public get canRon(): boolean {
    return this.totalScore >= 5
  }

  /** 獲得合計点数取得 */
  public get totalScore(): number {
    let total = 0
    this.details.forEach((d) => (total += d.score))
    return total
  }
}
