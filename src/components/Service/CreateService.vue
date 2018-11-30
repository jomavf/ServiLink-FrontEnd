<template>
  <v-container mt-5>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 v-if="!loading">Create a new service</h1>
        <h1 v-if="loading">Creating a new service</h1>
        <div v-if ="loading"><img src='../../assets/pacman_loading.svg' /></div>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!loading">
      <v-flex xs12>
        <form @submit.prevent="onCreateService">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                v-model="imageUrl"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="price"
                label="Price"
                id="price"
                v-model="price"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                v-model="mCategory"
                :items="categories"
                label="Select a category"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>
          
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <GoogleMapGetLocation :position="position"/>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit"
                >Create service</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        position:{lat:-12,lng:-77},
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        image: null,
        mCategory: null,
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      },
      categories () {
        return this.$store.getters.categories
      },
    },
    mounted(){
      this.setCategories()
    },
    methods: {
      setCategories(){
        this.$store.dispatch('getCategories')
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      onCreateService () {
        if (!this.formIsValid) {
          return
        }
        if (!this.imageUrl) {
          return
        }
        if(isNaN(this.price)){
          return
        }
        if(Number(this.price)<=0){
          return
        }
        const serviceData = {
          title: this.title,
          description: this.description,
          price:this.price,
          urlToImage: this.image,
          imageHttp:this.imageUrl,
          position: this.position,
          category: this.mCategory
        }
        this.$store.dispatch('createService', serviceData)
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        console.log(files[0])
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>
