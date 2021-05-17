<template>
  <div class="recipe-info">
    <banner
      text="Famas Pizza and Pasta"
      textDistribution="top"
      textVerticalAlignment="center"
      textHorizontalAlignment="right"
      :backgroundMedia="{
        src:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fMMHhajhpc6rMnfmBCwMgAHaE7%26pid%3DApi%26h%3D160&f=1',
        type: 'image',
      }"
    />
    <!-- "secret" formula exposed -->
    <section class="recipe-info__secret">
      <h4 class="recipe-info__secret-heading">Secret Formula</h4>
      <li class="recipe-info__secret-list recipe-info__secret-list--heading">
        <span>Ingredient</span>
        <span>Quantity</span>
      </li>
      <li v-for="(quantity, ingredient) in secretIngredients" :key="ingredient"
        class="recipe-info__secret-list">
        <span>{{ getIngredientEmoji(ingredient) }} {{ ingredient }}</span>
        <span>{{ quantity }}</span>
      </li>
    </section>

    <!-- exact quantities -->
  </div>
</template>

<style lang="scss">
@import "./RecipeInfo.scss";
</style>

<script>
import Banner from "../Banner/Banner.vue";
import RecipeMixin from "@/mixins/RecipeMixin";

export default {
  components: { Banner },
  name: "RecipeInfo",
  mixins: [RecipeMixin],
  computed: {
    mealCount: ({ meals = 0 }) => `${meals} Meal${meals > 1 ? "s" : ""}`,
  },
  methods: {},
};
</script>
