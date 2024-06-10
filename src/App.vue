<template>
  <main>
    <h1 class="text-center">MP4 Box Parser</h1>
    <FileUpload @change="onFileChange"/>
    <div class="content">
      <template v-if="status === 'loading'">
        <LoadingIndicator />
      </template>
      <template v-else-if="boxes.length">
        <div v-for="box in boxes" :key="box.offset" class="box-list">
          <Box :box="box" :mdatContent="mdatContent" />
        </div>
      </template>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { parseMp4 } from './utils';
import Box from "./components/Box.vue";
import LoadingIndicator from './components/LoadingIndicator.vue';
import FileUpload from './components/FileUpload.vue';

export default defineComponent({
  name: 'App',
  components: {
    Box,
    FileUpload,
    LoadingIndicator,
  },
  setup() {
    const boxes = ref<Array<{ type: string; size: number; offset: number }>>([]);
    const mdatContent = ref<string | null>(null);
    const status = ref<string>('');

    const onFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files?.length) {
        // Update status to 'loading'
        status.value = 'loading';
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = async () => {
          status.value = 'loaded'; // Update status to 'loaded' when the file is loaded
          if (reader.result instanceof ArrayBuffer) {
            // Parse the MP4 content and await the result and update values for boxes and mdatContent based on parsed result
            const { boxes: parsedBoxes, mdat } = await parseMp4(reader.result);
            boxes.value = parsedBoxes;
            mdatContent.value = mdat ? new TextDecoder().decode(mdat) : null;
          }
        };
        reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
      }
    };

    return { boxes, status, mdatContent, onFileChange };
  }
});
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}

.content {
  padding: 32px 0;
}

</style>
