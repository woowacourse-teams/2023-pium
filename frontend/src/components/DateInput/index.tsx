interface DateInputProps {
  placeholder: string;
}

const DateInput = ({ placeholder }: DateInputProps) => {
  return (
    <div>
      <label>{placeholder}</label>
      <input type="date" />
    </div>
  );
};

export default DateInput;
