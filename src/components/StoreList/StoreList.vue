<template>
  <div class="store-list">
    <h1>Our Restaurants</h1>
    <div class="search">
      <SearchIcon />
      <input
        type="text"
        class="search__input"
        :value="searchStr"
        @keyup.prevent="filterBySearch"
        placeholder="Search for a Store"
      />
    </div>
    <br />
    <p v-if="isSearch && searchList.length == 0">
      <i
        >Ooops! we couldn't find a store like <b>{{ searchStr }}</b></i
      >
    </p>
    <p v-else>
      Here you can find all of our restaurants. We have a total of
      <b>{{ storesCount }}</b> stores right now!
    </p>
    <div class="store-list__grid">
      <template v-if="!isSearch">
        <Store
          class="store-list__item"
          :title="store.name"
          :photo="store.image"
          :location="store.location"
          v-for="store in chunkedStores"
          :key="store.id"
        />
      </template>
      <Store
        v-else
        class="store-list__item"
        :title="store.name"
        :photo="store.image"
        :location="store.location"
        v-for="store in storeChunk(searchList)"
        :key="store.id"
      />
    </div>
    <Pagination
      v-if="pagesCount > 1"
      :current-page="page"
      :pages="pagesCount"
      @change="(newPage) => (page = newPage)"
    />
  </div>
</template>

<style lang="scss">
@import "./StoreList.scss";
</style>

<script>
import Store from "@/components/Store/Store";
import Pagination from "@/components/Pagination/Pagination";
import _ from "lodash";
import { SearchIcon } from "vue-feather-icons";

export default {
  name: "StoreList",
  components: {
    Store,
    SearchIcon,
    Pagination,
  },
  props: {
    stores: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      page: 1,
      searchStr: "",
      searchList: [],
      itemsPerPage: 100,
    };
  },
  computed: {
    isSearch: (vm) => vm.searchStr.trim().length > 0,
    storesWithImages() {
      return _.map(this.stores, function(store) {
        store["image"] = "https://via.placeholder.com/300?text=" + store.name;

        return store;
      });
    },
    storesCount() {
      return _.size(this.isSearch ? this.searchList : this.stores);
    },
    chunkedStores() {
      return this.storeChunk(this.storesWithImages);
    },
    pagesCount() {
      return Math.ceil(this.storesCount / this.itemsPerPage);
    },
  },
  methods: {
    storeChunk(list) {
      const { itemsPerPage, page } = this;
      const offset = (page - 1) * itemsPerPage + 1;
      return _.slice(list, offset - 1, offset + itemsPerPage);
    },
    filterBySearch: _.debounce(function({ target: { value } }) {
      this.searchStr = value.trim();

      if (value.length === 0) {
        this.searchList = [];
        return false;
      }

      this.searchList = this.storesWithImages.filter(({ name }) => {
        return name.toLowerCase().includes(this.searchStr.toLowerCase());
      });
    }, 1000),
  },
};
</script>
