<template>
    <div :class="[$style.context]" >
			<button :class="[$style.context__item, $style.context__edit]" @click="addcontext">Добавить запись</button>
			<button :class="[$style.context__item, $style.context__edit]" @click="editcontext">Редактировать</button>
			<button :class="[$style.context__item, $style.context__delete]" @click="deletecontext">Удалить</button>
    </div>
</template>burron

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      showcontext: false
    }
  },
  computed: {

  },
  methods: {
    ...mapActions([
      'deleteRecord',
      'editRecord',
      'clearCurrentRecord'
    ]),
    addcontext () {
      this.clearCurrentRecord()
      this.$modal.close('ContextForm')
      this.$modal.open('PaymentsForm')
    },
    editcontext () {
      // this.editRecord()
      this.$modal.close('ContextForm')
      this.$modal.open('PaymentsForm')
      // this.clearCurrentRecord()
    },
    deletecontext () {
      this.deleteRecord()
      this.clearCurrentRecord()
      this.$modal.close('ContextForm')
    }
  },
  mounted () {

  }
}
</script>

<style module lang="sass">

.context
  width: 250px
  gap: 30px

  &__item
    width: 100%
</style>
