<template>
  <div class="recipe-form">
    <p>
      Introduce below the quantity for each ingredient you have and we will
      calculate how many Pasta Carbonara meals you can cook!
    </p>
    <form class="recipe-form__form">
      <label for="recipe-eggs">🥚 Eggs</label>
      <input
        class="recipe-form__form-input"
        min="0"
        type="number"
        name="eggs"
        id="recipe-eggs"
        v-model="form.eggs"
      />
      <label for="recipe-pasta">🍝 Pasta</label>
      <input
        class="recipe-form__form-input"
        min="0"
        type="number"
        name="pasta"
        id="recipe-pasta"
        v-model="form.pasta"
      />
      <label for="recipe-butter">🧈 Butter</label>
      <input
        class="recipe-form__form-input"
        min="0"
        type="number"
        name="butter"
        id="recipe-butter"
        v-model="form.butter"
      />
      <label for="recipe-milk">🥛 Milk</label>
      <input
        class="recipe-form__form-input"
        min="0"
        type="number"
        name="milk"
        id="recipe-milk"
        v-model="form.milk"
      />
      <label for="recipe-oil">💧 Oil</label>
      <input
        class="recipe-form__form-input"
        min="0"
        type="number"
        name="oil"
        id="recipe-oil"
        v-model="form.oil"
      />
      <label for="recipe-bacon">🥓 Bacon</label>
      <input
        class="recipe-form__form-input"
        min="0"
        type="number"
        name="bacon"
        id="recipe-bacon"
        v-model="form.bacon"
      />
      <p v-show="calculated" class="recipe-form__total-meals">
        {{ mealCount }}
      </p>
      <button type="submit" class="recipe-form__form-btn" @click="calculate">
        Calculate
      </button>
    </form>
  </div>
</template>

<style lang="scss">
@import "./RecipeForm.scss";
</style>

<script>
import RecipeMixin from '@/mixins/RecipeMixin';

export default {
  name: "RecipeForm",
  mixins: [RecipeMixin],
  data() {
    return {
      meals: 0,
      calculated: false,
      form: {
        eggs: "0",
        pasta: "0",
        butter: "0",
        milk: "0",
        oil: "0",
        bacon: "0",
      },
    };
  },
  props: {
    ingredients: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    mealCount: ({ meals = 0 }) => `${meals} meal${meals > 1 ? "s" : ""}`,
  },
  methods: {
    calculate(event) {
      event.preventDefault();
      const entries = Object.entries(this.ingredients);
      const ingredCounts = entries.map(([key, value]) => ({
        ingredient: key,
        count: value,
        usageCount: +this.form[key] / value,
      }));
      const minimumMeals = Math.min(...ingredCounts.map((e) => e.usageCount));
      this.meals = Math.floor(minimumMeals);
      this.calculated = true;

      setTimeout(() => {
        this.$router.push({
          name: "RecipeInfo",
          query: this.form
        });
      }, 2000);
    },
  },
};
</script>
