import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import { Account } from '~/store/modules/account-module'

// eslint-disable-next-line import/no-mutable-exports
let AccountStore: Account

function initializeStores(store: Store<any>): void {
  AccountStore = getModule(Account, store)
}

export { initializeStores, AccountStore }
