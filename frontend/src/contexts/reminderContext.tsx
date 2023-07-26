import { PushOffProps, WaterPlantProps } from 'types/api/reminder';
import { createContext } from 'react';

interface ReminderProps {
  waterCallback: (variables: WaterPlantProps) => void;
  pushOffCallback: (variables: PushOffProps) => void;
}

export type ReminderProviderProps = ReminderProps & React.PropsWithChildren;

export const ReminderContext = createContext<ReminderProps | null>(null);

const ReminderProvider = (props: ReminderProviderProps) => {
  const { waterCallback, pushOffCallback, children } = props;

  return (
    <ReminderContext.Provider value={{ waterCallback, pushOffCallback }}>
      {children}
    </ReminderContext.Provider>
  );
};

export default ReminderProvider;
