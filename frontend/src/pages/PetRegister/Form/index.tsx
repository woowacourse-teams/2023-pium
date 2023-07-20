import type { DictionaryPlant } from 'types/api/dictionary';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DateInput from 'components/DateInput';
import FormInput from 'components/FormInput';
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
import DictAPI from 'apis/dictionary';
import petPlantsAPI from 'apis/pet';
import { URL_PATH } from 'constants/index';
import { usePetPlantForm } from './reducer';

const PetRegisterForm = () => {
  const { id } = useParams();
  const dictionaryPlantId = Number(id);
  const { topIndex, showNextElement } = useStack(8);
  const { form, dispatch } = usePetPlantForm();
  const navigate = useNavigate();

  const [dictionaryPlant, setDictionaryPlant] = useState<DictionaryPlant | null>(null);

  const stackElementHeight = '96px';

  const setNickname = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET', key: 'nickname', value });
  };

  const validateNickname = () => {
    if (form.nickname !== '') showNextElement(0);
  };

  const setBirthDate = (value: string) => {
    dispatch({ type: 'SET', key: 'birthDate', value });
    showNextElement(1);
  };

  const setLastWaterDate = (value: string) => {
    dispatch({ type: 'SET', key: 'lastWaterDate', value });
    showNextElement(2);
  };

  const setWaterCycle = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NUMBER_INPUT', key: 'waterCycle', value });
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
    const submitForm = {
      ...form,
      dictionaryPlantId,
      waterCycle: Number(form.waterCycle),
    };

    petPlantsAPI.postForm(submitForm).catch();
    navigate(URL_PATH.MAIN);
  };

  useEffect(() => {
    DictAPI.getDetail(dictionaryPlantId)
      .then(async (response) => {
        if (!response.ok) return;

        const data: DictionaryPlant = await response.json();
        setDictionaryPlant(data);
        dispatch({ type: 'SET', key: 'nickname', value: data.name });
      })
      .catch();
  }, []);

  const getStatus = (index: number) => (topIndex === index ? 'focus' : 'default');

  const isValidForm = Object.values(form).every((value) => value !== '');

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
              <FormInput
                value={form.nickname}
                onChange={setNickname}
                nextCallback={validateNickname}
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="생일(입양일)이 언제인가요?" status={getStatus(1)}>
              <DateInput value={form.birthDate} onChange={setBirthDate} />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="마지막으로 물 준 날짜가 언제인가요?" status={getStatus(2)}>
              <DateInput value={form.lastWaterDate} onChange={setLastWaterDate} />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="며칠 주기로 물을 주나요?" status={getStatus(3)}>
              <FormInput
                value={form.waterCycle}
                onChange={setWaterCycle}
                nextCallback={validateWaterCycle}
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="어떤 화분에서 키우고 있나요?" status={getStatus(4)}>
              <Select
                value={form.flowerpot}
                options={[
                  '플라스틱/유리/캔',
                  '물에 젖는 토분',
                  '수경 재배',
                  '행잉/목부작',
                  '유약/고화도 토분',
                ]}
                onChange={setFlowerpot}
                placeholder="화분의 종류를 선택해 주세요"
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="화분의 위치는 어디인가요?" status={getStatus(5)}>
              <Select
                value={form.location}
                options={['거실', '사무실', '욕실', '베란다', '방/원룸', '주방', '기타']}
                onChange={setLocation}
                placeholder="화분의 위치를 선택해 주세요"
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="빛을 어떻게 받고 있나요?" status={getStatus(6)}>
              <Select
                value={form.light}
                options={[
                  '창문 밖에서 해를 받아요',
                  '창문 안쪽에서 해를 받아요',
                  '일반 조명 빛을 받아요',
                  '식물용 조명 빛을 받아요',
                  '해를 못 받아요',
                ]}
                onChange={setLight}
                placeholder="채광을 선택해 주세요"
              />
            </FormInputBox>
          </Stack.Element>
          <Stack.Element height={stackElementHeight}>
            <FormInputBox title="바람은 얼마나 통하나요?" status={getStatus(7)}>
              <Select
                value={form.wind}
                options={[
                  '5m 내 창문이 있어요',
                  '5m 보다 멀리 창문이 있어요',
                  '창문이 없지만 바람이 통해요',
                  '바람이 안통해요',
                ]}
                onChange={setWind}
                placeholder="통풍을 선택해 주세요"
              />
            </FormInputBox>
          </Stack.Element>
        </Stack>
      </FormArea>
      <ButtonArea>
        <Button type="submit" onClick={submit} disabled={!isValidForm}>
          등록하기
        </Button>
      </ButtonArea>
    </Wrapper>
  );
};

export default PetRegisterForm;
