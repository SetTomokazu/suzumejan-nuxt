import { Card } from './typings/type'

export const DefaultDeck: Card[] = [
  { id: 101, data: 1, dora: false },
  { id: 102, data: 1, dora: false },
  { id: 103, data: 1, dora: false },
  { id: 104, data: 1, dora: true },
  { id: 201, data: 2, dora: false },
  { id: 202, data: 2, dora: false },
  { id: 203, data: 2, dora: false },
  { id: 204, data: 2, dora: true },
  { id: 301, data: 3, dora: false },
  { id: 302, data: 3, dora: false },
  { id: 303, data: 3, dora: false },
  { id: 304, data: 3, dora: true },
  { id: 401, data: 4, dora: false },
  { id: 402, data: 4, dora: false },
  { id: 403, data: 4, dora: false },
  { id: 404, data: 4, dora: true },
  { id: 501, data: 5, dora: false },
  { id: 502, data: 5, dora: false },
  { id: 503, data: 5, dora: false },
  { id: 504, data: 5, dora: true },
  { id: 601, data: 6, dora: false },
  { id: 602, data: 6, dora: false },
  { id: 603, data: 6, dora: false },
  { id: 604, data: 6, dora: true },
  { id: 701, data: 7, dora: false },
  { id: 702, data: 7, dora: false },
  { id: 703, data: 7, dora: false },
  { id: 704, data: 7, dora: true },
  { id: 801, data: 8, dora: false },
  { id: 802, data: 8, dora: false },
  { id: 803, data: 8, dora: false },
  { id: 804, data: 8, dora: true },
  { id: 901, data: 9, dora: false },
  { id: 902, data: 9, dora: false },
  { id: 903, data: 9, dora: false },
  { id: 904, data: 9, dora: true },
  { id: 1002, data: 10, dora: false },
  { id: 1003, data: 10, dora: false },
  { id: 1004, data: 10, dora: false },
  { id: 1001, data: 10, dora: false },
  { id: 1101, data: 11, dora: true },
  { id: 1102, data: 11, dora: true },
  { id: 1103, data: 11, dora: true },
  { id: 1104, data: 11, dora: true },
]

export class Deck {
  public getCard(id: number): Card {
    const card = this.deck.find((c) => c.id === id)
    if (card === undefined) {
      throw new Error('Target not found')
    }
    return card
  }

  private deck: Card[]
  private dora: Card | undefined

  constructor() {
    // デッキを初期化
    this.deck = DefaultDeck.concat()
    // シャッフル
    for (let i = this.deck.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1))
      const tmp = this.deck[i]
      this.deck[i] = this.deck[r]
      this.deck[r] = tmp
    }
    this.dora = this.next
  }

  public get length(): number {
    return this.deck.length
  }

  get next(): Card {
    const next = this.deck.pop()
    if (next !== undefined) {
      return next
    }
    throw new Error('Deck is empty')
  }

  public get hasNext(): boolean {
    return this.length > 0
  }
}
