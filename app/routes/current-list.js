import Ember from 'ember';
import ListItem from '../models/listItem'

export default Ember.Route.extend({
  model: function(params) {
    localStorage.setItem('path', 'current-list')
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
    let iList = {'menu': [''], 'produce': {}, 'rice': {}, 'bread': {}, 'postBread': {}, 'meat': {}, 'dairy': {}, 'cheese': {}, 'freezer': {}, 'baking': {}, 'pasta': {}, 'beans': {}, 'soup': {}}

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
    // if(items.length) {
    //   this.get('controller').set('emptyList', false)
    // }
    this.mapAndSetList(iList, leftoverItems)

    model.get('groups').then((groups) => {

      let group

      groups.forEach((g, i) => {
        console.log(i)
        if (i == 0) {
          group = g
        }
      })

      if (group) {
        group.get('recipes').then((recipes) => {
          recipes.forEach((recipe, i) => {

            iList['menu'].push(recipe)
            recipe.get('ingredients').forEach((ingredient, ii) => {
              if (ingredient.aisle) {
                let name = ingredient.name.toLowerCase()
                this.addItemToAisle(name, i, ingredient.aisle, iList)

              }

            })

          })
          console.log(iList.menu)

          this.mapAndSetList(iList, leftoverItems)
        })
      }


    })
  },
  mapAndSetList: function(iList, leftoverItems) {
    // iList.staples = [{name: 'little tomatoes'},{name: 'bananas'},{name: 'avocados'},{name: 'lettuce'},{name: 'cucumber'},{name: 'broccoli'},{name: 'berries'},{name: 'bell pepper'},{name: 'bread'},{name: 'crackers'},{name: 'applesauce'},{name: 'pecans'},{name: 'yogurt'},{name: 'string cheese'},{name: 'almond butter'},{name: 'peanut butter'},{name: 'honey'},{name: 'chocolate chips'},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''}]

    let list = {}
    list.menu = iList.menu
    list.staples   = $.map(leftoverItems,    function(item, name) {return ListItem.create({id: item, name: item, recipe: 'm'})})
    list.produce   = $.map(iList.produce,    function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.rice      = $.map(iList.rice,       function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.bread     = $.map(iList.bread,      function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.postBread = $.map(iList.postBread,  function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.meat      = $.map(iList.meat,       function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.dairy     = $.map(iList.dairy,      function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.cheese    = $.map(iList.cheese,     function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.freezer   = $.map(iList.freezer,    function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.baking    = $.map(iList.baking,     function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.pasta     = $.map(iList.pasta,      function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.beans     = $.map(iList.beans,      function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.soup      = $.map(iList.soup,       function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    this.get('controller').set('list', list)
    this.fetchLocalChecklist()
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
    produce: ['salad ingredients','potatoes','asparagus','lemon','lime','avocado','avocados','mushrooms','broccoli','spinach','carrots','onion','lettuce','tomatoes','chard','basil','garlic','cabbage','pepper','corn on','parsnip','turnip','bananas','cucumber','zucchini','cilantro','arugula','celery','scallions','vegetables','berries','berry', 'green beans'],
    rice: ['rice', 'almond', 'peanut', 'pecans'],
    bread: ['bread', 'ciabatta', 'buns', 'hoagies', 'pita'],
    postBread: ['tortilla chips', 'corn chips', 'potato chips', 'nuts', 'tortilla', '7up', 'root', 'beer', 'crackers', 'dried'],
    meat: ['chicken', 'beef', 'ground', 'turkey', 'ham', 'sausage', 'pork', 'tilapia', 'salmon', 'cod', 'veal', 'meat', 'roast'],
    dairy: ['yogurt', 'half', 'milk', 'eggnog', 'whipped', 'cottage'],
    cheese: ["cheese", "cheddar", 'parmesan', 'mozzarella', 'jack', 'sour', 'bacon', 'block of', 'salsa', 'feta', 'provalone', 'eggs', 'butter'],
    freezer: ['frozen', 'ice', 'pie'],
    baking: ['spice', 'yeast', 'honey', 'oil', 'sugar', 'salt', 'chocolate chips', 'flour', 'extract', 'cocoa', 'coffee', 'tea', 'filters', 'sprinkles', 'baking', 'pancake', 'syrup', 'applesauce', 'starch'],
    pasta: ['orzo', 'dressing', 'sauce', 'rigatoni', 'spaghetti', 'noodle', 'tahini', 'macaroni', 'tortellini', 'tortallini', 'tortillini', 'quinoa', 'pasta'],
    beans: ['beans', 'cannellini', 'chilies', 'garbanzo', 'chickpeas'],
    soup: ['ramen', 'broth', 'panko', 'soup', 'yakisoba']
  },
  updateLocalChecklist: function() {
    let list = this.get('controller').get('list')
    let checkedOff = []
    for(let i of list.staples) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.produce) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.rice) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.bread) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.postBread) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.meat) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.dairy) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.cheese) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.freezer) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.baking) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.pasta) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.beans) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.soup) { if (i.checkedOff) { checkedOff.push(i.id) } }
    localStorage.setItem('checkedOff', checkedOff)
  },
  fetchLocalChecklist: function() {
    let list = this.get('controller').get('list')
    let checkedOff = localStorage.getItem('checkedOff')
    if (checkedOff) {
      checkedOff = checkedOff.split(',')
      for(let i of list.staples) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.produce) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.rice) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.bread) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.postBread) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.meat) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.dairy) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.cheese) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.freezer) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.baking) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.pasta) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.beans) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.soup) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
    }
  },
  actions: {
    checkListItemClick: function(item) {
      if (item.get('checkedOff')) {
        item.set('checkedOff', false)
      } else {
        item.set('checkedOff', true)
      }
      this.updateLocalChecklist()
    }
  }

});
