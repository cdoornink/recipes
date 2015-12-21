import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    localStorage.setItem('path', 'recipe/'+params.id)
    return this.store.find('recipe', params.id)
  }
});
