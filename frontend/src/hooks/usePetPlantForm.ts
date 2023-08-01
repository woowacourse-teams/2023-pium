import type { EditPetPlantRequest } from 'types/api/petPlant';
import { useReducer } from 'react';
import { inputValidate } from 'utils/validate';

export type PetPlantForm = Record<keyof EditPetPlantRequest, string>;

type PetPlantFormAction =
  | {
      type: 'SET';
      key: keyof Omit<PetPlantForm, 'waterCycle'>;
      value: string;
      maxLength?: number;
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
      const { maxLength = Infinity } = action;

      return { ...petPlantForm, [action.key]: action.value.slice(0, maxLength) };
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

export const usePetPlantForm = (initialForm = initialPetPlantForm) => {
  const [form, dispatch] = useReducer(petPlantFormReducer, initialForm);

  return { form, dispatch };
};
