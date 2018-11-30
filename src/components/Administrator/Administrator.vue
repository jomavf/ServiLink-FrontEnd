<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Table of Categories</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Category</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Insert new category</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="name" label="Insert a category name"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-container>
      <v-layout xs12 md8>
        <v-flex>

    <v-data-table 
      :headers="headers"
      :items="categories"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>



<script>
export default {
  data(){
    return {
      dialog: false,
      name: null,
      headers: [
          {
            text: 'Category',
            align: 'left',
            sortable: false,
            value: 'name'
          }
      ],
    }
  },
  mounted(){
    this.setCategories()
  },
  methods:{
    setCategories(){
      this.$store.dispatch('getCategories')
    },
    deleteItem (item) {
        const index = this.categories.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.categories.splice(index, 1)
    },
    close () {
      this.dialog = false
    },
    save () {
      if (this.name) {
        this.$store.dispatch('postCategories',this.name)
      }
      this.name = null
      this.close()
    }
  },
  watch:{
    dialog (val) {
        val || this.close()
    }
  },
  computed:{
    categories () {
      return this.$store.getters.categories
    },
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  }
}
</script>

<style scoped>

</style>
