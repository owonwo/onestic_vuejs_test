export default {
  data() {
    return {
      secretIngredients: {
        pasta: 500,
        bacon: 200,
        eggs: 1,
        milk: 200,
        butter: 500,
        oil: 100,
      },
    };
  },
  methods: {
    getIngredientEmoji(ingredient = "") {
      const emojiIngredientMap = {
        eggs: "🥚",
        pasta: "🍝",
        butter: "🧈",
        milk: "🥛",
        oil: "💧",
        bacon: "🥓",
      };

      if (!ingredient) return "";

      return emojiIngredientMap[ingredient.toLowerCase()];
    },
  },
};
