import Ember from 'ember';
import ListItem from '../models/listItem'
import CurrentListRoute from '../routes/current-list'

export default CurrentListRoute.extend({
  model: function(params) {
    localStorage.setItem('path', 'last-list')
    return this.store.find('list', 'last')
  },
  actions: {
    markAsMade: function(recipe) {
      this.store.find('list', 'last').then((list) => {
        let madeRecipes = list.get('madeRecipes')
        madeRecipes.addObject(recipe)
        list.save().then((result) => {
          if (localStorage.getItem('path') == 'last-list') {
            this.container.lookup('route:lastList').buildList()
          }
        });
      })
    },
    markAsUnmade: function(recipe) {
      this.store.find('list', 'last').then((list) => {
        let madeRecipes = list.get('madeRecipes')
        madeRecipes.removeObject(recipe)
        list.save().then((result) => {
          console.log('rebuild')
          if (localStorage.getItem('path') == 'last-list') {
            this.container.lookup('route:lastList').buildList()
          }
        });
      })
    },
    setDate: function(item) {
      this.store.find('list', 'last').then((list) => {
        let recipes = JSON.parse(list.get('datedRecipes'))
        let duplicate = false
        if (recipes.length) {
          recipes.forEach((recipe) => {
            if (recipe.id == item.id) {
              recipe.selectedDate = item.selectedDate
              duplicate = true
            }
          })
          if (!duplicate) {
            recipes.push(item)
          }
          list.set('datedRecipes', JSON.stringify(recipes))
        } else {
          list.set('datedRecipes', JSON.stringify([recipe]))
        }
        list.save().then((result) => {
          console.log('rebuild')
          if (localStorage.getItem('path') == 'last-list') {
            this.container.lookup('route:lastList').buildList()
          }
        });

      })
    }
  }
});
