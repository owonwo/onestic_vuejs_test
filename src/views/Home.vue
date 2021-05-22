<template>
  <div class="page page__home">
    <p>{{ welcomeMessage }}</p>
  </div>
</template>

<script>
import { formatDate } from "@/libs/date";

export default {
  name: "Home",
  data() {
    return {
      currentTime: formatDate(),
    };
  },
  computed: {
    welcomeMessage() {
      return "Welcome! Your local time is: " + this.currentTime;
    },
  },
  mounted() {
    const setTimer = () =>
      setTimeout(() => {
        this.currentTime = formatDate();
        setTimer();
      }, 1000);
    setTimer();
  },
};
</script>
