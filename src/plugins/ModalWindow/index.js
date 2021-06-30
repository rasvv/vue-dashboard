// import Vue from "vue"

export default {
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true

    Vue.prototype.$modal = {
      EventBus: new Vue(),
      open (name, settings) {
        this.EventBus.$emit('open', { name, settings })
      },
      close () {
        this.EventBus.$emit('close')
      }
    }
  }
}
