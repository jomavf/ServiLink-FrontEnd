<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm3 md3>
        <v-navigation-drawer height="400px" permanent>
          <v-toolbar color="info" dark flat>
            <v-toolbar-title>Filters</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-group
              v-for="item in items"
              v-model="item.active"
              :key="item.title"
              :prepend-icon="item.action"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile
                v-for="subItem in item.items"
                :key="subItem.title"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>{{ subItem.action }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list>
      </v-navigation-drawer>
      </v-flex>
      <v-flex xs12 sm9 md9>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm4 mb-4 v-for="service in services" :key="service._id">
              <v-card>
                <v-img
                  :src="service.urlToImage"
                  aspect-ratio="1.5"
                ></v-img>
                <v-card-title primary-title>
                  
                  <v-layout row wrap>
                    <v-flex xs12 class="text-xs-right">
                      <span class="grey--text .caption">{{formatDate(service.date)}} ago</span>
                    </v-flex>
                    <v-flex xs12>
                      <div class="headline mb-0">{{service.title}}</div>
                      <span class="grey--text">{{service.username}}</span>
                      <h2>${{service.price}}</h2>
                    </v-flex>
                    
                  </v-layout>
                </v-card-title>
              
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :to="'/services/'+service._id" flat color="secondary">Explore</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
import { parse, distanceInWords } from 'date-fns'
export default {
  data () {
      return {
        items: [
          {
            action: 'local_activity',
            title: 'Categories',
            items: [
              { title: 'Category1' },
              { title: 'Category2' },
              { title: 'Category3' },
              { title: 'Category4' }
            ]
          },
          {
            action: 'restaurant',
            title: 'Price',
            active: true,
            items: [
              { title: '$ 0 - $ 100' },
              { title: '$ 101 - $500' },
              { title: '$500 - ' }
            ]
          }
        ]
      }
    },
  computed: {
    services () {
      return this.$store.getters.loadedServices
    },
    loading() {
        return this.$store.getters.loading
    },
  },
  methods: {
      onLoadService (id) {
        return this.$router.push('/services/' + id)
      },
      formatDate(date) {
        return distanceInWords(parse(date), new Date());
      }
  }
}
</script>


<style scoped>

</style>
