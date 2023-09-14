import { useState, Fragment } from 'react';
import InlineRadio from 'components/@common/InlineRadio';
import { TagVariantType } from 'components/@common/Tag';
import TagBox from 'components/dictionaryPlant/TagBox';
import { Padding } from './TagSwitch.style';

interface TagSwitchProps {
  title: string;
  optionMap: Record<string, string | string[]>;
  defaultSelected?: string;
  variant?: TagVariantType;
}

const TagSwitch = (props: TagSwitchProps) => {
  const { optionMap, title, defaultSelected, variant = 'default' } = props;
  const options = Object.keys(optionMap);

  const [selected, setSelected] = useState(defaultSelected ?? options[0]);

  const selectedOptions = optionMap[selected] ?? [];

  return (
    <TagBox alignment="column" contentDirection="row" width="100%">
      <TagBox.Title>
        {title}
        <InlineRadio name={title} value={selected} setValue={setSelected}>
          {options.map((optionName, index) => (
            <>
              {index > 0 && <span>|</span>}
              <Padding key={optionName}>
                <InlineRadio.Option value={optionName} />
              </Padding>
            </>
          ))}
        </InlineRadio>
      </TagBox.Title>

      {typeof selectedOptions === 'string' ? (
        <TagBox.Content fullWidth={true} variant={variant}>
          {selectedOptions}
        </TagBox.Content>
      ) : (
        selectedOptions.map((content) => <TagBox.Content key={content}>{content}</TagBox.Content>)
      )}
    </TagBox>
  );
};

export default TagSwitch;
