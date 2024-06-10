<template>
  <div class="box">
    <div class="box-content">
      <div>Box Type: <span class="box-type">{{ box.type }},</span></div>
      <div>Box Size: <span>{{ box.size }}</span></div>
    </div>
    <template v-if="box.children">
      <div v-for="child in box.children" :key="child.offset" class="box-list">
        <Box :box="child" />
      </div>
    </template>
    <MDATContent v-if="box.type === 'mdat' && mdatContent" :content="mdatContent" />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import MDATContent from './MDATContent.vue';
import { Box } from '../types';

// Box Component: to display box type and size
export default defineComponent({
  name: 'Box',
  components: {
    MDATContent,
  },
  props: {
    box: {
      type: Object as PropType<Box>,
      required: true,
    },
    mdatContent: {
      type: [String, null] as PropType<string | null>,
      required: false,
      default: null,
    }
  }
});
</script>

<style lang="scss">
@import '../styles/_variables.scss';

.box {
  color: $error-color;
  font-weight: 500;

  &-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    margin: 8px 0;
  }

  &-list {
    margin-left: 16px;
  }

  &-type {
    color: $success-color;
    text-transform: uppercase;
  }
}
</style>
