export const inputValidate = {
  // 입력 값이 0~9인지 확인하는 메서드
  checkNumber: (value: string) => {
    const regExp = /^[0-9]+$/;

    return regExp.test(value);
  },

  // 입력받은 값이 범위 내에 있는지 확인하는 메서드
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

  // 숫자외에 다른 값들이 들어가있는지 확인하는 메서드
  checkECode: (value: string) => ['e', 'E', '+', '-', '.'].includes(value),
};
