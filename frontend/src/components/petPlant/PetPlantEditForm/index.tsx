import type { EditPetPlantRequest, PetPlantDetails } from 'types/api/petPlant';
import { useId } from 'react';
import DateInput from 'components/@common/DateInput';
import Flowerpot from 'components/@common/Icons/Flowerpot';
import House from 'components/@common/Icons/House';
import Sun from 'components/@common/Icons/Sun';
import Wind from 'components/@common/Icons/Wind';
import Image from 'components/@common/Image';
import {
  InfoArea,
  Bold,
  ExpandedTextBox,
  Environment,
  SubTitle,
  Text,
  Title,
  TitleArea,
  Wrapper,
  Content,
  Divider,
  EnvironmentTitle,
  EnvironmentItem,
  InputWrapper,
  HiddenLabel,
  NicknameInput,
  WaterCycleInput,
  Select,
  Button,
} from './PetPlantEditForm.style';
import useEditPetPlant from 'hooks/queries/pet/useEditPetPlant';
import { PetPlantForm, usePetPlantForm } from 'hooks/usePetPlantForm';
import { convertDateKorYear, getParticularDateFromSpecificDay, getDateToString } from 'utils/date';
import { NUMBER, OPTIONS } from 'constants/index';
import theme from 'style/theme.style';

const PetPlantEditForm = (props: PetPlantDetails) => {
  const {
    id: petPlantId,
    imageUrl,
    nickname,
    dictionaryPlant: { name: dictName },
    birthDate,
    daySince,
    waterCycle,
    lastWaterDate,
    nextWaterDate,
    location,
    flowerpot,
    light,
    wind,
  } = props;

  const { form, dispatch } = usePetPlantForm({
    nickname,
    birthDate,
    lastWaterDate,
    location,
    flowerpot,
    light,
    wind,
    waterCycle: waterCycle.toString(),
  });

  const { mutate } = useEditPetPlant(petPlantId);

  const nicknameInputId = useId();
  const waterCycleInputId = useId();

  const isValidForm = (newForm: PetPlantForm) =>
    newForm.nickname.trim() !== '' && newForm.waterCycle !== '';

  const submit = () => {
    if (!isValidForm(form)) {
      alert('별명과 물 주기 주기는 공백이 아니어야 해요.');
      return;
    }

    const requestForm: EditPetPlantRequest = {
      ...form,
      waterCycle: Number(form.waterCycle),
    };

    mutate(requestForm);
  };

  const handleSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    submit();
  };

  const setNickname: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    dispatch({ type: 'SET', key: 'nickname', maxLength: NUMBER.maxNicknameLength, value });
  };

  const setBirthDate = (value: string) => {
    dispatch({ type: 'SET', key: 'birthDate', value });
  };

  const setLastWaterDate = (value: string) => {
    dispatch({ type: 'SET', key: 'lastWaterDate', value });
  };

  const setWaterCycle: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    dispatch({
      type: 'SET_NUMBER_INPUT',
      key: 'waterCycle',
      value,
      min: NUMBER.minCycleDate,
      max: NUMBER.maxCycleDate,
    });
  };

  const setFlowerpot: React.ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
    dispatch({ type: 'SET', key: 'flowerpot', value });
  };

  const setLocation: React.ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
    dispatch({ type: 'SET', key: 'location', value });
  };

  const setLight: React.ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
    dispatch({ type: 'SET', key: 'light', value });
  };

  const setWind: React.ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
    dispatch({ type: 'SET', key: 'wind', value });
  };

  const newNextWaterDate = convertDateKorYear(
    lastWaterDate === form.lastWaterDate
      ? nextWaterDate
      : getParticularDateFromSpecificDay(Number(form.waterCycle), new Date(form.lastWaterDate))
  );

  return (
    <Wrapper>
      <Image type="wide" src={imageUrl} alt={`${nickname}(${dictName})`} size="300px" />
      <Content>
        <TitleArea>
          <Title>
            <InputWrapper>
              <HiddenLabel htmlFor={nicknameInputId}>별명 바꾸기</HiddenLabel>
              <NicknameInput
                type="text"
                value={form.nickname}
                onChange={setNickname}
                id={nicknameInputId}
              />
            </InputWrapper>
          </Title>
          <SubTitle>{dictName}</SubTitle>
        </TitleArea>

        <Divider aria-hidden="true" />

        <InfoArea>
          <ExpandedTextBox>
            <Text>입양일</Text>
            <InputWrapper $width="180px">
              <HiddenLabel>입양일 바꾸기</HiddenLabel>
              <DateInput
                value={form.birthDate}
                changeCallback={setBirthDate}
                max={getDateToString()}
              />
            </InputWrapper>
          </ExpandedTextBox>
          <ExpandedTextBox>
            <Text>함께한 지</Text>
            <Text>{daySince}일</Text>
          </ExpandedTextBox>
        </InfoArea>

        <Divider aria-hidden="true" />

        <InfoArea>
          <ExpandedTextBox>
            <Text>물 주기</Text>
            <InputWrapper>
              <HiddenLabel htmlFor={waterCycleInputId}>물 주기 바꾸기</HiddenLabel>
              <WaterCycleInput
                type="text"
                inputMode="numeric"
                value={form.waterCycle}
                onChange={setWaterCycle}
                id={waterCycleInputId}
              />
              일
            </InputWrapper>
          </ExpandedTextBox>
          <ExpandedTextBox>
            <Text>마지막 물주기</Text>
            <InputWrapper $width="180px">
              <HiddenLabel>마지막 물 준 날 바꾸기</HiddenLabel>
              <DateInput
                value={form.lastWaterDate}
                changeCallback={setLastWaterDate}
                max={getDateToString()}
              />
            </InputWrapper>
          </ExpandedTextBox>
          <ExpandedTextBox>
            <Text>다음 물주기</Text>
            <Bold>{newNextWaterDate}</Bold>
          </ExpandedTextBox>
        </InfoArea>
        <Divider aria-hidden="true" />
        <Environment>
          <EnvironmentItem>
            <EnvironmentTitle>
              <House
                color={theme.color.primary}
                aria-label="장소"
                aria-describedby="반려 식물이 놓인 공간"
                width="20px"
                height="20px"
              />
            </EnvironmentTitle>
            <Select defaultValue={location} onChange={setLocation}>
              {OPTIONS.location.map((locationOption) => (
                <option key={locationOption} value={locationOption}>
                  {locationOption}
                </option>
              ))}
            </Select>
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <Flowerpot
                color={theme.color.primary}
                aria-label="화분"
                aria-describedby="반려 식물이 담긴 화분의 재질"
                width="20px"
                height="20px"
              />
            </EnvironmentTitle>
            <Select defaultValue={flowerpot} onChange={setFlowerpot}>
              {OPTIONS.flowerPot.map((pot) => (
                <option key={pot} value={pot}>
                  {pot}
                </option>
              ))}
            </Select>
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <Sun
                color={theme.color.primary}
                aria-label="채광"
                aria-describedby="반려 식물이 빛을 얼마나 받고 있는지"
                width="20px"
                height="20px"
              />
            </EnvironmentTitle>
            <Select defaultValue={light} onChange={setLight}>
              {OPTIONS.light.map((lightOption) => (
                <option key={lightOption} value={lightOption}>
                  {lightOption}
                </option>
              ))}
            </Select>
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <Wind
                color={theme.color.primary}
                aria-label="바람"
                aria-describedby="반려 식물이 통풍이 잘 되는 위치인지"
                width="20px"
                height="20px"
              />
            </EnvironmentTitle>
            <Select defaultValue={wind} onChange={setWind}>
              {OPTIONS.wind.map((windOption) => (
                <option key={windOption} value={windOption}>
                  {windOption}
                </option>
              ))}
            </Select>
          </EnvironmentItem>
        </Environment>
        <Button type="submit" onClick={handleSubmitClick} disabled={!isValidForm(form)}>
          다시 저장하기
        </Button>
      </Content>
    </Wrapper>
  );
};

export default PetPlantEditForm;
