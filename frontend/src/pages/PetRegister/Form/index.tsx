import type { DictionaryPlant } from 'types/api/dictionary';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DateInput from 'components/DateInput';
import FormInputBox from 'components/FormInputBox';
import Image from 'components/Image';
import Select from 'components/Select';
import Stack from 'components/Stack';
import useStack from 'components/Stack/hooks/useStack';
import {
  Button,
  ButtonArea,
  DictionaryPlantImageArea,
  DictionaryPlantName,
  FormArea,
  Wrapper,
} from './Form.style';
import dictionaryPlantsAPI from 'apis/dictionaryPlants';
import { usePetPlantForm } from './reducer';

const PetRegisterForm = () => {
  const { id: dictionaryPlantId } = useParams();
  const { topIndex, showNextElement, isLastElementShown } = useStack(8);
  const { form, dispatch } = usePetPlantForm();

  const [dictionaryPlant, setDictionaryPlant] = useState<DictionaryPlant | null>(null);

  const stackElementHeight = '80px';

  const setNickname = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET', key: 'nickname', value });
    showNextElement(0);
  };

  const setBirthDate = (value: string) => {
    dispatch({ type: 'SET', key: 'birthDate', value });
    showNextElement(1);
  };

  const setLastWaterDate = (value: string) => {
    dispatch({ type: 'SET', key: 'lastWaterDate', value });
    showNextElement(2);
  };

  const setWaterCycle = ({ target: { valueAsNumber } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NUMBER', key: 'waterCycle', value: valueAsNumber });
    showNextElement(3);
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
    console.log(form);
  };

  useEffect(() => {
    dictionaryPlantsAPI
      .getDetail(Number(dictionaryPlantId))
      .then((response) => {
        if (!response.ok) return;
        response.json().then(setDictionaryPlant).catch();
      })
      .catch();
  }, []);

  const getStatus = (index: number) => (topIndex === index ? 'focus' : 'default');

  return (
    <Wrapper>
      <FormArea>
        <DictionaryPlantName>{dictionaryPlant?.name}</DictionaryPlantName>
        <DictionaryPlantImageArea>
          <Image size="160px" src={dictionaryPlant?.image} />
        </DictionaryPlantImageArea>
        <Stack topIndex={topIndex}>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="별명이 뭔가요?" status={getStatus(0)}>
              <input value={form.nickname} onChange={setNickname}></input>
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="생일(입양일)이 언제인가요?" status={getStatus(1)}>
              <DateInput date={form.birthDate} onChange={setBirthDate} />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="마지막으로 물 준 날짜가 언제인가요?" status={getStatus(2)}>
              <DateInput date={form.lastWaterDate} onChange={setLastWaterDate} />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="며칠 주기로 물을 주나요?" status={getStatus(3)}>
              <input type="text" value={form.waterCycle} onChange={setWaterCycle}></input>
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="어떤 화분에서 키우고 있나요?" status={getStatus(4)}>
              <Select
                value={form.flowerpot}
                options={['플라스틱', '유리', '캔']}
                onChange={setFlowerpot}
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="화분의 위치는 어디인가요?" status={getStatus(5)}>
              <Select
                value={form.location}
                options={['거실', '창문 앞', '어두운 방안']}
                onChange={setLocation}
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="빛을 어떻게 받고 있나요?" status={getStatus(6)}>
              <Select value={form.light} options={['기타등등']} onChange={setLight} />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="바람은 얼마나 통하나요?" status={getStatus(7)}>
              <Select value={form.wind} options={['기타등등']} onChange={setWind} />
            </FormInputBox>
          </Stack.Element>
        </Stack>
      </FormArea>
      <ButtonArea>
        <Button type="submit" onClick={submit} disabled={!isLastElementShown}>
          확인
        </Button>
      </ButtonArea>
    </Wrapper>
  );
};

export default PetRegisterForm;
