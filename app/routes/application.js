import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function() {
    if (localStorage.getItem('path')) {
      if (localStorage.getItem('path').split('/')[1]) {
        this.transitionTo(localStorage.getItem('path').split('/')[0], localStorage.getItem('path').split('/')[1])
      } else {
        this.transitionTo(localStorage.getItem('path'))
      }
    }
  },
  actions: {
    toggleMenu: function() {
      if ($('.home-page').hasClass('open')) {
        $('.home-page').removeClass('open')
      } else {
        $('.home-page').addClass('open')
      }
    },
    back: function() {
      let history = localStorage.getItem('history')
      if (history) {
        var lastPage = history.split(',')[1]
        if (lastPage) {
          console.log('return to '+ lastPage)
          if (lastPage.split('/')[1]) {
            return this.transitionTo(lastPage.split('/')[0], lastPage.split('/')[1])
          } else {
            return this.transitionTo(lastPage)
          }
          return this.transitionTo(lastPage)
        }
      }
      return this.transitionTo('index');
    },
    openAddToList: function() {
      this.disconnectOutlet({parentView: 'application', outlet: 'dialogs'});
      this.render('dialogs/addToList', {into: 'application', outlet: 'dialogs'});
      Ember.run.later(() => {
        $('.input-field input').focus()
      }, 200)
    },
    closeDialog: function() {
      this.disconnectOutlet({parentView: 'application', outlet: 'dialogs'});
    },
    addToList: function(item) {
      this.store.find('list', 'current').then((list) => {
        let items = list.get('addons')
        if (!items) { items = [] }
        if (typeof(items) == 'string') { items = items.split(',') }
        items.push(item)
        list.set('addons', items)
        list.save().then((result) => {
          $('.input-field input').blur()
          $('.dialog').addClass('confirming')
          Ember.run.later(() => {
            this.container.lookup('controller:dialogs/addToList').set('itemToAdd', null)
            $('.dialog').removeClass('confirming')
            $('.input-field input').focus()
          }, 1000)
          if (localStorage.getItem('path') == 'current-list') {
            this.container.lookup('route:currentList').buildList()
          }
        });
      })
    },
    confirmListComplete: function() {
      this.disconnectOutlet({parentView: 'application', outlet: 'dialogs'});
      this.render('dialogs/confirmListComplete', {into: 'application', outlet: 'dialogs'});
    },
    completeList: function() {
      this.store.find('list').then((lists) => {
        let lastList, currentList
        lists.forEach((list) => {
          if (list.get('id') == 'last') {
            lastList = list
          }
          if (list.get('id') == 'current') {
            currentList = list
          }
        })
        if (lastList) {
          lastList.destroyRecord().then(() => {
            this.currentToLast(currentList)
          })
        } else {
          this.currentToLast(currentList)
        }
      })
      localStorage.removeItem('checkedOff');
      this.disconnectOutlet({parentView: 'application', outlet: 'dialogs'});
    }
  },
  currentToLast: function(list) {
    let lastList = this.store.createRecord('list', {
      id: 'last',
      created: list.get('created'),
      groups: list.get('groups'),
      addons: list.get('addons')
    })
    lastList.save()

    list.set('created', new Date().getTime())
    let groups = list.get('groups')

    list.destroyRecord().then(() => {
      groups.forEach((group) => {
        group.save()
      })
      let newList = this.store.createRecord('list', {
        id: 'current',
        created: new Date().getTime()
      })
      newList.save()
    })
    this.container.lookup('controller:currentList').set('list', null)
    this.transitionTo('index')

  }
});
