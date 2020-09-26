<template>
  <el-form label-width="100px" :model="loginRequest">
    <el-form-item label="Name">
      <el-input v-model="loginRequest.playerName"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">ログイン</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AccountStore } from '@/store'

@Component
export default class Login extends Vue {
  private loginRequest: { playerName: string } = {
    playerName: '',
  }

  private onSubmit(): void {
    AccountStore.login(this.loginRequest.playerName)
  }
}
</script>

<style scoped>
.input_field {
  margin: 0% 10%;
  background-color: rgba(247, 247, 247, 1);
  border-color: rgba(112, 112, 112, 1);
  border-width: 2px;
  border-style: solid;
}
.image {
  width: 100%;
  height: auto;
}
#login {
  margin: 25%;
  overflow: visible;
  width: 50%;
  white-space: nowrap;
  text-align: center;
  font-size: 24px;
  color: white;
}
</style>
