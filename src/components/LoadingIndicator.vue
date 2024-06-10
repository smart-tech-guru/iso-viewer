<template>
  <div class="loading-indicator">
    <div class="spinner"></div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

// Loading Indicator Component
export default defineComponent({
  name: 'LoadingIndicator',
});
</script>
  
<style lang="scss">
@import '../styles/_variables.scss';

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    border: 4px solid rgba($primary-color, 0.1);
    border-left-color: $info-color;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
  