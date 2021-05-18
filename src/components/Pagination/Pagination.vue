<template>
  <div class="pagination">
    <div class="pagination__wrapper">
      <button
        v-for="a in renderFew"
        :key="a"
        class="pagination__list"
        :class="{ 'pagination__list--active': a === currentPage }"
        @click="$emit('change', a)"
      >
        {{ a }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@import "./Pagination.scss";
</style>

<script>
import concat from "lodash/concat";

export default {
  name: "Pagination",
  props: {
    pages: { type: Number },
    currentPage: { type: Number },
  },
  computed: {
    // renders less pagination button if pages are more than 10
    renderFew: (vm) => {
      const { pages } = vm.$props;
      if (pages <= 8) return vm.first(pages);

      if (!(pages > 8 * 2)) return concat(vm.first(pages), vm.last(pages - 8));

      return concat(vm.first(4), vm.last(4));
    },
  },
  methods: {
    first(n) {
      return Array(n)
        .fill(0)
        .map((_, idx) => idx + 1);
    },
    last(n) {
      return Array(n)
        .fill(0)
        .map((_, idx) => this.pages - idx)
        .reverse();
    },
  },
};
</script>
