import Ember from 'ember';
import ListItem from '../models/listItem'
import AisleDesignations from '../utils/aisle-designations'

export default Ember.Route.extend({
  model: function(params) {
    localStorage.setItem('path', 'current-list')
    return this.store.find('list', 'current')
  },
  setupController: function(controller, model) {
    this._super(controller, model)
    this.buildList()
  },
  updateLocalChecklist: function() {
    let list = this.get('controller').get('list')
    let checkedOff = []
    for(var aisle in list) {
      for(let i of list[aisle]) { if (i.checkedOff) { checkedOff.push(i.id) } }
    }
    localStorage.setItem('checkedOff', checkedOff)
  },
  fetchLocalChecklist: function() {
    let list = this.get('controller').get('list')
    let checkedOff = localStorage.getItem('checkedOff')
    if (checkedOff) {
      checkedOff = checkedOff.split(',')
      for(var aisle in list) {
        for(let i of list[aisle]) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      }
    }
  },
  ingredientKeys: null,
  leftoverItems: null,
  iList: null,
  buildList: function() {
    let model = this.get('controller.model')
    let items = model.get('addons')
    if (!items) { items = [] }
    if (typeof(items) == 'string') { items = items.split(',') }

    this.get('controller').set('model.addedItems', items)
    this.list = {'menu': [''], 'produce': {}, 'bulk': {}, 'liquor': {},'specialty': {}, 'spreads': {}, 'bread': {}, 'seafood': {}, 'snacks': {}, 'meat': {}, 'dairy': {}, 'cheese': {}, 'freezer': {}, 'baking': {}, 'cereal': {}, 'pasta': {}, 'beans': {}, 'soup': {}, 'cleaning': {}, 'babies': {}, 'personal': {}, 'medicine': {}}
    this.leftoverItems = []
    this.ingredientKeys = Object.keys(AisleDesignations)

    items.forEach((i) => {
      this.matchItemToAisle(i, '')
    })
    if(!items.length) {
      this.get('controller').set('emptyList', true)
    }
    this.mapAndSetList()

    model.get('recipes').then((recipes) => {

      if (recipes) {
        this.get('controller').set('emptyList', false)
        recipes.forEach((recipe, i) => {
          recipe.set('isMade', false)
          this.list['menu'].push(recipe)
          recipe.get('ingredients').forEach((ingredient, ii) => {
            if (ingredient.list) {
              this.matchItemToAisle(ingredient.name, i)
            }
          })
        })
        this.mapAndSetList()

        //only for last list - checked off if recipe is made
        model.get('madeRecipes').then((recipes) => {
          recipes.forEach((recipe) => {
            let id = recipe.get('id')
            this.get('controller.list.menu').forEach((recipe) => {
              if (recipe.id == id) {
                recipe.set('isMade', true)
              }
            })
          })
        })

        let datedRecipes = JSON.parse(model.get('datedRecipes'))
        if (datedRecipes) {
          let menu = this.get('controller.list.menu')
          menu.forEach((recipe) => {
            if (recipe) {
              recipe.set('date', 'null')
            }
          })
          datedRecipes.forEach((recipe) => {
            let id = recipe.id
            let date = recipe.selectedDate
            menu.forEach((recipe) => {
              if (recipe.id == id) {
                recipe.set('date', date)
                recipe.set('hasDate', true)
              }
            })
          })
          this.set('controller.list.menu', menu.sortBy('date'))
        }

      }
    })
  },
  matchItemToAisle: function(i, recipeId) {
    let match = false
    let item = i.toLowerCase()
    for(let key of this.ingredientKeys) {
      if (item.indexOf(key) != -1) {
        this.addItemToAisle(item, recipeId, AisleDesignations[key])
        match = true
        break
      }
    }
    if (!match) {
      this.leftoverItems.push({name:item, recipe:recipeId})
    }
  },
  addItemToAisle(item, ref, aisle) {
    // console.log(item, ref, aisle)
    //conform to previous entries depending on if they have an 's' or are missing an 's'
    if(this.list[aisle][item + 's'] != undefined) {
      item = item + 's'
    } else if (this.list[aisle][item.slice(0,-1)] != undefined) {
      item = item.slice(0,-1)
    }
    let itemRef = this.list[aisle][item]
    //check here for nameValue to either have an s at the end or for the new value to have one
    ref = typeof(ref) == 'string' ? ref : (ref+1).toString()
    if (itemRef) {
      itemRef = itemRef + ', ' + ref
    } else {
      itemRef = ref
    }
    this.list[aisle][item] = itemRef
  },
  mapAndSetList() {
    let list = {}
    list.menu = this.list.menu
    list.other = $.map(this.leftoverItems, function(item, name) {
      return ListItem.create({id: item.name, name: item.name, recipe: item.recipe})
    })
    for(var aisle in this.list) {
      if (aisle != 'menu') {
        list[aisle] = $.map(this.list[aisle], function(item, name) {
          return ListItem.create({id: name, name: name, recipe: item})
        })
      }
    }
    this.get('controller').set('list', list)
    this.fetchLocalChecklist()
  },
  actions: {
    checkListItemClick: function(item) {
      if (item.get('checkedOff')) {
        item.set('checkedOff', false)
      } else {
        item.set('checkedOff', true)
      }
      this.updateLocalChecklist()
    },
    removeFromList: function(item) {
      this.store.find('list', 'current').then((list) => {
        let items = list.get('addons')
        if (!items) { items = [] }
        if (typeof(items) == 'string') { items = items.split(',') }
        let newItems = []
        items.forEach(function(i){
          if(i.toLowerCase() != item.get('id')) {
            newItems.push(i)
          }
        })
        list.set('addons', newItems)
        list.save().then((result) => {
          if (localStorage.getItem('path') == 'current-list') {
            this.container.lookup('route:currentList').buildList()
          }
        });
      })
    },
    removeRecipeFromList: function(recipe) {
      this.store.find('list', 'current').then((list) => {
        let recipes = list.get('recipes')
        recipes.removeObject(recipe)
        list.save().then((result) => {
          if (localStorage.getItem('path') == 'current-list') {
            this.container.lookup('route:currentList').buildList()
          }
        });
      })
    }
  }
});
