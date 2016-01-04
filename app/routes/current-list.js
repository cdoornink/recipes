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
    let iList = {'menu': [''], 'produce': {}, 'bulk': {}, 'specialty': {}, 'bread': {}, 'snacks': {}, 'meat': {}, 'dairy': {}, 'cheese': {}, 'freezer': {}, 'baking': {}, 'pasta': {}, 'beans': {}, 'soup': {}, 'cleaning': {}, 'babies': {}, 'personal': {}, 'medicine': {}}

    let leftoverItems = []
    items.forEach((i) => {
      let item = i.toLowerCase()
      //not in a for loop because the matches are set up in order so for example: 'cream cheese' in dairy isn't overridden by the cheese aisle matching 'cheese'
      //one-off edge cases first -
      //graham crackers gets caught by 'ham'
      if (item.indexOf('graham') != -1) { this.addItemToAisle(item, '', 'snacks', iList)}
      else if (this.matchWord(item, 'cleaning'))  { this.addItemToAisle(item, '', 'cleaning', iList)}
      else if (this.matchWord(item, 'produce'))   { this.addItemToAisle(item, '', 'produce', iList)}
      else if (this.matchWord(item, 'bulk'))      { this.addItemToAisle(item, '', 'bulk', iList)}
      else if (this.matchWord(item, 'meat'))      { this.addItemToAisle(item, '', 'meat', iList)}
      else if (this.matchWord(item, 'specialty')) { this.addItemToAisle(item, '', 'specialty', iList)}
      else if (this.matchWord(item, 'bread'))     { this.addItemToAisle(item, '', 'bread', iList)}
      else if (this.matchWord(item, 'snacks'))    { this.addItemToAisle(item, '', 'snacks', iList)}
      else if (this.matchWord(item, 'dairy'))     { this.addItemToAisle(item, '', 'dairy', iList)}
      else if (this.matchWord(item, 'cheese'))    { this.addItemToAisle(item, '', 'cheese', iList)}
      else if (this.matchWord(item, 'freezer'))   { this.addItemToAisle(item, '', 'freezer', iList)}
      else if (this.matchWord(item, 'baking'))    { this.addItemToAisle(item, '', 'baking', iList)}
      else if (this.matchWord(item, 'pasta'))     { this.addItemToAisle(item, '', 'pasta', iList)}
      else if (this.matchWord(item, 'beans'))     { this.addItemToAisle(item, '', 'beans', iList)}
      else if (this.matchWord(item, 'soup'))      { this.addItemToAisle(item, '', 'soup', iList)}
      else if (this.matchWord(item, 'babies'))    { this.addItemToAisle(item, '', 'babies', iList)}
      else if (this.matchWord(item, 'personal'))  { this.addItemToAisle(item, '', 'personal', iList)}
      else if (this.matchWord(item, 'medicine'))  { this.addItemToAisle(item, '', 'medicine', iList)}
      else {  leftoverItems.push(item)}
    })
    if(!items.length) {
      this.get('controller').set('emptyList', true)
    }
    this.mapAndSetList(iList, leftoverItems)

    model.get('groups').then((groups) => {

      let group

      groups.forEach((g, i) => {
        if (i == 0) {
          group = g
        }
      })

      if (group) {
        this.get('controller').set('emptyList', false)
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
          this.mapAndSetList(iList, leftoverItems)
        })
      }
    })
  },
  mapAndSetList: function(iList, leftoverItems) {
    let list = {}
    list.menu = iList.menu
    list.staples = $.map(leftoverItems, function(item, name) {
      return ListItem.create({id: item, name: item, recipe: ''})
    })
    for(var aisle in iList) {
      if (aisle != 'menu') {
        list[aisle] = $.map(iList[aisle], function(item, name) {
          return ListItem.create({id: name, name: name, recipe: item})
        })
      }
    }
    this.get('controller').set('list', list)
    this.fetchLocalChecklist()
  },
  addItemToAisle: function(item, ref, aisle, list) {
    // console.log(item, ref, aisle)
    //conform to previous entries depending on if they have an 's' or are missing an 's'
    if(list[aisle][item + 's'] != undefined) {
      item = item + 's'
    } else if (list[aisle][item.slice(0,-1)] != undefined) {
      item = item.slice(0,-1)
    }
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
    //listed in order here so blanket words don't override specific items (like 'meat' catching everything in specialties but not overriding the meat section)
    cleaning: ['detergent', 'soap', 'bleach', 'washer', 'dryer', 'clean', 'sponge'],
    produce: ['fresh basil', 'fresh parsley', 'fresh cilantro', 'chives', 'fresh garlic', 'salad ingredients','potatoes','asparagus','lemon','lime','avocado','avocados','mushrooms','broccoli', 'pepper', 'spinach','carrots','onion','lettuce','tomatoes','chard','garlic','cabbage','corn on','parsnip','turnip','bananas','cucumber','zucchini','cilantro','arugula','celery','scallions','vegetables','berries','berry', 'green beans', 'melon', 'cantelope', 'grapes', 'oranges'],
    bulk: ['rice', 'almond', 'peanut', 'pecans', 'lunchmeat'],
    meat: ['chicken', 'beef', 'ground', 'sausage', 'pork', 'tilapia', 'steak', 'patties', 'hamburgers', 'salmon', 'cod', 'veal', 'roast', 'hot dogs', 'weiners'],
    specialty: ['deli', 'meat', 'ham', 'turkey', 'good cheese', 'fancy cheese', 'nice crackers', 'fancy crackers', 'good bread', 'fancy bread', 'french bread', 'ciabatta', 'baugette', 'baggette', 'mozzarella balls'],
    bread: ['bread', 'buns', 'hoagies', 'pita', 'tortillas', 'flour tortilla', 'corn tortilla'],
    snacks: ['tortilla chips', 'corn chips', 'potato chips', 'nuts', 'tortilla', '7up', 'root', 'beer', 'crackers', 'dried', 'sparkling water', 'raisen', 'raison', 'applesauce', 'juice'],
    dairy: ['yogurt', 'half', 'milk', 'eggnog', 'whipped', 'cottage'],
    cheese: ["cheese", "cheddar", 'parmesan', 'mozzarella', 'jack', 'sour', 'bacon', 'block of', 'salsa', 'feta', 'provalone', 'eggs', 'butter'],
    freezer: ['frozen', 'ice', 'pie'],
    baking: ['food coloring', 'poppy', 'basil', 'paprika', 'spice', 'cilantro', 'dill', 'poppyseed', 'oregano', 'chives', 'coconut', 'yeast', 'honey', 'oil', 'sugar', 'salt', 'chocolate chips', 'flour', 'extract', 'cocoa', 'coffee', 'tea', 'filters', 'sprinkles', 'baking', 'pancake', 'syrup', 'applesauce', 'starch'],
    pasta: ['orzo', 'dressing', 'sauce', 'rigatoni', 'spaghetti', 'noodle', 'tahini', 'macaroni', 'tortellini', 'tortallini', 'tortillini', 'quinoa', 'pasta'],
    beans: ['beans', 'cannellini', 'chilies', 'garbanzo', 'chickpeas', 'artichoke heart'],
    soup: ['ramen', 'broth', 'panko', 'soup', 'yakisoba', 'garbage bag', 'ziploc', 'plastic bag', 'light bulb', 'lights'],
    babies: ['bb', 'diaper', 'pullup', 'pull up', 'wipes', 'baby'],
    personal: ['razor', 'shaving', 'face', 'deoder', 'tooth', 'eye', 'lip', 'makeup', 'hair', 'shampoo', 'condition', 'chapstick', 'tampons', 'pads'],
    medicine: ['medicine', 'vitamin', 'allergy', 'pain', 'tylenol', 'ibuprof', 'advil', 'aceto', 'bandaid', 'band aid', 'neospo', 'cough', 'suppres']
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
    }
  }

});
