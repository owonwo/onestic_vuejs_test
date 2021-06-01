<template>
  <div v-show="jokeText" class="joke-container">
    <span class="joke-caption">Today's Joke:</span>
    <p class="joke-paragraph">"{{ jokeText.trim() }}"</p>
  </div>
</template>

<style lang="scss" scoped>
.joke {
  &-container {
    padding: 1.5rem;
    margin-top: 1.5rem;
    border-radius: 1rem;
    background-color: var(--color-trans-blue);
  }

  &-caption {
    font-variant: small-caps;
  }

  &-paragraph {
      font-style: italic;
      font-weight: bold;
      font-size: 1.3rem;
  }
}
</style>

<script>
import { isToday, parseISO, formatISO } from "date-fns";

export default {
  name: "JokeOfTheDay",
  mounted() {
    if (this.hasJoke()) {
      this.useSavedJoke();
    } else {
      fetch("https://api.jokes.one/jod?category=knock-knock")
        .then((res) => res.json())
        .then(this.useFirstJoke)
        .catch(() => {});
    }
  },
  data: () => ({
    jokeText: "",
  }),
  methods: {
    useFirstJoke(res) {
      const jokes = res?.contents?.jokes || [{}];
      const joke = jokes[0];

      this.jokeText = joke?.joke?.text;
      this.saveJoke(this.jokeText);
    },
    // persists the joke to localStorage with a key
    saveJoke(text) {
      if (text)
        localStorage.setItem(
          "JOKE",
          JSON.stringify({
            text,
            lastUpdated: formatISO(new Date()),
          })
        );
    },
    // checks if the persisted joke is today's joke.
    hasJoke() {
      try {
        const joke = JSON.parse(localStorage.getItem("JOKE"));
        return isToday(parseISO(joke.lastUpdated));
      } catch (err) {
        return false;
      }
    },
    useSavedJoke() {
      try {
        const payload = JSON.parse(localStorage.getItem("JOKE"));
        this.jokeText = payload.text;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
