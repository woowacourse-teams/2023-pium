import { useParams } from 'react-router-dom';
import DateInput from 'components/@common/DateInput';
import FormInput from 'components/@common/FormInput';
import FormInputBox from 'components/@common/FormInputBox';
import Image from 'components/@common/Image';
import ProgressBar from 'components/@common/ProgressBar';
import Select from 'components/@common/Select';
import Stack from 'components/@common/Stack';
import useStack from 'components/@common/Stack/hooks/useStack';
import {
  Button,
  Center,
  DictionaryPlantImageArea,
  DictionaryPlantName,
  FormArea,
  Wrapper,
} from './Form.style';
import useDictDetail from 'hooks/queries/dictionary/useDictDetail';
import useRegisterPetPlant from 'hooks/queries/pet/useRegisterPetPlant';
import useAddToast from 'hooks/useAddToast';
import { initialPetPlantForm, usePetPlantForm } from 'hooks/usePetPlantForm';
import { getDateToString, isDateFormat } from 'utils/date';
import { NUMBER, OPTIONS } from 'constants/index';

const STACK_SIZE = 9;
const STACK_ELEMENT_HEIGHT = '96px';

const PetRegisterForm = () => {
  const { id } = useParams();
  if (!id) throw new Error('URL에 id가 없습니다.');

  const dictionaryPlantId = Number(id);
  const { topIndex, showNextElement } = useStack(STACK_SIZE);
  const { data: dictionaryPlant } = useDictDetail(dictionaryPlantId);
  const { form, dispatch } = usePetPlantForm({
    ...initialPetPlantForm,
    nickname: dictionaryPlant ? dictionaryPlant.name : '피우미',
  });
  const { mutate } = useRegisterPetPlant();
  const addToast = useAddToast();

  const formProgressPercentage = Math.floor((topIndex / (STACK_SIZE - 1)) * 100);
  const today = getDateToString();

  const setNickname = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET', key: 'nickname', maxLength: NUMBER.maxNicknameLength, value });
  };

  const validateNickname = () => {
    if (form.nickname !== '') showNextElement(0);
  };

  const setBirthDate = (value: string) => {
    if (value > today) return;

    dispatch({ type: 'SET', key: 'birthDate', value });
    showNextElement(1);
  };

  const setLastWaterDate = (value: string) => {
    if (value > today) return;

    dispatch({ type: 'SET', key: 'lastWaterDate', value });
    showNextElement(2);
  };

  const setWaterCycle = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_NUMBER_INPUT',
      key: 'waterCycle',
      value,
      min: NUMBER.minCycleDate,
      max: NUMBER.maxCycleDate,
    });
  };

  const validateWaterCycle = () => {
    if (form.waterCycle !== '') showNextElement(3);
  };

  const setFlowerpot = (value: string) => {
    dispatch({ type: 'SET', key: 'flowerpot', value });
    showNextElement(4);
  };

  const setLocation = (value: string) => {
    dispatch({ type: 'SET', key: 'location', value });
    showNextElement(5);
  };

  const setLight = (value: string) => {
    dispatch({ type: 'SET', key: 'light', value });
    showNextElement(6);
  };

  const setWind = (value: string) => {
    dispatch({ type: 'SET', key: 'wind', value });
    showNextElement(7);
  };

  const submit = () => {
    const { birthDate: formBirthDate, lastWaterDate: formLastWaterDate } = form;

    if (!(isDateFormat(formBirthDate) && isDateFormat(formLastWaterDate))) {
      addToast('error', '잘못된 날짜 형식입니다.');
      return;
    }

    const requestForm = {
      ...form,
      dictionaryPlantId,
      birthDate: formBirthDate,
      lastWaterDate: formLastWaterDate,
      waterCycle: Number(form.waterCycle),
    };

    mutate(requestForm);
  };

  const getStatus = (index: number) => (topIndex === index ? 'focus' : 'default');

  const isValidForm = Object.values(form).every((value) => value !== '');

  return (
    <Wrapper>
      <FormArea>
        <DictionaryPlantName>{dictionaryPlant?.name}</DictionaryPlantName>
        <DictionaryPlantImageArea>
          <Image size="160px" src={dictionaryPlant?.image} />
        </DictionaryPlantImageArea>
        <Center>
          <ProgressBar percentage={formProgressPercentage} width="90%" height="12px" />
        </Center>
        <Stack topIndex={topIndex}>
          <Stack.Element height={STACK_ELEMENT_HEIGHT}>
            <FormInputBox title="별명이 뭔가요?" status={getStatus(0)}>
              <FormInput
                value={form.nickname}
                onChange={setNickname}
                nextCallback={validateNickname}
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={STACK_ELEMENT_HEIGHT}>
            <FormInputBox title="입양일이 언제인가요?" status={getStatus(1)}>
              <DateInput
                aria-label="입양일 선택"
                value={form.birthDate}
                changeCallback={setBirthDate}
                max={today}
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={STACK_ELEMENT_HEIGHT}>
            <FormInputBox title="마지막으로 물 준 날짜가 언제인가요?" status={getStatus(2)}>
              <DateInput
                aria-label="마지막으로 물 준 날짜 선택"
                value={form.lastWaterDate}
                changeCallback={setLastWaterDate}
                max={today}
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={STACK_ELEMENT_HEIGHT}>
            <FormInputBox title="며칠 주기로 물을 주나요?" status={getStatus(3)}>
              <FormInput
                value={form.waterCycle}
                onChange={setWaterCycle}
                nextCallback={validateWaterCycle}
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={STACK_ELEMENT_HEIGHT}>
            <FormInputBox title="어떤 화분에서 키우고 있나요?" status={getStatus(4)}>
              <Select
                value={form.flowerpot}
                options={OPTIONS.flowerPot}
                onChange={setFlowerpot}
                placeholder="화분의 종류를 선택해 주세요"
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={STACK_ELEMENT_HEIGHT}>
            <FormInputBox title="화분의 위치는 어디인가요?" status={getStatus(5)}>
              <Select
                value={form.location}
                options={OPTIONS.location}
                onChange={setLocation}
                placeholder="화분의 위치를 선택해 주세요"
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={STACK_ELEMENT_HEIGHT}>
            <FormInputBox title="빛을 어떻게 받고 있나요?" status={getStatus(6)}>
              <Select
                value={form.light}
                options={OPTIONS.light}
                onChange={setLight}
                placeholder="채광을 선택해 주세요"
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={STACK_ELEMENT_HEIGHT}>
            <FormInputBox title="바람은 얼마나 통하나요?" status={getStatus(7)}>
              <Select
                value={form.wind}
                options={OPTIONS.wind}
                onChange={setWind}
                placeholder="통풍을 선택해 주세요"
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={STACK_ELEMENT_HEIGHT}>
            <Center>
              <Button type="submit" onClick={submit} disabled={!isValidForm}>
                등록하기
              </Button>
            </Center>
          </Stack.Element>
        </Stack>
      </FormArea>
    </Wrapper>
  );
};

export default PetRegisterForm;
