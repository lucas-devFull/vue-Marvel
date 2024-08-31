import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from "../services/api/ApiMarvel";

export const useMarvelStore = defineStore('useMarvelStore', () => {
  const characters = ref([]);
  const characterID = ref([]);
  const comics = ref([]);
  const series = ref([]);
  const total = ref(0);
  const offset = ref(0);
  const loading = ref(false);

  const getCharacters = async (pagination = false, term = '') => {
    let searchCharacter = '';

    if (!pagination) {
      offset.value = 0;
    }

    if (typeof term === 'string' && term.length > 0) {
      searchCharacter = `&nameStartsWith=${term}`;
    }

    if (total.value >= offset.value) {
      loading.value = true;
      try {
        const res = await api.get(`characters?limit=12&offset=${offset.value}${searchCharacter}`);

        if (res?.data?.data?.results && Array.isArray(res.data.data.results)) {
          if (pagination) {
            characters.value = [...characters.value, ...res.data.data.results];
          } else {
            characters.value = res.data.data.results;
          }

          offset.value = offset.value + 12;
          total.value = res.data.data.total;
          loading.value = false;
        }
      } catch (error) {
        loading.value = false;
        console.error('Erro ao buscar personagens:', error);
      } finally {
        loading.value = false;
      }
    }
  };

  const getCharacterById = async (id = 0) => {
    if (id > 0) {
      loading.value = true;
      try {
        const res = await api.get(`characters/${id}`);
        if (res?.data?.data?.results && Array.isArray(res.data.data.results)) {
          characterID.value = res.data.data.results;
        }
      } catch (error) {
        loading.value = false;
        console.error('Erro ao buscar personagens:', error);
      } finally {
        loading.value = false;
      }
    }
  };

  const getComics = async (id = 0) => {
    if (id > 0) {
      try {
        const res = await api.get(`characters/${id}/comics`);
        if (res?.data?.data?.results && Array.isArray(res.data.data.results)) {
          comics.value = res.data.data.results;
        }
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      }
    }
  };

  const getSeries = async (id = 0) => {
    if (id > 0) {
      try {
        const res = await api.get(`characters/${id}/series`);
        if (res?.data?.data?.results && Array.isArray(res.data.data.results)) {
          series.value = res.data.data.results;
        }
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      }
    }
  };

  return { total, characters, offset, loading, characterID, series, comics, getSeries, getComics, getCharacters, getCharacterById };

})
