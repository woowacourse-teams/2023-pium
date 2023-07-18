export const inputValidate = {
  checkNumber: (value: string) => {
    const regExp = /^[0-9]+$/;

    return regExp.test(value);
  },

  checkRange: (value: number, start: number, end: number) => {
    return value >= start && value <= end;
  },

  checkECode: (value: string) => ['e', 'E', '+', '-'].includes(value),
};
