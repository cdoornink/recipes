import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('list', 'current')
  },
  setupController: function(controller, model) {
    this._super(controller, model)
    this.buildList()
  },
  buildList: function() {
    let model = this.get('controller.model')
    let items = model.get('addons')
    if (!items) { items = [] }
    if (typeof(items) == 'string') { items = items.split(',') }

    this.get('controller').set('model.addedItems', items)

    model.get('groups').then((groups) => {

      let iList = {'menu': [''], 'produce': {}, 'rice': {}, 'bread': {}, 'postBread': {}, 'meat': {}, 'dairy': {}, 'cheese': {}, 'freezer': {}, 'baking': {}, 'pasta': {}, 'beans': {}, 'soup': {}}

      groups.forEach((group, i) => {
        console.log(i)
        if (i > 0) { return }
        group.get('recipes').then((recipes) => {
          recipes.forEach((recipe, i) => {

            iList['menu'].push(recipe.get('title'))
            recipe.get('ingredients').forEach((ingredient, ii) => {
              if (ingredient.aisle) {
                let name = ingredient.name.toLowerCase()
                this.addItemToAisle(name, i, ingredient.aisle, iList)

              }

            })

          })
          console.log(items)
          let leftoverItems = []
          items.forEach((i) => {
            let item = i.toLowerCase()
            if (this.matchWord(item, 'produce')) {
              this.addItemToAisle(item, 'm', 'produce', iList)
            } else if (this.matchWord(item, 'rice')){
              this.addItemToAisle(item, 'm', 'rice', iList)
            } else if (this.matchWord(item, 'bread')){
              this.addItemToAisle(item, 'm', 'bread', iList)
            } else if (this.matchWord(item, 'postBread')){
              this.addItemToAisle(item, 'm', 'postBread', iList)
            } else if (this.matchWord(item, 'meat')){
              this.addItemToAisle(item, 'm', 'meat', iList)
            } else if (this.matchWord(item, 'dairy')){
              this.addItemToAisle(item, 'm', 'dairy', iList)
            } else if (this.matchWord(item, 'cheese')){
              this.addItemToAisle(item, 'm', 'cheese', iList)
            } else if (this.matchWord(item, 'freezer')){
              this.addItemToAisle(item, 'm', 'freezer', iList)
            } else if (this.matchWord(item, 'baking')){
              this.addItemToAisle(item, 'm', 'baking', iList)
            } else if (this.matchWord(item, 'pasta')){
              this.addItemToAisle(item, 'm', 'pasta', iList)
            } else if (this.matchWord(item, 'beans')){
              this.addItemToAisle(item, 'm', 'beans', iList)
            } else if (this.matchWord(item, 'soup')){
              this.addItemToAisle(item, 'm', 'soup', iList)
            } else {
              leftoverItems.push(item)
            }

          })
          // iList.staples = [{name: 'little tomatoes'},{name: 'bananas'},{name: 'avocados'},{name: 'lettuce'},{name: 'cucumber'},{name: 'broccoli'},{name: 'berries'},{name: 'bell pepper'},{name: 'bread'},{name: 'crackers'},{name: 'applesauce'},{name: 'pecans'},{name: 'yogurt'},{name: 'string cheese'},{name: 'almond butter'},{name: 'peanut butter'},{name: 'honey'},{name: 'chocolate chips'},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''}]

          iList.staples   = $.map(leftoverItems,    function(item, name) {return {name: item, recipe: 'm'}})
          iList.produce   = $.map(iList.produce,    function(item, name) {return {name: name, recipe: item, checkedOff: true}})
          iList.rice      = $.map(iList.rice,       function(item, name) {return {name: name, recipe: item}})
          iList.bread     = $.map(iList.bread,      function(item, name) {return {name: name, recipe: item}})
          iList.postBread = $.map(iList.postBread,  function(item, name) {return {name: name, recipe: item}})
          iList.meat      = $.map(iList.meat,       function(item, name) {return {name: name, recipe: item}})
          iList.dairy     = $.map(iList.dairy,      function(item, name) {return {name: name, recipe: item}})
          iList.cheese    = $.map(iList.cheese,     function(item, name) {return {name: name, recipe: item}})
          iList.freezer   = $.map(iList.freezer,    function(item, name) {return {name: name, recipe: item}})
          iList.baking    = $.map(iList.baking,     function(item, name) {return {name: name, recipe: item}})
          iList.pasta     = $.map(iList.pasta,      function(item, name) {return {name: name, recipe: item}})
          iList.beans     = $.map(iList.beans,      function(item, name) {return {name: name, recipe: item}})
          iList.soup      = $.map(iList.soup,       function(item, name) {return {name: name, recipe: item}})
          this.get('controller').set('list', iList)
          console.log(iList)
          console.log('need to devise a method to save the checked items in local storage and reset them once the list is finished, maybe save them in firebase, but use local storage as the true source')
        })
      })


    })
  },
  addItemToAisle: function(item, ref, aisle, list) {
    let itemRef = list[aisle][item]
    //check here for nameValue to either have an s at the end or for the new value to have one
    ref = typeof(ref) == 'string' ? ref : (ref+1).toString()
    if (itemRef) {
      itemRef = itemRef + ', ' + ref
    } else {
      itemRef = ref
    }
    list[aisle][item] = itemRef
  },
  matchWord: function(item, aisle) {
    let match = false
    for(let w of this.matchwords[aisle]) {
      if (item.indexOf(w) != -1) {
        match = true
      }
    }
    return match
  },
  matchwords: {
    produce: ['salad ingredients','potatoes','asparagus','lemon','lime','avocado','avocados','mushrooms','broccoli','spinach','carrots','onion','lettuce','tomatoes','chard','basil','garlic','cabbage','pepper','corn on','parsnip','turnip','bananas','cucumber','zucchini','cilantro','arugula','celery','scallions','vegetables','berries','berry'],
    rice: ['rice', 'almond', 'peanut', 'pecans'],
    bread: ['bread', 'ciabatta', 'buns', 'hoagies', 'pita'],
    postBread: ['tortilla chips', 'corn chips', 'potato chips', 'nuts', 'tortilla', '7up', 'root', 'beer', 'crackers', 'dried'],
    meat: ['chicken', 'beef', 'ground', 'turkey', 'ham', 'sausage', 'pork', 'tilapia', 'salmon', 'meat'],
    dairy: ['yogurt', 'half', 'milk', 'eggnog', 'whipped', 'cottage'],
    cheese: ["cheddar", 'parmesan', 'mozzarella', 'jack', 'sour', 'bacon', 'block of', 'salsa', 'feta', 'provalone', 'eggs', 'butter'],
    freezer: ['frozen', 'ice', 'pie'],
    baking: ['spice', 'yeast', 'honey', 'oil', 'sugar', 'salt', 'chocolate chips', 'flour', 'extract', 'cocoa', 'coffee', 'tea', 'filters', 'sprinkles', 'baking', 'pancake', 'syrup', 'applesauce'],
    pasta: ['orzo', 'dressing', 'sauce', 'rigatoni', 'spaghetti', 'noodle', 'tahini', 'macaroni', 'tortellini', 'tortallini', 'tortillini', 'quinoa', 'pasta'],
    beans: ['beans', 'cannellini', 'chilies', 'garbanzo', 'chickpeas'],
    soup: ['ramen', 'broth', 'panko', 'soup', 'yakisoba']
  }

});
