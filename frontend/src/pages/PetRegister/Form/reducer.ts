import { useReducer } from 'react';
import { inputValidate } from 'utils/validate';

interface PetPlantForm {
  nickname: string;
  location: string;
  flowerpot: string;
  waterCycle: string;
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
      type: 'SET_NUMBER_INPUT';
      key: keyof Pick<PetPlantForm, 'waterCycle'>;
      value: string;
      min?: number;
      max?: number;
    }
  | {
      type: 'INIT';
    };

const initialPetPlantForm: PetPlantForm = {
  nickname: '기영이',
  location: '',
  flowerpot: '',
  waterCycle: '',
  light: '',
  wind: '',
  birthDate: '',
  lastWaterDate: '',
} as const;

const petPlantFormReducer = (petPlantForm: PetPlantForm, action: PetPlantFormAction) => {
  switch (action.type) {
    case 'SET': {
      return { ...petPlantForm, [action.key]: action.value };
    }
    case 'SET_NUMBER_INPUT': {
      if (action.value === '') {
        return { ...petPlantForm, [action.key]: '' };
      }

      if (
        !inputValidate.checkNumber(action.value) ||
        !inputValidate.checkRange(Number(action.value), action.min, action.max)
      ) {
        return { ...petPlantForm };
      }

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
