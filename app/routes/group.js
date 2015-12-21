import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    localStorage.setItem('path', 'group/'+params.id)
    return this.store.find('group', params.id)
  },
  setupController: function(controller, model) {
    this._super(controller, model)
    model.get('recipes').then(function(recipes) {
      let iList = {'menu': [''], 'produce': {}, 'rice': {}, 'bread': {}, 'post-bread': {}, 'meat': {}, 'dairy': {}, 'cheese': {}, 'freezer': {}, 'baking': {}, 'pasta': {}, 'beans': {}, 'soup': {}}
      recipes.forEach(function(recipe, i) {
        iList['menu'].push(recipe.get('title'))
        recipe.get('ingredients').forEach(function(ingredient, ii) {
          if (ingredient.aisle) {
            let name = ingredient.name.toLowerCase()
            let nameValue = iList[ingredient.aisle][name]
            if (nameValue) {
              nameValue = nameValue + ', '+(i+1).toString()
            } else {
              nameValue = (i+1).toString()
            }
            iList[ingredient.aisle][name] = nameValue
          }
        })
      })
      console.log(iList)
      controller.set('list', iList)
    })
  }
});
