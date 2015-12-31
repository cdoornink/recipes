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
      if      (this.matchWord(item, 'produce'))   { this.addItemToAisle(item, '', 'produce', iList)}
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
      else if (this.matchWord(item, 'cleaning'))  { this.addItemToAisle(item, '', 'cleaning', iList)}
      else if (this.matchWord(item, 'babies'))    { this.addItemToAisle(item, '', 'babies', iList)}
      else if (this.matchWord(item, 'personal'))  { this.addItemToAisle(item, '', 'personal', iList)}
      else if (this.matchWord(item, 'medicine'))  { this.addItemToAisle(item, '', 'medicine', iList)}
      else {  leftoverItems.push(item)}
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
    list.staples   = $.map(leftoverItems,    function(item, name) {return ListItem.create({id: item, name: item, recipe: ''})})
    list.produce   = $.map(iList.produce,    function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.bulk      = $.map(iList.bulk,       function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.specialty = $.map(iList.specialty,  function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.bread     = $.map(iList.bread,      function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.snacks    = $.map(iList.snacks,     function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.meat      = $.map(iList.meat,       function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.dairy     = $.map(iList.dairy,      function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.cheese    = $.map(iList.cheese,     function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.freezer   = $.map(iList.freezer,    function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.baking    = $.map(iList.baking,     function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.pasta     = $.map(iList.pasta,      function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.beans     = $.map(iList.beans,      function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.soup      = $.map(iList.soup,       function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.cleaning  = $.map(iList.cleaning,   function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.babies    = $.map(iList.babies,     function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.personal  = $.map(iList.personal,   function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
    list.medicine  = $.map(iList.medicine,   function(item, name) {return ListItem.create({id: name, name: name, recipe: item})})
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
    //listed in order here so blanket words don't override specific items (like 'meat' catching everything in specialties but not overriding the meat section)
    produce: ['fresh basil', 'fresh parsley', 'fresh cilanto', 'fresh chives', 'salad ingredients','potatoes','asparagus','lemon','lime','avocado','avocados','mushrooms','broccoli','spinach','carrots','onion','lettuce','tomatoes','chard','basil','garlic','cabbage','pepper','corn on','parsnip','turnip','bananas','cucumber','zucchini','cilantro','arugula','celery','scallions','vegetables','berries','berry', 'green beans', 'melon', 'cantelope', 'grapes', 'oranges'],
    bulk: ['rice', 'almond', 'peanut', 'pecans', 'lunchmeat'],
    meat: ['chicken', 'beef', 'ground', 'sausage', 'pork', 'tilapia', 'steak', 'patties', 'hamburgers', 'salmon', 'cod', 'veal', 'roast', 'hot dogs', 'weiners'],
    specialty: ['deli', 'meat', 'ham', 'turkey', 'good cheese', 'fancy cheese', 'nice crackers', 'fancy crackers', 'good bread', 'fancy bread', 'french bread', 'ciabatta', 'baugette', 'baggette', 'mozzarella balls'],
    bread: ['bread', 'buns', 'hoagies', 'pita', 'tortillas', 'flour tortilla', 'corn tortilla'],
    snacks: ['tortilla chips', 'corn chips', 'potato chips', 'nuts', 'tortilla', '7up', 'root', 'beer', 'crackers', 'dried', 'sparkling water', 'raisen', 'raison', 'applesauce', 'juice'],
    dairy: ['yogurt', 'half', 'milk', 'eggnog', 'whipped', 'cottage'],
    cheese: ["cheese", "cheddar", 'parmesan', 'mozzarella', 'jack', 'sour', 'bacon', 'block of', 'salsa', 'feta', 'provalone', 'eggs', 'butter'],
    freezer: ['frozen', 'ice', 'pie'],
    baking: ['poppy', 'spice', 'dill', 'poppyseed', 'oregano', 'chives', 'coconut', 'yeast', 'honey', 'oil', 'sugar', 'salt', 'chocolate chips', 'flour', 'extract', 'cocoa', 'coffee', 'tea', 'filters', 'sprinkles', 'baking', 'pancake', 'syrup', 'applesauce', 'starch'],
    pasta: ['orzo', 'dressing', 'sauce', 'rigatoni', 'spaghetti', 'noodle', 'tahini', 'macaroni', 'tortellini', 'tortallini', 'tortillini', 'quinoa', 'pasta'],
    beans: ['beans', 'cannellini', 'chilies', 'garbanzo', 'chickpeas', 'artichoke heart'],
    soup: ['ramen', 'broth', 'panko', 'soup', 'yakisoba'],
    cleaning: ['detergent', 'soap', 'bleach', 'washer', 'dryer', 'clean', 'sponge'],
    babies: ['bb', 'diaper', 'pullup', 'pull up', 'wipes', 'baby'],
    personal: ['face', 'deoder', 'tooth', 'eye', 'lip', 'makeup', 'hair', 'shampoo', 'condition', 'chapstick', 'tampons', 'pads'],
    medicine: ['medicine', 'vitamin', 'allergy', 'pain', 'tylenol', 'ibuprof', 'advil', 'aceto', 'bandaid', 'band aid', 'neospo', 'cough', 'suppres']
  },
  updateLocalChecklist: function() {
    let list = this.get('controller').get('list')
    let checkedOff = []
    for(let i of list.staples) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.produce) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.bulk) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.bread) { if (i.checkedOff) { checkedOff.push(i.id) } }
    for(let i of list.snacks) { if (i.checkedOff) { checkedOff.push(i.id) } }
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
      for(let i of list.bulk) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.bread) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
      for(let i of list.snacks) { if (checkedOff.indexOf(i.id) != -1) { i.set('checkedOff', true)} }
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
