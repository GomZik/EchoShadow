export enum EventType {
  RemoteJoinedMatch = 'remoteJoinedMatch',
  RemoteLeftMatch = 'remoteLeftMatch',
  LocalJoinedMatch = 'localJoinedMatch',
  LocalLeftMatch = 'localLeftMatch',
  LocalWillLeaveMatch = 'localWillLeaveMatch',
  LocalWillJoinMatch = 'localWillJoinMatch',
  NewSnapshotData = 'newShapshotData',
  LocalIsConnected = 'localIsConneceted',
  LocalIsDisconnected = 'localIsDisconnected',
  RemoteIsConnected = 'remoteIsConnected',
  RemoteIsDisconnected = 'remoteIsDisconnected',
  LocalIsSynced = 'localIsSynced',
  LocalIsUnsynced = 'localIsUnsynced',
  NewShadowState = 'newShadowState',
  NewMatchData = 'newMatchData',
  TestNewMatchData = 'testNewMatchData',
  TestLocalJoinedMatch = 'testLocalJoinedMatch',
  NewSpectatorTarget = 'newSpectatorTarget',
  RemoteChangedTeam = 'remoteChangedTeam',
}
