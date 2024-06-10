<template>
  <div class="mdat">
    <span class="mdat-label">MDAT Content:</span>
    <span class="mdat-content">{{ content }}</span>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

// Component for displaying MDAT type content string
export default defineComponent({
  name: 'MDATContent',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
@import '../styles/_variables.scss';

.mdat {
  display: flex;
  font-weight: 500;
  font-weight: 500;
  color: $success-color;

  &-label {
    margin-right: 8px;
    color: $error-color;
    white-space: nowrap;
  }

  &-content {
    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
</style>
  