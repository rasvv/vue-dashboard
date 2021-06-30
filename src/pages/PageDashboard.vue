<template>
<v-container
  class="d-flex justify-center"
>
  <v-row class="row">
    <v-col
        cols="12"
        sm="6"
        md="8"
    >
      <h2 class="my-5">Подсчет расходов</h2>
      <v-btn
        class="mr-7"
        color="teal"
        dark
        @click="addRecord"
      >
        Добавить запись <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        color="teal"
        dark
        @click="addCategory"
      >
        Добавить категорию
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <PaymentsList />
    </v-col>
    <v-col
      cols="6"
      md="4"
    >
      <ApexChart />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import PaymentsList from '../components/PaymentsList'
import ApexChart from '../components/ApexChart'

export default {
  // vuetify: new Vuetify(),
  components: {
    PaymentsList,
    ApexChart
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'fetchFullData',
      'fetchCategoryData',
      'clearCurrentRecord'
    ]),
    addRecord () {
      this.clearCurrentRecord()
      this.$modal.open('PaymentsForm')
    },
    addCategory () {
      this.$modal.open('CategoryForm')
    },
    checkHash (category, price) {
      if (category !== '' && price !== '') {
        this.$modal.open('PaymentsForm')
      }
    }
  },
  mounted () {
    if (this.$route.params.command === 'add' &&
      this.$route.params.target === 'payment'
    ) {
      this.$modal.open('PaymentsForm')
    }
    // this.renderChart(data, options)
  },
  created () {
    this.fetchFullData()
    this.fetchCategoryData()
  }
}
</script>

<style lang="sass">

</style>
