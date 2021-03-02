import AssessmentListItem from './AssessmentListItem';
import { assessments } from '@/mocks/data';

export default {
  title: 'AssessmentListItem',
};

const Template = (args, { argTypes }) => ({
  components: { AssessmentListItem },
  props: Object.keys(argTypes),
  template: `<assessment-list-item :assessment="assessment" />`,
});

export const Default = Template.bind({});
Default.args = {
  assessment: assessments[0],
};
