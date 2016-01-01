export function initialize(app) {
  // app.inject('route', 'history', 'service:history');



  Ember.Router.reopen({
    updateHistory: Ember.on('didTransition', function() {

      let history = localStorage.getItem('history')
      let currentPathParam = this.router.state.params[this.currentPath].id
      let currentPath = this.currentPath
      if (currentPathParam) {
        currentPath += '/' + currentPathParam
      }
      var newHistory
      if (history) {
        history = history.split(',')
      } else {
        history = []
      }
      if (history[0] == currentPath) {
        //nothing
      } else if (history[1] == currentPath) {
        history.shift()
      } else {
        history.unshift(currentPath)
      }
      newHistory = history
      console.log(newHistory)
      if (newHistory[0] == 'index') {
        newHistory = ['index']
      }
      localStorage.setItem('history', newHistory)
    })
  })
}

export default {
  name: 'history',
  initialize: initialize
};
