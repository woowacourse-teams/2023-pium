import { useState } from 'react';
import InlineRadio from 'components/@common/InlineRadio';
import { TagVariantType } from 'components/@common/Tag';
import DictInfo from 'components/dictionaryPlant/DictInfo';

interface DictInfoSwitchProps {
  title: string;
  optionMap: Record<string, string | string[]>;
  defaultSelected?: string;
  variant?: TagVariantType;
}

const DictInfoSwitch = (props: DictInfoSwitchProps) => {
  const { optionMap, title, defaultSelected, variant = 'default' } = props;
  const options = Object.keys(optionMap);

  const [selected, setSelected] = useState(defaultSelected ?? options[0]);

  const selectedOptions = optionMap[selected] ?? [];

  return (
    <DictInfo alignment="column" contentDirection="row" width="100%">
      <DictInfo.Title>
        {title}
        <InlineRadio name={title} value={selected} setValue={setSelected}>
          {options.map((optionName) => (
            <InlineRadio.Option key={optionName} value={optionName} />
          ))}
        </InlineRadio>
      </DictInfo.Title>

      {typeof selectedOptions === 'string' ? (
        <DictInfo.Content fullWidth={true} variant={variant}>
          {selectedOptions}
        </DictInfo.Content>
      ) : (
        selectedOptions.map((content) => (
          <DictInfo.Content key={content}>{content}</DictInfo.Content>
        ))
      )}
    </DictInfo>
  );
};

export default DictInfoSwitch;