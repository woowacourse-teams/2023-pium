export const InputValidate = {
  /**
   * 값이 0~9로만 이루어진 숫자인지 확인합니다.
   * @param value 문자열 형태로 된 숫자
   * @returns 아라비아 숫자로만 이루어져 있으면 `true`
   */
  checkNumber: (value: string) => {
    const regExp = /^[0-9]+$/;

    return regExp.test(value);
  },

  /**
   * 입력받은 값이 범위 내에 있는지 확인하는 메서드
   * @param value 문자열 형태로 된 숫자
   * @param start 가능한 `value`의 최솟값
   * @param end 가능한 `value`의 최댓값
   * @returns 닫힌 구간 내에 있으면 `true`
   */
  checkRange: (value: number, start?: number, end?: number) => {
    if (start && end) {
      return value >= start && value <= end;
    }

    if (start && !end) {
      return value >= start;
    }

    if (!start && end) {
      return value <= end;
    }

    return true;
  },

  /**
   * (number input에서) 순수한 숫자 외에 다른 값들이 들어가 있는지 확인합니다.
   * @param value 문자열 형태로 된 숫자
   * @returns 'e', 'E', '+', '-', '.'가 없으면 `true`
   */
  checkECode: (value: string) => ['e', 'E', '+', '-', '.'].includes(value),
};

interface DateInRange {
  /** 날짜 체크를 하는 date */
  dateToCheck: Date;
  /** 미니멈 date */
  startDate?: Date | null;
  /** 맥시멈 date */
  endDate?: Date | null;
}

export const DateValidate = {
  isDateInRange: ({ dateToCheck, startDate, endDate }: DateInRange) => {
    const dateToCheckTime = dateToCheck.getTime();
    if (startDate && endDate) {
      return dateToCheckTime >= startDate.getTime() && dateToCheckTime <= endDate.getTime();
    }

    if (endDate && !startDate) {
      return dateToCheckTime <= endDate.getTime();
    }

    if (startDate && !endDate) {
      return dateToCheckTime >= startDate.getTime();
    }

    return true;
  },
};
