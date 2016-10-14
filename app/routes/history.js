import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    localStorage.setItem('path', 'history')
    return this.store.findAll('list')
  },
  setupController(controller, model) {
    this._super(controller, model)
    console.log(model);
    const a = model.toArray()
    var recipeCount = {}
    model.forEach((list, i) => {
      if (i < a.length-1) {
        list.set('executionDate', new Date(parseInt(model.toArray()[i+1].get('created'))))
      } else if (list.get('id') == 'last') {
        list.set('executionDate', new Date(parseInt(a[0].get('created'))))
      }
      list.get('recipes').forEach((recipe) => {
        console.log(recipe.get('id'));
        if (recipeCount[recipe.get('id')]) {
          recipeCount[recipe.get('id')] += 1
        } else {
          recipeCount[recipe.get('id')] = 1
        }
      })
    })
    console.log(recipeCount);
  }
});
