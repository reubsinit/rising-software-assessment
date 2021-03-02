<template>
  <v-card
    :flat="level"
    :class="['result-list-item', level ? 'pa-0 ml-12' : 'pa-4']"
  >
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between">
        <span class="text-h4">
          {{ result.topic || result.level }}
        </span>
        <div>
          <v-icon v-if="hasLevels" @click="expanded = !expanded">
            {{
              expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_left'
            }}
          </v-icon>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex justify-space-between">
        <span> {{ questionText }}, {{ timeText }} </span>
        <span> {{ result.marks }}/{{ result.maxMarks }} </span>
      </v-col>
      <v-col cols="12">
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
            v-for="(result, i) in result.levels"
            :key="i"
          >
            <result-list-item :result="result" level />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import pluralize from 'pluralize';

export default {
  name: 'ResultListItem',
  props: {
    result: {
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
        (this.result.marks / this.result.maxMarks) * 100
      );
    },
    questionText() {
      return `${this.result.questions} ${pluralize(
        'Question',
        this.result.questions
      )}`;
    },
    timeText() {
      let text = '';
      const hours = Math.floor(this.result.time / 60);
      const minutes = this.result.time % 60;

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
        Array.isArray(this.result.levels) &&
        this.result.levels.length > 0
      );
    },
  },
};
</script>

<style></style>
