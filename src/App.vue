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
        <v-row v-if="error" justify="center">
          <v-card>
            <v-card-title class="error--text">
              Oops... Something went wrong :(
            </v-card-title>
            <v-card-text> Error message: {{ error }} </v-card-text>
          </v-card>
        </v-row>
      </v-container>
      <v-dialog
        ref="dialog"
        v-model="showDateRangePicker"
        persistent
        width="290px"
      >
        <v-date-picker v-model="customDateRange" scrollable range>
          <v-spacer />
          <v-btn text color="primary" @click="cancelCustomDateRange">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="confirmCustomDateRange">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
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
      showDateRangePicker: false,
      customDateRange: [],
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
    preparingCustomDateFilter() {
      return (
        this.dateFilter.from == '' &&
        this.dateFilter.to == '' &&
        !this.dateFilter.defaultForPracticeResults
      );
    },
    hasCustomFilter() {
      return (
        this.customDateRange.length == 2 &&
        this.dateFilter.from &&
        this.dateFilter.to
      );
    },
    defaultFilter() {
      return this.dateFilterOpts.find(
        (opt) => opt.defaultForPracticeResults
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
        this.dateFilter = this.defaultFilter;
        this.assessmentData = assessmentDataRes.data.results;
      })
      .catch((err) => (this.error = err.message));
  },
  methods: {
    handleDateFilterChange() {
      // negate here as it's likely (subjective) that the user will
      // filter with one of the defined ranges over a custom one
      if (!this.preparingCustomDateFilter) {
        axios
          .get(
            `result/practice?from=${this.dateFilter.from}&to=${this.dateFilter.to}`
          )
          .then((res) => {
            this.assessmentData = res.data.results;
          });
        if (this.hasCustomFilter) {
          // clear the custom filter parameters to preserve
          // integrity of data coming from server
          Object.assign(this.dateFilter, { from: '', to: '' });
          this.customDateRange = [];
        }
      } else {
        this.showDateRangePicker = true;
      }
    },
    cancelCustomDateRange() {
      this.customDateRange = [];
      this.showDateRangePicker = false;
      this.dateFilter = this.defaultFilter;
    },
    confirmCustomDateRange() {
      if (this.customDateRange.length != 2)
        // user didn't select a valid range
        this.cancelCustomDateRange();
      else {
        // have to enforce the order here as the first date
        // you select in v-date-picker is the from value, which means
        // you can end up with something like from: 2021-03-03 to: 2021-02-28
        const [from, to] = this.customDateRange.sort(
          (dateA, dateB) => new Date(dateA) - new Date(dateB)
        );
        Object.assign(this.dateFilter, { from, to });
        this.handleDateFilterChange();
        this.showDateRangePicker = false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.content-container {
  max-width: 65%;
}
</style>
