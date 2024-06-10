<template>
  <div class="file-uploader">
    <input ref="inputRef" type="file" accept="video/mp4" @change="$emit('change', $event)"/>
    <div @click="handleClick">Upload a MP4 file</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// MP4 File Upload Component
export default defineComponent({
  name: 'FileUpload',
  emits: ['change'],
  setup() {
    const inputRef = ref<HTMLInputElement | null>(null);

    const handleClick = () => {
      if (inputRef.value) {
        inputRef.value.click();
      }
    };

    return { inputRef, handleClick, }
  },
});
</script>

<style lang="scss">
@import '../styles/_variables.scss';

.file-uploader {
  display: flex;
  justify-content: center;
  
  input {
    height: 0;
    width: 0;
  }

  div {
    padding: 16px 32px;
    background-color: $bg-info;
    color: $white-color;
    border-radius: 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 500px;
  }
}
</style>
