<template>
  <v-app>
    <v-main class="grey lighten-4">
      <v-container class="content-container mt-16" fluid>
        <v-row v-if="dataLoaded" justify="center">
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <v-row no-gutters justify="space-between">
                  <v-col cols="auto" class="d-flex align-center">
                    <span class="text-h4"> Practice Results </span>
                  </v-col>
                  <v-col cols="3" class="d-flex align-center">
                    <v-select
                      v-model="dateFilter"
                      append-outer-icon="date_range"
                      label="Filter by date"
                      :items="dateFilterOpts"
                      item-text="name"
                      return-object
                      @change="handleDateFilterChange"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <assessment-list :assessments="assessmentData" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import AssessmentList from '@/components/AssessmentList';

export default {
  name: 'App',
  components: { AssessmentList },
  data() {
    return {
      dateFilterOpts: null,
      dateFilter: null,
      assessmentData: null,
      error: null,
    };
  },
  computed: {
    dataLoaded() {
      return (
        this.dateFilterOpts != null && this.assessmentData != null
      );
    },
  },
  created() {
    Promise.all([
      axios.get('dateranges'),
      axios.get('result/practice'),
    ])
      .then((responses) => {
        const [dateFilterOptsRes, assessmentDataRes] = responses;
        this.dateFilterOpts = dateFilterOptsRes.data;
        this.dateFilter = this.dateFilterOpts.find(
          (opt) => opt.defaultForPracticeResults
        );
        this.assessmentData = assessmentDataRes.data.results;
      })
      .catch((err) => (this.error = err.message));
  },
  methods: {
    handleDateFilterChange() {
      axios
        .get(
          `result/practice?from=${this.dateFilter.from}&to=${this.dateFilter.to}`
        )
        .then((res) => {
          this.assessmentData = res.data.results;
        });
    },
  },
};
</script>
<style scoped lang="scss">
.content-container {
  max-width: 65%;
}
</style>
