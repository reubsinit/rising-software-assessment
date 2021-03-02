<template>
  <v-card v-bind="$attrs">
    <v-card-title>
      <v-row no-gutters justify="space-between">
        <v-col cols="auto">
          {{ result.topic || result.level }}
        </v-col>
        <v-col v-if="hasLevels" cols="auto">
          <v-icon @click="expanded = !expanded">
            {{
              expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_left'
            }}
          </v-icon>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle class="pb-0">
      <v-row no-gutters justify="space-between">
        <v-col cols="auto">
          {{ questionText }}, {{ timeText }}
        </v-col>
        <v-col cols="auto">
          {{ result.marks }}/{{ result.maxMarks }}
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-text class="pt-0">
      <v-row no-gutters>
        <v-col class="d-flex align-center">
          <v-progress-linear
            :value="progressPercentage"
            height="10"
          ></v-progress-linear>
        </v-col>
        <v-col cols="1" class="text-right text-h6">
          {{ progressPercentage }}%
        </v-col>
      </v-row>
      <v-row no-gutters v-if="expanded">
        <v-col
          cols="12"
          v-for="(result, i) in result.levels"
          :key="i"
        >
          <result-list-item
            :result="result"
            flat
            class="ml-4 mr-n4"
          />
        </v-col>
      </v-row>
    </v-card-text>
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
