export class GameAccount {
  private id: number
  private name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  public get Id(): number {
    return this.id
  }

  public get Name(): string {
    return this.name
  }
}
