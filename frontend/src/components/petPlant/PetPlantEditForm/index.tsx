import type { PetPlantDetails } from 'types/petPlant';
import { useId } from 'react';
import { useNavigate } from 'react-router-dom';
import DateInput from 'components/@common/DateInput';
import Image from 'components/@common/Image';
import ImageButton from 'components/@common/ImageButton';
import Select from 'components/@common/Select';
import SvgIcons from 'components/@common/SvgIcons/SvgFill';
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
  PrimaryButton,
  SecondaryButton,
  ButtonArea,
  Label,
} from './PetPlantEditForm.style';
import useAddToast from 'hooks/common/useAddToast';
import useFileUpload from 'hooks/common/useFileUpload';
import { PetPlantForm, usePetPlantForm } from 'hooks/petPlant/usePetPlantForm';
import useEditPetPlant from 'hooks/queries/petPlant/useEditPetPlant';
import {
  convertDateKorYear,
  getParticularDateFromSpecificDay,
  getDateToString,
  isDateFormat,
  getDaysBetween,
} from 'utils/date';
import { NUMBER, OPTIONS } from 'constants/index';
import theme from 'style/theme.style';

const PetPlantEditForm = (props: PetPlantDetails) => {
  const {
    id: petPlantId,
    imageUrl,
    nickname,
    dictionaryPlant: { name: dictName },
    birthDate,
    waterCycle,
    secondLastWaterDate,
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

  const {
    imgRef,
    uploadedImageUrl,
    fileUploadHandler,
    file: imageBlob,
  } = useFileUpload({ imageUrl });

  const { mutate } = useEditPetPlant(petPlantId);
  const addToast = useAddToast();

  const navigate = useNavigate();
  const nicknameInputId = useId();
  const waterCycleInputId = useId();
  const imageButtonId = useId();

  const isValidForm = (newForm: PetPlantForm) => {
    if (
      uploadedImageUrl === imageUrl &&
      newForm.birthDate === birthDate &&
      newForm.flowerpot === flowerpot &&
      newForm.lastWaterDate === lastWaterDate &&
      newForm.light === light &&
      newForm.location === location &&
      newForm.nickname.trim() === nickname.trim() &&
      Number(newForm.waterCycle) === waterCycle &&
      newForm.wind === wind
    ) {
      return false;
    }

    return newForm.nickname.trim() !== '' && newForm.waterCycle !== '';
  };

  const submit = () => {
    if (!isValidForm(form)) {
      addToast('warning', '별명과 물 주기 주기는 공백이 아니어야 해요.');
      return;
    }

    const { birthDate: formBirthDate, lastWaterDate: formLastWaterDate } = form;

    if (!(isDateFormat(formBirthDate) && isDateFormat(formLastWaterDate))) {
      addToast('error', '잘못된 날짜 형식입니다.');
      return;
    }

    const requestForm = {
      ...form,
      nickname: form.nickname.trim(),
      birthDate: formBirthDate,
      lastWaterDate: formLastWaterDate,
      waterCycle: Number(form.waterCycle),
    };

    mutate({ imageData: imageBlob, requestForm });
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

  const setFlowerpot = (value: string) => {
    dispatch({ type: 'SET', key: 'flowerpot', value });
  };

  const setLocation = (value: string) => {
    dispatch({ type: 'SET', key: 'location', value });
  };

  const setLight = (value: string) => {
    dispatch({ type: 'SET', key: 'light', value });
  };

  const setWind = (value: string) => {
    dispatch({ type: 'SET', key: 'wind', value });
  };

  const newNextWaterDate = convertDateKorYear(
    lastWaterDate === form.lastWaterDate && waterCycle === Number(form.waterCycle)
      ? nextWaterDate
      : getParticularDateFromSpecificDay(Number(form.waterCycle), new Date(form.lastWaterDate))
  );

  const daySince = getDaysBetween(new Date(), form.birthDate) + 1;

  const { primary: primaryColor } = theme.color;

  return (
    <Wrapper>
      <Image type="wide" src={uploadedImageUrl} alt={`${nickname}(${dictName})`} size="300px" />
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
          <ExpandedTextBox>
            <Label htmlFor={imageButtonId}>
              <Text>이미지 변경하기</Text>
            </Label>
            <ImageButton
              ref={imgRef}
              customId={imageButtonId}
              changeCallback={fileUploadHandler}
              size={16}
            />
          </ExpandedTextBox>
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
                min={getDateToString(
                  new Date(
                    secondLastWaterDate ??
                      getParticularDateFromSpecificDay(-365, new Date(lastWaterDate))
                  )
                )}
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
              <SvgIcons
                icon="house"
                color={primaryColor}
                aria-label="장소"
                aria-describedby="반려 식물이 놓인 공간"
                size={20}
              />
            </EnvironmentTitle>
            <InputWrapper $width="100%">
              <Select
                value={form.location}
                options={OPTIONS.location}
                onChange={setLocation}
                placeholder="화분이 놓인 장소"
              />
            </InputWrapper>
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <SvgIcons
                icon="flowerpot"
                color={primaryColor}
                aria-label="화분"
                aria-describedby="반려 식물이 담긴 화분의 재질"
                size={20}
              />
            </EnvironmentTitle>
            <InputWrapper $width="100%">
              <Select
                value={form.flowerpot}
                options={OPTIONS.flowerPot}
                onChange={setFlowerpot}
                placeholder="화분 종류"
              />
            </InputWrapper>
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <SvgIcons
                icon="sun"
                color={primaryColor}
                aria-label="채광"
                aria-describedby="반려 식물이 빛을 얼마나 받고 있는지"
                size={20}
              />
            </EnvironmentTitle>
            <InputWrapper $width="100%">
              <Select
                value={form.light}
                options={OPTIONS.light}
                onChange={setLight}
                placeholder="채광"
              />
            </InputWrapper>
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <SvgIcons
                icon="wind"
                color={primaryColor}
                aria-label="바람"
                aria-describedby="반려 식물이 통풍이 잘 되는 위치인지"
                size={20}
              />
            </EnvironmentTitle>
            <InputWrapper $width="100%">
              <Select
                value={form.wind}
                options={OPTIONS.wind}
                onChange={setWind}
                placeholder="통풍"
              />
            </InputWrapper>
          </EnvironmentItem>
        </Environment>
        <ButtonArea>
          <PrimaryButton type="submit" onClick={handleSubmitClick} disabled={!isValidForm(form)}>
            저장하기
          </PrimaryButton>
          <SecondaryButton type="button" role="link" onClick={() => navigate(-1)}>
            취소하기
          </SecondaryButton>
        </ButtonArea>
      </Content>
    </Wrapper>
  );
};

export default PetPlantEditForm;
