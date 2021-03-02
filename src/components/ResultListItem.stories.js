import ResultListItem from './ResultListItem';
import { results } from '@/mocks/data';

export default {
  title: 'ResultListItem',
};

const Template = (args, { argTypes }) => ({
  components: { ResultListItem },
  props: Object.keys(argTypes),
  template: `<result-list-item :result="result" />`,
});

export const Default = Template.bind({});
Default.args = {
  result: results[0],
};
