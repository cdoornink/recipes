import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    localStorage.setItem('path', 'group/'+params.id)
    return this.store.find('group', params.id)
  },
  actions: {
    addGroupToList: function() {
      this.store.find('list', 'current').then((list) => {
        let recipes = list.get('recipes')
        let groupRecipes = this.controller.get('model.recipes')
        recipes.addObjects(groupRecipes)
        list.save()
        this.controller.set('currentList', true)
      })
    }
  }
});
