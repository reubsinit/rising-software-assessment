<template>
  <v-card :color="cardColor" :flat="level" :class="cardClassList">
    <v-row class="grey--text text--darken-2">
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
        <span>
          {{ questionText }}{{ hasTime ? `, ${timeText}` : '' }}
        </span>
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
      <v-col v-if="expanded" cols="12">
        <v-divider />
        <v-row no-gutters>
          <v-col
            v-for="(assessmentLevel, i) in assessment.levels"
            :key="i"
            cols="12"
          >
            <assessment-list-item
              :assessment="assessmentLevel"
              level
            />
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
    summary: {
      type: Boolean,
      required: false,
      default: false,
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
  computed: {
    cardColor() {
      return this.summary ? 'grey lighten-2' : 'white';
    },
    cardClassList() {
      return [
        'result-list-item',
        this.level ? 'pa-0 pt-4 ml-12' : 'pa-4',
      ];
    },
    hasTime() {
      return this.assessment.minutes > 0;
    },
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
