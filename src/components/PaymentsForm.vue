<template>
  <v-dialog
    v-model="dialog"
    width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Новые данные</span>
      </v-card-title>

      <v-card-text>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
            <v-menu
                v-model="menu"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Дата"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-select
                v-model="category"
                :items="getCategoryList"
                label="Категория"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="price"
                label="Цена"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
            </v-col>
          </v-row>
          <v-row>
            <v-text-field
              v-model="description"
              label="Описание"
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
          v-if="newRecord"
          @click="newsave"
        >Добавить</v-btn>
        <v-btn
          v-else
          color="blue darken-1"
          text
          @click="save"
        >Редактировать</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      category: 'Еда',
      newcategory: '',
      description: '',
      categories: [],
      price: 0,
      address: '',
      haveCategory: false,
      showcategory: false,
      currentRecord: [],
      newRecord: false,
      dialog: true
    }
  },
  computed: {
    ...mapGetters([
      'getCategoryList',
      'getFullPaymentsList',
      'getCurrentRecord'
    ])
  },
  methods: {
    ...mapActions([
      'addFullData',
      'addCategoryData',
      'changeRecord'
    ]),
    prepareData () {
      let { date, category, description, price } = this
      price = +price
      const rec = [{ date, category, description, price }]
      return rec
    },
    newsave () {
      this.addFullData(this.prepareData())
      this.close()
    },
    save () {
      this.changeRecord(this.prepareData())
      this.close()
    },
    close () {
      this.$modal.close('PaymentsForm')
    },
    onGetCategory () {
      this.categories = this.getCategoryList
    },
    onGetCurrentRecord () {
      this.currentRecord = this.getCurrentRecord
    },
    setValues (category, price) {
      this.category = category
      this.price = price
    },
    checkCategory () {
      this.haveCategory = false
      this.categories.forEach((item) => {
        if (item === this.category) { this.haveCategory = true }
      })
      // return haveCategory
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
    this.onGetCurrentRecord()
    if (this.currentRecord.length !== 0) {
      this.date = this.currentRecord.date
      this.category = this.currentRecord.category
      this.description = this.currentRecord.description
      this.price = this.currentRecord.price
      this.newRecord = false
    } else {
      this.newRecord = true
    }
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

<style lang="sass">

</style>
