import { useState } from 'react';
import DictInfo from '../DictInfo';
import InlineRadio from '../InlineRadio';

interface DictInfoSwitchProps {
  title: string;
  optionMap: Record<string, string | string[]>;
  defaultSelected?: string;
}

const DictInfoSwitch = (props: DictInfoSwitchProps) => {
  const { optionMap, title, defaultSelected } = props;

  const [selected, setSelected] = useState(defaultSelected ?? Object.keys(optionMap)[0]);

  const selectedOptions = optionMap[selected] ?? [];

  return (
    <DictInfo alignment="column" contentDirection="row">
      <DictInfo.Title>
        {title}
        <InlineRadio name={title} value={selected} setValue={setSelected}>
          {Object.keys(optionMap).map((optionName) => (
            <InlineRadio.Option key={optionName} value={optionName} />
          ))}
        </InlineRadio>
      </DictInfo.Title>

      {typeof selectedOptions === 'string' ? (
        <DictInfo.Content>{selectedOptions}</DictInfo.Content>
      ) : (
        selectedOptions.map((content) => (
          <DictInfo.Content key={content}>{content}</DictInfo.Content>
        ))
      )}
    </DictInfo>
  );
};

export default DictInfoSwitch;
