<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 class="text-xs-center text-sm-center">
        <v-btn large router to="/services" class="info">Explore Services</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="service in services"
            :src="service.urlToImage"
            :key="service.id"
            @click="onLoadService(service._id)">
            <div class="title">
              {{ service.description }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p>Consume our services easyly!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    services() {
      return this.$store.getters.featuredServices
    },
    loading() {
      return this.$store.getters.loading
    },
  },
  methods: {
    onLoadService (id) {
      return this.$router.push('/services/' + id)
    }
  }
}
</script>


<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
    left: 30%;
    right: 30%;
    text-align: center;
  }
</style>
