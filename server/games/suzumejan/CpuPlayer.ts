import { Player } from './Player'

/**
 * COMプレイヤー
 */
export class CpuPlayer extends Player {
  public get isAuto(): boolean {
    return true
  }
}
