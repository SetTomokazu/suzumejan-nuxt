<template>
  <div>
    <div id="stage" class="stage"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class Game extends Vue {
  private items: [] = []
  private state = 'waiting2EnterRoom'
  private turn = -1
  private serverTurn = -1

  private init() {
    this.$store.state.GameModule.socketEmitStartTraining(
      this.$store.state.AccountModule.account
    )

    this.$store.getters('eventQueue').enqueue({ event: 'requestShuffledDeck' })
  }
}
</script>

<style scoped>
.stage {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.stage * {
  width: 100%;
  height: 100%;
}
</style>
