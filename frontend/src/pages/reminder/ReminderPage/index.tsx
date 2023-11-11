import { PrimaryButton } from 'components/@common/Confirm/Confirm.style';
import ContentHeader from 'components/@common/ContentHeader';
import InstallPrompt from 'components/@common/InstallPrompt';
import PageLogger from 'components/@common/PageLogger';
import MonthBox from 'components/reminder/MonthBox';
import { ContentBox, NoDataContainer, Register, Title, Main } from './ReminderPage.style';
import ReminderProvider from 'contexts/reminderContext';
import { URL_PATH } from 'constants/index';
import PiumiEmotionlessPng from 'assets/piumi-emotionless.png';
import PiumiEmotionlessWebp from 'assets/piumi-emotionless.webp';
import useReminderHooks from '../../../hooks/reminder/useReminderHooks';

const ReminderPage = () => {
  const { reminderData, water, changeDate } = useReminderHooks();

  const reminderBox = reminderData.data.map(([month, reminders]) => {
    return <MonthBox key={JSON.stringify(reminders[0])} month={month} reminderDates={reminders} />;
  });

  return (
    <PageLogger>
      <InstallPrompt />
      <ReminderProvider waterCallback={water} changeDateCallback={changeDate}>
        <Main status={reminderData.status}>
          <ContentHeader title="리마인더" />
          {reminderBox.length === 0 ? (
            <NoDataContainer>
              <picture>
                <source srcSet={PiumiEmotionlessWebp} type="image/webp" />
                <img
                  width={250}
                  height={250}
                  src={PiumiEmotionlessPng}
                  alt="감정 없는 피우미"
                  aria-hidden
                />
              </picture>
              <Title>아직 등록된 식물이 없습니다!</Title>
              <Register to={URL_PATH.petRegisterSearch}>
                <PrimaryButton>식물 등록하러 가기</PrimaryButton>
              </Register>
            </NoDataContainer>
          ) : (
            <ContentBox>{reminderBox}</ContentBox>
          )}
        </Main>
      </ReminderProvider>
    </PageLogger>
  );
};

export default ReminderPage;
