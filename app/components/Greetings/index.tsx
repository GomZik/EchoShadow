import React from 'react';
import { ipcRenderer } from 'electron';
import { ImpulseSpinner } from 'react-spinners-kit';
import { Container, Text, HorizontalContainer } from './styles';
import DeviceStatus from '../DeviceStatus';
import { DeviceStatusEnum, DeviceTypeEnum } from '../../types';

const Greetings: React.FC = () => {
  const [statusMessage, setStatusMessage] = React.useState(
    'Starting Up EchoShadow...'
  );
  const [localStatus, setLocalStatus] = React.useState<DeviceStatusEnum>(
    DeviceStatusEnum.Inactive
  );
  const [remoteStatus, setRemoteStatus] = React.useState<DeviceStatusEnum>(
    DeviceStatusEnum.Inactive
  );
  const [localIp, setLocalIp] = React.useState('Loading');
  const [remoteIp, setRemoteIp] = React.useState('Loading');

  React.useEffect(() => {
    ipcRenderer.on(
      'shadowStatusUpdate',
      (event: Electron.IpcRendererEvent, args: any) => {
        setStatusMessage(args.statusMessage);
        setLocalStatus(args.localStatus);
        setRemoteStatus(args.remoteStatus);
        setLocalIp(args.localIp);
        setRemoteIp(args.remoteIp);
      }
    );
    return function cleanup() {
      // we might or might not need this, I just saw it in a stack overflow
      ipcRenderer.removeAllListeners('shadowStatusUpdate');
    };
  }, []);

  return (
    <Container>
      <HorizontalContainer>
        <DeviceStatus
          deviceType={DeviceTypeEnum.Headset}
          ipAddress={remoteIp}
          status={remoteStatus}
        />
        <ImpulseSpinner loading frontColor="#655d80" backColor="#282436" />
        <DeviceStatus
          deviceType={DeviceTypeEnum.Computer}
          ipAddress={localIp}
          status={localStatus}
        />
      </HorizontalContainer>
      <Text>{statusMessage}</Text>
    </Container>
  );
};

export default Greetings;