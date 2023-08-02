import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import createObserver from 'utils/createObserver';

interface SensorProps {
  fetcher: () => void;
  height?: string;
}

const Sensor = ({ fetcher, height = '32px' }: SensorProps) => {
  const sensorRef = useRef<HTMLDivElement>(null);
  const observer = createObserver(fetcher);

  useEffect(() => {
    const targetElement = sensorRef.current;
    if (targetElement) observer.observe(targetElement);
  }, []);

  return <Wrapper ref={sensorRef} $height={height} />;
};

export default Sensor;

const Wrapper = styled.div<{ $height: string }>`
  width: 100%;
  height: ${(props) => props.$height};
`;
