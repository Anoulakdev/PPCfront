import * as roleStore from './roleStore'
import * as userStore from './userStore'
import * as customerStore from './customerStore'

export default {
  ...roleStore,
  ...userStore,
  ...customerStore
}
