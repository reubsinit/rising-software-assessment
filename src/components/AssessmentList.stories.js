import AssessmentList from './AssessmentList';
import { assessments } from '@/mocks/data';

export default {
  title: 'AssessmentList',
};

const Template = (args, { argTypes }) => ({
  components: { AssessmentList },
  props: Object.keys(argTypes),
  template: `<assessment-list :assessments="assessments" />`,
});

export const Default = Template.bind({});
Default.args = {
  assessments,
};
