<template>
  <v-row>
    <v-col cols="12">
      <assessment-list-item :assessment="overallScore" />
    </v-col>
    <v-col v-for="(assessment, i) in assessments" :key="i" cols="12">
      <assessment-list-item :assessment="assessment" />
    </v-col>
  </v-row>
</template>

<script>
import AssessmentListItem from './AssessmentListItem';
export default {
  components: { AssessmentListItem },
  props: {
    assessments: {
      type: Array,
      required: true,
    },
  },
  computed: {
    overallScore() {
      let result = this.assessments.reduce(
        (acc, curr) => {
          acc.questions += curr.questions;
          acc.minutes += curr.minutes;
          acc.marks += curr.marks;
          acc.maxMarks += curr.maxMarks;
          return acc;
        },
        { questions: 0, minutes: 0, marks: 0, maxMarks: 0 }
      );
      result.topic = 'Overall Score';
      return result;
    },
  },
};
</script>
