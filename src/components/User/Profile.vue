<template>
  <v-container fluid>
    <h1>Profile</h1>
    <v-layout row mt-4>
      <v-flex sm3 ml-3>
        <v-card>
          <v-layout row wrap>
            <v-flex xs12 sm12 md12 align-center justify-center text-xs-center mt-4>
                <v-avatar
                  :size="192"
                  color="grey lighten-4"
                >
                  <img :src="account.avatar" alt="avatar">
                </v-avatar>
            </v-flex>
          </v-layout>
          <v-card-title>
            <v-layout row>
              <v-flex text-xs-center>
                  <div>
                    <h3 class="headline mb-2">{{account.firstname +" "+ account.lastname}}</h3>
                    <div class="">{{account.username}}</div>
                  </div>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex sm9 ml-4>
        <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-tabs slider-color="primary">
                  <v-spacer></v-spacer>
                  <v-tab key="1">
                    <v-btn block flat large color="primary">
                    <v-icon>settings</v-icon>
                    Settings
                  </v-btn>
                  </v-tab>
                  <v-tab-item key="1">
                    <v-card-title>
                      <v-layout row wrap ml-3>
                        <v-flex xs12 md12 sm12>
                          <h3>First name</h3>
                          <v-text-field
                            :label=account.firstname
                            :value=account.firstname
                            outline
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 sm12>
                          <h3>Last name</h3>
                          <v-text-field
                            :label=account.lastname
                            :value=account.lastname
                            outline
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 sm12>
                          <h3>Mail</h3>
                          <v-text-field
                            :label=account.mail
                            :value=account.mail
                            outline
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 sm12>
                          <h3>Username</h3>
                          <v-text-field
                            :label=account.username
                            :value=account.username
                            outline
                          ></v-text-field>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-tab-item>
                  <v-spacer></v-spacer>
                  <v-tab key="2">
                    <v-btn block flat large color="primary">
                      <v-icon>view_agenda</v-icon>
                      Activity
                    </v-btn>
                  </v-tab>
                  <v-tab-item key="2">Activity</v-tab-item>
                  <v-spacer></v-spacer>
                  <v-tab key="3">
                    <v-btn block flat large color="primary">
                      <v-icon>hourglass_full</v-icon>
                      Timeline
                    </v-btn>
                  </v-tab>
                  <v-tab-item key="3">Timeline</v-tab-item>
                  <v-spacer></v-spacer>
                </v-tabs>
              </v-card>
            </v-flex>
          </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  mounted(){
    this.getMyAccount()
  },
  computed:{
    user(){
      return this.$store.getters.user
    },
    account(){
      return this.$store.getters.account
    }
  },
  methods:{
    getMyAccount(){
      this.$store.dispatch('getAccount')
    }
  }
}
</script>

