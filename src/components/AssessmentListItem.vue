<template>
  <v-card
    :flat="level"
    :class="['result-list-item', level ? 'pa-0 pt-4 ml-12' : 'pa-4']"
  >
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between py-1">
        <span class="text-h4">
          {{ assessment.topic || assessment.level }}
        </span>
        <div>
          <v-icon v-if="hasLevels" @click="expanded = !expanded">
            {{
              expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_left'
            }}
          </v-icon>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-space-between text-subtitle-1 py-1"
      >
        <span> {{ questionText }}, {{ timeText }} </span>
        <span>
          {{ assessment.marks }}/{{ assessment.maxMarks }}
        </span>
      </v-col>
      <v-col cols="12" class="py-1">
        <v-row no-gutters>
          <v-col class="d-flex align-center">
            <v-progress-linear
              :value="progressPercentage"
              height="10"
            />
          </v-col>
          <v-col
            cols="1"
            class="text-right text-h5 font-weight-medium"
          >
            <span> {{ progressPercentage }}% </span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-if="expanded">
        <v-divider />
        <v-row no-gutters>
          <v-col
            cols="12"
            v-for="(assessment, i) in assessment.levels"
            :key="i"
          >
            <assessment-list-item :assessment="assessment" level />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import pluralize from 'pluralize';

export default {
  // Must provide the name property for recursive components
  name: 'AssessmentListItem',
  props: {
    assessment: {
      type: Object,
      required: true,
    },
    level: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  // TODO: tidy these properties up
  computed: {
    progressPercentage() {
      return Math.floor(
        (this.assessment.marks / this.assessment.maxMarks) * 100
      );
    },
    questionText() {
      return `${this.assessment.questions} ${pluralize(
        'Question',
        this.assessment.questions
      )}`;
    },
    timeText() {
      let text = '';
      const hours = Math.floor(this.assessment.minutes / 60);
      const minutes = this.assessment.minutes % 60;

      if (hours > 0) {
        text += `${hours} ${pluralize('hour', hours)}`;
      }
      if (minutes > 0) {
        text += `${hours > 0 ? ' ' : ''}${minutes} ${pluralize(
          'minute',
          minutes
        )}`;
      }
      return text;
    },
    hasLevels() {
      return (
        Array.isArray(this.assessment.levels) &&
        this.assessment.levels.length > 0
      );
    },
  },
};
</script>

<style></style>
