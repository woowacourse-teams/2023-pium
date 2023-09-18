import type {
  ChangeDateParams,
  ReminderExtendType,
  TodayStatus,
  WaterPlantParams,
} from 'types/reminder';
import { useContext } from 'react';
import { generatePath } from 'react-router-dom';
import DateInput from 'components/@common/DateInput';
import Image from 'components/@common/Image';
import {
  ActionBox,
  ContentBox,
  StatusBar,
  Wrapper,
  Alert,
  NickName,
  DictionaryPlantName,
  LinkContainer,
} from './Card.style';
import { ReminderContext } from 'contexts/reminderContext';
import useAddToast from 'hooks/useAddToast';
import {
  getDateToString,
  getParticularDateFromSpecificDay,
  getStringToDate,
  isDateFormat,
} from 'utils/date';
import { DateValidate } from 'utils/validate';
import { URL_PATH } from 'constants/index';

interface ReminderCardProps {
  data: ReminderExtendType;
}

const SUB_FIX = {
  today: '오늘이에요!',
  late: '일 지났어요🥺',
  future: '일 남았습니다!',
};

const convertSubFix = (status: TodayStatus) => SUB_FIX[status];

const ReminderCard = ({ data }: ReminderCardProps) => {
  const { petPlantId, status, image, nickName, dictionaryPlantName, dday, lastWaterDate } = data;
  const context = useContext(ReminderContext);
  const addToast = useAddToast();

  const today = getDateToString();
  const { isDateInRange } = DateValidate;

  const changeDateHandler = (changeDate: string) => {
    if (!isDateFormat(changeDate)) {
      addToast('error', '올바른 날짜 형식이 아니에요.');
      return;
    }

    const variables: ChangeDateParams = {
      id: petPlantId,
      body: {
        nextWaterDate: changeDate,
      },
    };

    context?.changeDateCallback(variables);
    return true;
  };
  const waterHandler = (waterDate: string) => {
    if (!isDateFormat(waterDate)) {
      addToast('error', '올바른 날짜 형식이 아니에요.');
      return;
    }

    const variables: WaterPlantParams = {
      id: petPlantId,
      body: {
        waterDate,
      },
    };

    context?.waterCallback(variables);
    return true;
  };

  const changeDateValidator = (changeDate: string) => {
    const tomorrow = getParticularDateFromSpecificDay(1);

    return isDateInRange({
      dateToCheck: getStringToDate(changeDate),
      startDate: getStringToDate(tomorrow),
    });
  };

  const waterDateValidator = (waterDate: string) =>
    isDateInRange({
      dateToCheck: getStringToDate(waterDate),
      startDate: getStringToDate(lastWaterDate),
      endDate: getStringToDate(today),
    });

  const alertMessage =
    status === 'today' ? convertSubFix(status) : `${Math.abs(dday)}${convertSubFix(status)}`;

  return (
    <Wrapper>
      <LinkContainer
        to={generatePath(URL_PATH.petDetail, { id: String(petPlantId) })}
        aria-label={`${nickName} 상세로 이동`}
      >
        <StatusBar status={status} />
        <Image src={image} size="64px" type="circle" alt={nickName} />
        <ContentBox role="list" tabIndex={0}>
          <NickName role="listitem" aria-label="반려 식물 닉네임">
            {nickName}
          </NickName>
          <DictionaryPlantName role="listitem" aria-label="반려 식물 사전 이름">
            {dictionaryPlantName}
          </DictionaryPlantName>
          <Alert status={status} role="listitem" aria-label="물을 줘야하는 날">
            {alertMessage}
          </Alert>
        </ContentBox>
      </LinkContainer>
      <ActionBox>
        <DateInput
          value=""
          changeCallback={waterHandler}
          validator={waterDateValidator}
          placeholder="물주기"
          min={lastWaterDate}
          max={today}
          aria-label="물 준 날짜 선택"
          $fontSize="1.2rem"
        />
        <DateInput
          value=""
          changeCallback={changeDateHandler}
          validator={changeDateValidator}
          placeholder={status === 'future' ? '날짜 변경' : '미루기'}
          min={today}
          aria-label="알림을 줄 날짜 선택"
          $fontSize="1.2rem"
        />
      </ActionBox>
    </Wrapper>
  );
};

export default ReminderCard;
