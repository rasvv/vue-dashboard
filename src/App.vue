<template>
  <v-app
		class="d-flex justify-center"
	>
    <v-app-bar
			app
			flat
			class="d-flex justify-center"
		>
      <v-btn plain :ripple="false" to="/dashboard">Расходы</v-btn>
      <v-btn plain :ripple="false" to="/about">О программе</v-btn>
      <!-- <v-btn plain :ripple="false" to="/404">404</v-btn> -->
    </v-app-bar>
    <v-main>
      <router-view />
        <transition  name='fade'>
          <ModalWindow
          v-if='modalWindow'
          :name='modalWindow'
        />
      </transition>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    ModalWindow: () => import('./components/ModalWindow')
  },
  data () {
    return {
      // modalShow: false,
      modalWindow: false
      // modalWindowSettings: {}
    }
  },
  methods: {
    onOpened ({ name }) {
      this.modalWindow = name
      // this.modalWindowSettings = settings
    },
    onClosed () {
      this.modalWindow = ''
      this.modalWindowSettings = {}
    }
  },
  mounted () {
    this.$modal.EventBus.$on('open', this.onOpened)
    this.$modal.EventBus.$on('close', this.onClosed)
  },
  beforeDestroy () {
    this.$modal.EventBus.$off('open', this.onOpened)
    this.$modal.EventBus.$off('close', this.onClosed)
  }
}
</script>

<style  lang="sass">
.fade-enter-active
  transition: opacity 1s

.fade-leave-active
  transition: opacity 1s

.fade-enter, .fade-leave-to
  opacity: 0

</style>

<style lang="sass" module>

</style>
