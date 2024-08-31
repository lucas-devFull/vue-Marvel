<script setup>
import { defineProps } from "vue";
import image from "../assets/no-image.jpg";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  urlImage: {
    default: null,
  },
  extension: {
    default: "jpg",
  },
  id: {
    default: 0,
  },
});

const validImg = (url = null, extension = "jpg") => {
  if (url && typeof url == "string" && url.length > 0) {
    return url + "." + extension;
  }

  return image;
};
</script>

<template>
  <div
    class="w-96 h-96 m-2 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-customGray"
  >
    <div class="flex flex-col items-center">
      <img
        style="height: 21rem; width: 21rem"
        class="max-w-full min-w-full shadow-xl"
        :src="validImg(props.urlImage, props.extension)"
        :alt="props.title"
      />

      <span class="py-3"> {{ props.title }}</span>
    </div>
  </div>
</template>
