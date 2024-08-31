<script setup>
import CardView from "@/components/CardView.vue";
import { useMarvelStore } from "@/stores/useMarvelStore"; // Importa a store corretamente
import { onMounted, ref } from "vue";

const marvelStore = useMarvelStore();
const serchValue = ref("");
let typingTimer;
var doneTypingInterval = 1000;

onMounted(() => {
  marvelStore.getCharacters();
});

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const validateScroll = debounce((el) => {
  if (el && el?.target && typeof el.target === "object") {
    const elemento = el.target;
    const scrollableHeight = elemento.scrollHeight;
    const scrollPosition = elemento.scrollTop + elemento.clientHeight;

    if (scrollableHeight <= scrollPosition) {
      console.log("aquyi");
      marvelStore.getCharacters(true, serchValue.value);
    }
  }
}, 200);

const getByTerm = (term = "") => {
  clearTimeout(typingTimer);

  if (typeof term == "string") {
    if (term.length > 0) {
      typingTimer = setTimeout(() => {
        serchValue.value = term;
        marvelStore.getCharacters(false, term);
      }, doneTypingInterval);
    } else {
      serchValue.value = "";
      marvelStore.getCharacters(false);
    }
  }
};
</script>

<template>
  <main class="w-full h-screen bg-gray-300 flex flex-col items-center">
    <nav class="w-full bg-customGray p-4">
      <div class="px-2 sm:px-6 lg:px-8 flex items-center">
        <div class="">
          <RouterLink to="/">
            <img
              class="h-8 w-auto"
              src="../assets/brand.gif"
              alt="Marvel Comics"
            />
          </RouterLink>
        </div>

        <div class="w-full mx-auto flex justify-center">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative" style="width: 50rem">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Pesquise seu personagem, escreva no minimo 3 letras"
              @keyup="(element) => getByTerm(element.target.value)"
            />
          </div>
        </div>
      </div>
    </nav>

    <div class="w-full bg-transparent">
      <div
        class="mx-32 flex flex-row items-center flex-wrap mt-5 rounded-lg w-auto overflow-y-auto text-white"
        v-on:scroll="(el) => validateScroll(el)"
        :style="{
          'max-height': '53rem',
          'scrollbar-color': '#101010 #2f2f2f',
          'scrollbar-width': 'thin',
        }"
      >
        <div v-for="character in marvelStore.characters" :key="character.id">
          <CardView
            :title="character.name"
            :urlImage="character?.thumbnail?.path"
            :extension="character?.thumbnail?.extension"
            :id="character.id"
          />
        </div>
      </div>
      <div class="text-center p-1 text-white" v-if="marvelStore.loading">
        Carregando...
      </div>
    </div>
  </main>
</template>
