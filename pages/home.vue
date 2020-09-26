<template>
  <div>
    <div>
      <h1>{{ name }}</h1>
      <p>何して遊ぶ？</p>
      <button id="training" @click="solo()">一人用トレーニング</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AccountStore } from '@/store'

@Component({})
export default class Home extends Vue {
  public get name(): string {
    return AccountStore.name
  }

  public mounted() {
    if (AccountStore.name === '') {
      console.log('go to login')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped></style>
