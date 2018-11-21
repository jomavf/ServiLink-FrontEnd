<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex>
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width = "7"
          :size = "70" 
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs8>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ service.title }}</h6>
          </v-card-title>
          <v-img
            :src="service.urlToImage"
            height="400px"
          ></v-img>
          <v-card-text>
            <div class="info--text">Posted {{ formatDate(service.date) }}</div>
            <v-flex xs12 >
            <div>{{ service.description }}</div>
            <h1 class="success--text" style="margin-right:20px"> ${{ service.price }}</h1>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn flat color="secondary">Book in</v-btn> -->
            
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3 ml-5>
        <v-card>
          <v-layout row wrap>
            <v-flex xs12 sm12 md12 align-center justify-center text-xs-center mt-4>
                <v-avatar
                  :size="192"
                  color="grey lighten-4"
                >
                  <img :src="userService.avatar" alt="avatar">
                </v-avatar>
            </v-flex>
          </v-layout>
          <v-card-title>
            <v-layout row>
              <v-flex text-xs-center>
                  <div>
                    <h3 class="headline mb-2">{{userService.firstname +" "+ userService.lastname}}</h3>
                    <div class="">{{userService.username}}</div>
                  </div>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-layout row>
              <v-flex text-xs-left ml-4>
                  <div>
                    <br>
                    <br>
                    <div class="customText"><span style="font-weight:bold">E-mail:</span> {{userService.mail}}</div>
                    <div class="customText"><span style="font-weight:bold">Age:</span> {{userService.age}}</div>
                    <div class="customText"><span style="font-weight:bold">Department:</span> incoming...</div>
                    <br>
                  </div>
              </v-flex>
            </v-layout>
          <v-card-actions>
          </v-card-actions>
        </v-card>
        <v-btn :to="'/register/'+service._id" color="primary" style="margin-left:15px;margin-top:10px;width:90%">Book in</v-btn>
      </v-flex>
      <v-flex xs8 mt-3>
        <v-card>
          <GoogleMapInfo :position="service.position"/>
        </v-card>
      </v-flex>
      <v-flex xs8 mt-3>
        <v-card>
          <div style="margin:20px"><h1>Commets</h1></div>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { parse, distanceInWords } from 'date-fns'
export default {
  props:['id'],
  computed: {
    service () {
      return this.$store.getters.loadedService(this.id)
    },
    loading(){
      return this.$store.getters.loading
    },
    userService(){
      return this.$store.getters.userService
    }
  },
  mounted(){
    this.getUserService(this.id)
  },
  methods:{
    getUserService(id){
      console.log(`the id ${id}`)
      this.$store.dispatch('getUserService',id)
    },
    formatDate(date) {
      return distanceInWords(parse(date), new Date());
    },
  }
}
</script>

<style scoped>
.customText {
  padding-top: 2px;
  padding-bottom: 2px
}
</style>
