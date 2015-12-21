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
      window.history.back();
      // this.transitionTo('index');
    }
  }
});
