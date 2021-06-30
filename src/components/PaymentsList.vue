<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="listWithIndex"
      :items-per-page="5"
      :page.sync="page"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
      <!-- <template> -->
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>

    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      headers: [
        { text: '#', value: 'index' },
        { text: 'Дата', value: 'date' },
        { text: 'Категория', value: 'category' },
        { text: 'Описание', value: 'description' },
        { text: 'Цена', value: 'price' },
        { text: 'Действия', value: 'actions', sortable: false }

      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      page: 1,
      pageCount: 0,
      itemsPerPage: 5
    }
  },
  computed: {
    style () {
      return {
        height: (this.size + 1) * 30 + 'px'
      }
    },
    ...mapGetters([
      'getFullPaymentsList'
    ]),
    listWithIndex () {
      return this.getFullPaymentsList.map((obj, i) => {
        obj.index = i + 1
        return obj
      })
    }
  },
  methods: {
    ...mapActions([
      'fetchCurrentRecord',
      'deleteRecord',
      'clearCurrentRecord'
    ]),
    editItem (id) {
      this.fetchCurrentRecord(id)
      this.$modal.open('PaymentsForm')
    },
    deleteItem (id) {
      this.fetchCurrentRecord(id)
      this.deleteRecord(id)
      this.clearCurrentRecord()
    },
    openContextMenu (index) {
      const id = (this.page - 1) * this.size + index
      this.fetchCurrentRecord(id)
      this.$modal.open('ContextForm')
    },
    closeContextMenu () {
      this.$modal.close('ContextForm')
    }
  },
  mounted () {

  }
}
</script>

<style lang='sass'>

</style>
