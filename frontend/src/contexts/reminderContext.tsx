import { ChangeDateParams, WaterPlantParams } from 'types/api/reminder';
import { createContext } from 'react';

interface ReminderProps {
  waterCallback: (variables: WaterPlantParams) => void;
  changeDateCallback: (variables: ChangeDateParams) => void;
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
