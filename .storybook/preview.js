import Vue from 'vue';
import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetify.js';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

Vue.use(Vuetify);

const vuetify = new Vuetify(vuetifyConfig);

export const parameters = {
  viewport: {
    viewports: { ...INITIAL_VIEWPORTS, ...vuetifyViewports },
  },
};

export const decorators = [
  () => ({
    vuetify,
    template: `
      <v-app>
        <div class="my-auto">
            <story />
        </div>
      </v-app>
    `,
  }),
];

const vuetifyViewports = {
  VuetifyXs: {
    name: 'Vuetify xs',
    styles: {
      width: `${getBreakpointThreshold('xs')}px`,
      height: '100%',
    },
    type: 'mobile',
  },
  VuetifySm: {
    name: 'Vuetify sm',
    styles: {
      width: `${getBreakpointThreshold('sm')}px`,
      height: '100%',
    },
    type: 'mobile',
  },
  VuetifyMd: {
    name: 'Vuetify md',
    styles: {
      width: `${getBreakpointThreshold('md')}px`,
      height: '100%',
    },
    type: 'desktop',
  },
  VuetifyLg: {
    name: 'Vuetify lg',
    styles: {
      width: `${getBreakpointThreshold('lg')}px`,
      height: '100%',
    },
    type: 'desktop',
  },
};

function getBreakpointThreshold(breakpoint) {
  const breakpointService = vuetify.preset.breakpoint;
  const threshold = breakpointService.thresholds[breakpoint];
  return ['md', 'lg'].includes(breakpoint)
    ? threshold - breakpointService.scrollBarWidth
    : threshold;
}
