import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    localStorage.removeItem('path')
    this._super(controller, model)
    this.store.find('recipe').then((recipes) => {
      controller.set('recipes', recipes)
    })
    this.store.find('group').then((groups) => {
      controller.set('groups', groups)
    })
  }
});
