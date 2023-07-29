import { ChangeDateProps, WaterPlantProps } from 'types/api/reminder';
import { createContext } from 'react';

interface ReminderProps {
  waterCallback: (variables: WaterPlantProps) => void;
  changeDateCallback: (variables: ChangeDateProps) => void;
}

export type ReminderProviderProps = ReminderProps & React.PropsWithChildren;

export const ReminderContext = createContext<ReminderProps | null>(null);

const ReminderProvider = (props: ReminderProviderProps) => {
  const { waterCallback, changeDateCallback, children } = props;

  return (
    <ReminderContext.Provider value={{ waterCallback, changeDateCallback }}>
      {children}
    </ReminderContext.Provider>
  );
};

export default ReminderProvider;
