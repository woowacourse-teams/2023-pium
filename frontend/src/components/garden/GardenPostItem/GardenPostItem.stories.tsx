import type { GardenPostItem as GardenPostItemProps } from 'types/garden';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import GardenPostItem from '.';

const meta: Meta<typeof GardenPostItem> = {
  component: GardenPostItem,
};

export default meta;

type Story = StoryObj<typeof GardenPostItem>;

const defaultArgs: ComponentProps<typeof GardenPostItem> = {
  createdAt: '1999-12-16',
  content: '한달차인데 저는 이거 이렇게 키우고있어요',
  manageLevel: '초보자',
  petPlant: {
    imageUrl: 'https://images.unsplash.com/photo-1667342608690-828e1a839ead',
    nickname: '초퍼',
    location: '거실',
    flowerpot: '플라스틱/유리/캔',
    light: '창문 밖에서 해를 받아요',
    wind: '창문이 없지만 바람이 통해요',
    daySince: 32,
    waterCycle: 7,
  },
};

export const Default: Story = {
  args: defaultArgs,
};

export const LargeContent: Story = {
  args: {
    ...defaultArgs,
    content: `
      제가 LA에 있을때는 말이죠 정말 제가 꿈에 무대인 메이저리그로 진출해서 가는 식당마다 싸인해달라 기자들은 항상 붙어다니며 취재하고 제가 그 머~ 어~ 대통령이 된 기분이였어요 
      그런데 17일만에 17일만에 마이너리그로 떨어졌어요 못던져서 그만두고 그냥 확 한국으로 가버리고 싶었어요 
      그래서 집에 가는길에 그 맥주6개 달린거 있잖아요 맥주6개 그걸 사가지고 집으로 갔어요 
      그전에는 술먹으면 야구 못하는줄 알았어요 그냥 한국으로
    `,
    petPlant: {
      ...defaultArgs.petPlant,
      nickname: '박찬호의 길고길고길고길고길고길고길고긴 식물이름',
    },
  },
};
