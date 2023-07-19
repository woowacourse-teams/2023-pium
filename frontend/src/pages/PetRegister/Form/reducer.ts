import { useReducer } from 'react';

interface PetPlantForm {
  nickname: string;
  location: string;
  flowerpot: string;
  waterCycle: number;
  light: string;
  wind: string;
  birthDate: string;
  lastWaterDate: string;
}

type PetPlantFormAction =
  | {
      type: 'SET';
      key: keyof Omit<PetPlantForm, 'waterCycle'>;
      value: string;
    }
  | {
      type: 'SET_NUMBER';
      key: keyof Pick<PetPlantForm, 'waterCycle'>;
      value: number;
    }
  | {
      type: 'INIT';
    };

const initialPetPlantForm: PetPlantForm = {
  nickname: '기영이',
  location: '',
  flowerpot: '',
  waterCycle: 7,
  light: '',
  wind: '',
  birthDate: '2023-07-08',
  lastWaterDate: '2023-07-10',
} as const;

const petPlantFormReducer = (petPlantForm: PetPlantForm, action: PetPlantFormAction) => {
  switch (action.type) {
    case 'SET': {
      return { ...petPlantForm, [action.key]: action.value };
    }
    case 'SET_NUMBER': {
      return { ...petPlantForm, [action.key]: action.value };
    }
    case 'INIT': {
      return initialPetPlantForm;
    }
  }
};

export const usePetPlantForm = () => {
  const [form, dispatch] = useReducer(petPlantFormReducer, initialPetPlantForm);

  return { form, dispatch };
};
