import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { format } from 'date-fns';
import { Container } from './styles';

interface RendererData {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

interface ClockProps {
  initialTime: string;
  endTime: string;
}

const Clock: React.FC<ClockProps> = ({ initialTime, endTime }) => {
  const parsedInitialTime = new Date(
    `${format(Date.now(), 'yyyy-MM-dd')} ${initialTime} -3:00`,
  );

  const parsedEndTime = new Date(
    `${format(Date.now(), 'yyyy-MM-dd')} ${endTime} -3:00`,
  );
  const OnAir = ({ completed }: RendererData) => {
    if (completed) {
      return (
        <Container isFinished>
          <span>Exibido</span>
        </Container>
      );
    }
    return (
      <Container isLive>
        <span>On Air</span>
      </Container>
    );
  };
  const renderer = ({ hours, minutes, seconds, completed }: RendererData) => {
    if (completed) {
      return <Countdown date={parsedEndTime} renderer={OnAir} />;
    }
    return (
      <Container isTimer>
        <span>
          No ar em {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      </Container>
    );
  };

  return <Countdown date={parsedInitialTime} renderer={renderer} />;
};

export default Clock;
