import { exec as execNative } from 'child_process';
import { promisify } from 'util';
import * as ffi from 'ffi-napi';
import KeyboardAction from './keyboard/keyboard-action.class';

const exec = promisify(execNative);

const getProcessId = async (
  processName: string
): Promise<string | undefined> => {
  const activeProcessResult = await exec('tasklist');
  const activeProcesses = activeProcessResult?.stdout?.split('\r\n') || [];
  const echoProcessLine = activeProcesses.find(process =>
    process.includes(processName)
  );
  if (!echoProcessLine) {
    return undefined;
  }
  const echoPid = echoProcessLine.replace(processName, '').trim().split(' ')[0];
  return echoPid;
};

const killProcess = async (processId: string) => {
  // /t will also kill any process started by the EchoVR process. Known as tree killing.
  await exec(`taskkill /pid ${processId} /t`);
};

const focusWindow = (windowName: string) => {
  const user32 = new ffi.Library('user32', {
    GetTopWindow: ['long', ['long']],
    FindWindowA: ['long', ['string', 'string']],
    SetActiveWindow: ['long', ['long']],
    SetForegroundWindow: ['bool', ['long']],
    BringWindowToTop: ['bool', ['long']],
    ShowWindow: ['bool', ['long', 'int']],
    SwitchToThisWindow: ['void', ['long', 'bool']],
    GetForegroundWindow: ['long', []],
    AttachThreadInput: ['bool', ['int', 'long', 'bool']],
    GetWindowThreadProcessId: ['int', ['long', 'int']],
    SetWindowPos: [
      'bool',
      ['long', 'long', 'int', 'int', 'int', 'int', 'uint'],
    ],
    SetFocus: ['long', ['long']],
  });

  const kernel32 = new ffi.Library('Kernel32.dll', {
    GetCurrentThreadId: ['int', []],
  });

  const winToSetOnTop = user32.FindWindowA(null, windowName);
  const foregroundHWnd = user32.GetForegroundWindow();
  const currentThreadId = kernel32.GetCurrentThreadId();
  const windowThreadProcessId = user32.GetWindowThreadProcessId(
    foregroundHWnd,
    null
  );
  user32.ShowWindow(winToSetOnTop, 9);
  user32.SetWindowPos(winToSetOnTop, -1, 0, 0, 0, 0, 3);
  user32.SetWindowPos(winToSetOnTop, -2, 0, 0, 0, 0, 3);
  user32.SetForegroundWindow(winToSetOnTop);
  user32.AttachThreadInput(windowThreadProcessId, currentThreadId, 0);
  user32.SetFocus(winToSetOnTop);
  user32.SetActiveWindow(winToSetOnTop);
};

const keyboard = new KeyboardAction();

export { exec, getProcessId, killProcess, focusWindow, keyboard };
