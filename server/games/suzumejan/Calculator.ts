import { Score } from './Score'

import {
  SuperRed,
  AllGreen,
  Tinnyao,
  Dora,
  Red,
  Korts,
  Tannyao,
  Chanta,
  Shunts,
} from './const/ScoreDetail'
import { Card, Ments } from './typings/type'

// 点数取得
export class Calculator {
  private dora: Card | null = null
  public setDora(dora: Card): void {
    this.dora = dora
  }

  public calculate(hands: Card[]): Score {
    const score = new Score()
    const cards = hands.concat()
    cards.sort((a, b) => a.data - b.data)

    // メンツができてなければ終わり
    const ments = this.isTempai(cards)

    if (ments.length < 2) {
      return score
    }
    // スーパーレッド判定
    if (this.isSuperRed(cards)) {
      score.add(SuperRed)
      return score
    }
    // オールグリーン判定
    if (this.isAllGreen(cards)) {
      score.add(AllGreen)
      return score
    }
    // チンヤオ判定
    if (this.isTinnyao(cards)) {
      score.add(Tinnyao)
      return score
    }

    // 表示ドラ加算
    cards.filter((x) => x.data === this.dora?.data).map(() => score.add(Dora))

    // 赤ドラ加算
    cards.filter((x) => x.dora).map(() => score.add(Red))

    // 暗刻
    ments.filter((m) => m.isKorts).map(() => score.add(Korts))
    // 順子
    ments.filter((m) => !m.isKorts).map(() => score.add(Shunts))
    if (ments.every((m) => m.isChanta)) {
      score.add(Chanta)
    } else if (ments.every((m) => !m.isChanta)) {
      score.add(Tannyao)
    }
    return score
  }

  private isTempai(cards: Card[]): Ments[] {
    const ments: Ments[] = []
    const used = cards.concat()
    // ソート
    used.sort((a, b) => a.data - b.data)

    // 暗刻除去
    Array.from(Array(11), (_v, k) => k + 1).forEach((i) => {
      if (used.filter((x) => x.data === i).length >= 3) {
        const first = used.findIndex((x) => x.data === i)
        ments.push({
          cards: used.splice(first, 3),
          isKorts: true,
          isChanta: i === 1 || i >= 9,
        })
      }
    })
    // 順子除去
    Array.from(Array(7), (_v, k) => k + 1).forEach((i) => {
      ;[...Array(2)].map(() => {
        if (
          used.some((x) => x.data === i) &&
          used.some((x) => x.data === i + 1) &&
          used.some((x) => x.data === i + 2)
        ) {
          const m: Ments = {
            cards: [],
            isKorts: false,
            isChanta: i === 1 || i === 7,
          }

          m.cards.concat(
            used.splice(
              used.findIndex((x) => x.data === i),
              1
            )
          )
          m.cards.concat(
            used.splice(
              used.findIndex((x) => x.data === i + 1),
              1
            )
          )
          m.cards.concat(
            used.splice(
              used.findIndex((x) => x.data === i + 2),
              1
            )
          )
          ments.push(m)
        }
      })
    })
    return ments
  }

  private isSuperRed(cards: Card[]): boolean {
    return cards.every((x) => x.dora)
  }

  private isAllGreen(cards: Card[]): boolean {
    const allGreen: number[] = [2, 3, 4, 6, 8, 10]
    return cards.every((x) => !x.dora && allGreen.includes(x.data))
  }

  private isTinnyao(cards: Card[]): boolean {
    return cards.every((x) => x.data === 1 || x.data >= 9)
  }
}
