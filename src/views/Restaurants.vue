<template>
  <div class="page page__stores">
    <p>{{ welcomeMessage }}</p>
    <div class="pages__stores-list">
      <StoreList :stores="stores" />
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/libs/date";
import StoreList from '@/components/StoreList/StoreList';

const getStores = () => import(/* webpackChunkName: "static-restua-data" */ '@/assets/stores/stores.json');

export default {
  name: 'Stores',
  components: {
    StoreList
  },
  data () {
    return {
      currentTime: formatDate(),
      stores: []
    }
  },
  computed: {
    welcomeMessage () {
      return 'Welcome to our restaurants list! Your local time is: ' + this.currentTime;
    }
  },
  beforeCreate() {
    getStores().then(list => {
      this.stores = Object.values(list);
    });
  },
  mounted() {
    const setTimer = () => setTimeout(() => {
      this.currentTime = formatDate()
      setTimer();
    }, 1000);
    setTimer();
  }
}
</script>
