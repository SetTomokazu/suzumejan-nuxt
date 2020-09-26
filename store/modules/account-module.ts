import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import io from 'socket.io-client'

export interface IAccount {
  id: number
  name: string
}

@Module({ stateFactory: true, name: 'account' })
export class Account extends VuexModule implements IAccount {
  private socket = io(`localhost:3000`)
  public id = 0
  public name = ''

  @Mutation
  public login(name: string): void {
    this.socket.emit('login', { name })
  }
}
