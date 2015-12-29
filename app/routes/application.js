import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function() {
    console.log(localStorage.getItem('path'))
    if (localStorage.getItem('path')) {
      console.log(localStorage.getItem('path').split('/')[0])
      this.transitionTo(localStorage.getItem('path').split('/')[0], localStorage.getItem('path').split('/')[1])
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
      this.transitionTo('index');
    },
    openAddToList: function() {
      this.disconnectOutlet({parentView: 'application', outlet: 'dialogs'});
      this.render('dialogs/addToList', {into: 'application', outlet: 'dialogs'});
      Ember.run.later(() => {
        $('.input-field input').focus()
      }, 200)
    },
    closeAddToList: function() {
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
        });
      })
    }
  }
});
