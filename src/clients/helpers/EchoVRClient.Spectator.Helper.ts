import { sendKey, log } from '../../utilities';

export class EchoVRClientSpectatorHelper {
  /**
   * Helper methods to control spectator camera through keysends.
   */
  public requestFollowByIndex(playerIndex: number) {
    const partialKeyString = `+${playerIndex}`;
    const keyString = `${partialKeyString} ${partialKeyString} ${partialKeyString}`;
    sendKey(keyString, undefined, 0, 0, 6);
    log.info(`[EchoVRClient] Went to player: ${playerIndex}`);
  }

  public requestFollow() {
    const keyString = 'ffff';
    sendKey(keyString, undefined, 0, 1, 6);
    log.info('[EchoVRClient] Clicked follow');
  }

  public requestPOV() {
    const keyString = 'pppp';
    sendKey(keyString, undefined, 0, 1, 6);
    log.info('[EchoVRClient] Clicked pov');
  }

  public requestCameraByIndex(cameraIndex: number) {
    const partialKeyString = `^^${cameraIndex}`;
    const keyString = `${partialKeyString} ${partialKeyString} ${partialKeyString}`;
    sendKey(keyString, undefined, 0, 0, 6);
    log.info(`[EchoVRClient] Went to camera: ${cameraIndex}`);
  }

  public requestSideline() {
    const keyString = 'ssss';
    sendKey(keyString, undefined, 20, 6, 6);
  }

  public requestUIToggle() {
    const keyString = 'uuuu';
    sendKey(keyString, undefined, 20, 6, 6);
  }

  public listenOrange() {
    const keyString = '{F6}{F6}{F6}{F6}';
    sendKey(keyString, undefined, 20, 6, 6);
  }

  public listenBlue() {
    const keyString = '{F7}{F7}{F7}{F7}';
    sendKey(keyString, undefined, 20, 6, 6);
  }

  public muteAll() {
    const keyString = '{F5}{F5}{F5}{F5}';
    sendKey(keyString, undefined, 20, 6, 6);
  }

  public showScoreBoard(secondsToShow: number) {
    const keyString = '{TAB}';
    sendKey(keyString, undefined, 20, 6, secondsToShow * 1000);
  }
}
