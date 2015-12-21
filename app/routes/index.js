import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    localStorage.removeItem('path')
    this._super(controller, model)
    this.store.find('recipe').then((recipes) => {
      controller.set('recipes', recipes)
    })
    console.log('find groups')
    this.store.find('group').then((groups) => {
      console.log(groups)
      controller.set('groups', groups)
    })
  }
});
