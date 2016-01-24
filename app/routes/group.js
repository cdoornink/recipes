import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    localStorage.setItem('path', 'group/'+params.id)
    return this.store.find('group', params.id)
  },
  setupController: function(controller, model) {
    this._super(controller, model)
    this.controller.set('currentList', false)
    this.store.find('list', 'current').then((list) => {
      let listRecipes = list.get('recipes')
      let groupRecipes = controller.get('model.recipes')
      listRecipes.forEach((recipe) => {
        groupRecipes.forEach((r) => {
          if (r.get('id') == recipe.get('id')) {
            this.controller.set('currentList', true)
          }
        })
      })
    })
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
    },
    removeGroupFromList: function() {
      this.store.find('list', 'current').then((list) => {
        let recipes = list.get('recipes')
        // debugger
        let groupRecipes = this.controller.get('model.recipes')
        recipes.removeObjects(groupRecipes)
        list.save()
        this.controller.set('currentList', false)
      })
    }
  }
});
