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
    this.ingredientKeys = Object.keys(this.aisleDesignations)

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
        this.addItemToAisle(item, recipeId, this.aisleDesignations[key])
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
  },
  aisleDesignations: {
    //prefix catch all adjectives
    'baking': 'baking',
    'frozen': 'freezer',
    'fresh': 'produce',
    // regular
    '7up': 'snacks',
    'aceto': 'medicine',
    'advil': 'medicine',
    'allergy': 'medicine',
    'applesauce': 'baking',
    'artichoke heart': 'beans',
    'arugula': 'produce',
    'asparagus': 'produce',
    'avocado': 'produce',
    'bacon': 'cheese',
    'baggette': 'specialty',
    'baugette': 'specialty',
    'balsamic': 'pasta',
    'bananas': 'produce',
    'band aid': 'medicine',
    'bandaid': 'medicine',
    'basil': 'baking',
    'bb cr': 'babies',
    'beef broth': 'soup',
    'beef': 'meat',
    'beer': 'snacks',
    'berries': 'produce',
    'berry': 'produce',
    'bleach': 'cleaning',
    'fancy bread': 'specialty',
    'good bread': 'specialty',
    'nice bread': 'specialty',
    'broccoli': 'produce',
    'broth': 'soup',
    'brussel sprout': 'produce',
    'buns': 'bread',
    'cabbage': 'produce',
    'caesar': 'pasta',
    'cannellini': 'beans',
    'cantelope': 'produce',
    'carrot': 'produce',
    'cauliflower': 'produce',
    'celery': 'produce',
    'cereal': 'cereal',
    'chapstick': 'personal',
    'chard': 'produce',
    'cheddar': 'cheese',
    'cheerios': 'cereal',
    'club soda': 'liquor',
    'fancy cheese': 'specialty',
    'nice cheese': 'specialty',
    'good cheese': 'specialty',
    'cheese': 'cheese',
    'chicken': 'meat',
    'chickpeas': 'beans',
    'chilies': 'beans',
    'fresh chives': 'produce',
    'chives': 'baking',
    'chocolate chips': 'baking',
    'ciabatta': 'specialty',
    'cilantro': 'baking',
    'clean': 'cleaning',
    'cocoa': 'baking',
    'coconut': 'baking',
    'cod': 'seafood',
    'coffee': 'baking',
    'condition': 'personal',
    'corn chips': 'snacks',
    'corn meal': 'baking',
    'corn starch': 'baking',
    'corn tortilla': 'bread',
    'cornmeal': 'baking',
    'cornstarch': 'baking',
    'corn': 'produce',
    'cottage': 'dairy',
    'cough': 'medicine',
    'cranberry': 'pasta',
    'crab': 'seafood',
    'fancy crackers': 'specialty',
    'nice crackers': 'specialty',
    'good crackers': 'specialty',
    'party crackers': 'specialty',
    'crackers': 'snacks',
    'cucumber': 'produce',
    'deli': 'specialty',
    'deod': 'personal',
    'detergent': 'cleaning',
    'diaper': 'babies',
    'dill': 'baking',
    'dressing': 'pasta',
    'dry onion': 'soup',
    'dried': 'snacks',
    'dryer': 'cleaning',
    'eggnog': 'dairy',
    'eggs': 'cheese',
    'extract': 'baking',
    'feta': 'cheese',
    'filters': 'baking',
    'flour tortilla': 'bread',
    'flour': 'baking',
    'food coloring': 'baking',
    'french bread': 'specialty',
    'garbage bag': 'soup',
    'garbanzo': 'beans',
    'garlic': 'produce',
    'ginger': 'baking',
    'goldfish': 'snacks',
    'graham': 'snacks',
    'granola': 'cereal',
    'grapes': 'produce',
    'green beans': 'produce',
    'hamburgers': 'meat',
    'hoagies': 'bread',
    'honey': 'spreads',
    'hot dogs': 'meat',
    'ibuprof': 'medicine',
    'ice cream': 'freezer',
    'icecream': 'freezer',
    'jack': 'cheese',
    'kale': 'produce',
    'ketchup': 'pasta',
    'lemon juice': 'pasta',
    'lemon': 'produce',
    'lettuce': 'produce',
    'light bulb': 'soup',
    'lightbulb': 'soup',
    'lights': 'soup',
    'lime juice': 'pasta',
    'lime': 'produce',
    'listerine': 'personal',
    'lobster': 'seafood',
    'lunchmeat': 'specialty',
    'lunch meat': 'specialty',
    'macaroni': 'pasta',
    'mayo': 'pasta',
    'makeup': 'personal',
    'medicine': 'medicine',
    'melen': 'produce',
    'melon': 'produce',
    'mint': 'produce',
    'mouthwash': 'personal',
    'mouth wash': 'personal',
    'mozzarella balls': 'specialty',
    'mozzarella': 'cheese',
    'mushrooms': 'produce',
    'mustard': 'pasta',
    'neospo': 'medicine',
    'noodle': 'pasta',
    'nuts': 'bulk',
    'oatmeal': 'cereal',
    'oats': 'cereal',
    'onion dip': 'snacks',
    'onion': 'produce',
    'oranges': 'produce',
    'oregano': 'baking',
    'orzo': 'pasta',
    'pain': 'medicine',
    'pancake': 'cereal',
    'panko': 'soup',
    'paprika': 'baking',
    'parchment': 'soup',
    'parmesan': 'cheese',
    'parsley': 'baking',
    'parsnip': 'produce',
    'pasta': 'pasta',
    'patties': 'meat',
    'peanut oil': 'baking',
    'peanut': 'spreads',
    'pecans': 'bulk',
    'black pepper': 'baking',
    'pepper spice': 'baking',
    'pepper': 'produce',
    'pie': 'freezer',
    'pita': 'specialty',
    'plastic bag': 'soup',
    'plastic wrap': 'soup',
    'poppy': 'baking',
    'poppyseed': 'baking',
    'pork': 'meat',
    'potato chips': 'snacks',
    'potato': 'produce',
    'provalone': 'cheese',
    'provolone': 'cheese',
    'pull up': 'babies',
    'pullup': 'babies',
    'quinoa': 'pasta',
    'raisen': 'snacks',
    'raison': 'snacks',
    'ramen': 'soup',
    'razor': 'personal',
    'rice': 'bulk',
    'rigatoni': 'pasta',
    'roast': 'meat',
    'root': 'snacks',
    'rosemary': 'baking',
    'salad ingredients': 'produce',
    'salami': 'meat',
    'salmon': 'seafood',
    'salsa': 'produce',
    'salt': 'baking',
    'sausage': 'meat',
    'scallions': 'produce',
    'shampoo': 'personal',
    'shaving': 'personal',
    'shrimp': 'seafood',
    'sour cream': 'cheese',
    'spaghetti': 'pasta',
    'sparkling water': 'snacks',
    'spice': 'baking',
    'spinach': 'produce',
    'sponge': 'cleaning',
    'spring mix salad': 'produce',
    'sprinkles': 'baking',
    'starch': 'baking',
    'steak': 'meat',
    'sugar': 'baking',
    'suppres': 'medicine',
    'syrup': 'cereal',
    'tahini': 'pasta',
    'tampons': 'personal',
    'thyme': 'baking',
    'tilapia': 'seafood',
    'tin foil': 'soup',
    'toilet': 'cleaning',
    'diced tomat': 'beans',
    'tomato sauce': 'beans',
    'tomato soup': 'soup',
    'tomato': 'produce',
    'tonic': 'liquor',
    'tooth': 'personal',
    'tortallini': 'pasta',
    'tortellini': 'pasta',
    'tortillini': 'pasta',
    'tortilla chips': 'snacks',
    'tortillas': 'bread',
    'ground turkey': 'meat',
    'turkey': 'specialty',
    'turnip': 'produce',
    'tylenol': 'medicine',
    'veal': 'meat',
    'vegetable oil': 'baking',
    'vegetable': 'produce',
    'vinegar': 'pasta',
    'vitamin water': 'snacks',
    'vitamin': 'medicine',
    'vodka': 'liquor',
    'washer': 'cleaning',
    'weiners': 'meat',
    'whipped': 'dairy',
    'whiskey': 'liquor',
    'windex': 'cleaning',
    'wine': 'liquor',
    'wipes': 'babies',
    'yaki-soba': 'soup',
    'yakisoba': 'soup',
    'yeast': 'baking',
    'yogurt': 'dairy',
    'ziploc': 'soup',
    'zucchini': 'produce',
    //smaller catch-all words
    'baby': 'babies',
    'beans': 'beans',
    'bread': 'bread',
    'butter': 'cheese',
    'eye': 'personal',
    'face': 'personal',
    'fish': 'seafood',
    'fruit': 'produce',
    'gin': 'liquor',
    'hair': 'personal',
    'half': 'dairy',
    'ham': 'specialty',
    'kid': 'babies',
    'lip': 'personal',
    'meat': 'meat',
    'milk': 'dairy',
    'oil': 'baking',
    'pads': 'personal',
    'rum': 'liquor',
    'sauce': 'pasta',
    'soap': 'cleaning',
    'soup': 'soup',
    'tea': 'baking',
  }

});
