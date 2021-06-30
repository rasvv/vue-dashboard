<template>
  <v-dialog
    v-model="dialog"
    width="400px"
  >
    <v-card>
        <v-card-title>
          <span class="text-h5">Новая категория</span>
        </v-card-title>

      <v-card-text>
      <v-row>
        <v-text-field
          label='Новая категория'
          v-model='newcategory'
          hide-details='auto'
        ></v-text-field>
      </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          Отменить
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click='addcategory'
        > Добавить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      newcategory: '',
      address: '',
      haveCategory: false,
      dialog: true
    }
  },
  computed: {
    ...mapGetters([
      'getCategoryList'
    ])
  },
  methods: {
    ...mapActions([
      'addCategoryData'
    ]),
    close () {
      this.$modal.close('CategoryForm')
    },
    addcategory () {
      this.addCategoryData(this.newcategory)
      this.onGetCategory()
      this.close()
    },
    onGetCategory () {
      this.categories = this.getCategoryList
    },
    checkCategory () {
      this.haveCategory = false
      this.categories.forEach((item) => {
        if (item === this.category) { this.haveCategory = true }
      })
    },
    parseAddress () {
      this.category = this.$route.params.category
      this.price = this.$route.query.value
    }
  },
  mounted () {
    this.onGetCategory()
    this.parseAddress()
    this.checkCategory()
    if (!this.haveCategory) {
      this.showcategory = true
      this.newcategory = this.category
    }
    if (this.haveCategory && this.price > 0) {
      this.save()
    }
  }
}
</script>

<style module lang='sass'>

</style>
