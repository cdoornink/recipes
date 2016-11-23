import DS from 'ember-data';

var Group = DS.Model.extend({
  name: DS.attr('string'),
  recipes: DS.hasMany('recipe', {key: 'recipes', async: true}),
  lists: DS.hasMany('list', {key: 'lists', async: true}),
  current: Ember.computed('lists', function() {
    let current = false
    if (this.get('lists')) {
      this.get('lists').forEach(function(i,o){
        if (i.id == 'current') {
          current = true
        }
      })
    }
    return current
  })
});

Group.reopenClass({
  FIXTURES: [
    {
      "id" : "1",
      "name" : "Week 1",
      "recipes" : [
        "baked-chicken-salad",
        "chicken-asparagus-stir-fry",
        "chicken-avacado-burritos",
        "ramen",
        "slow-cooker-french-dip",
        "white-chicken-chili",
      ]
    }, {
      "id" : "2",
      "name" : "Week 2",
      "recipes" : [
        "chicken-caesar",
        "chicken-tacos",
        "korean-beef",
        "orzo-soup",
        "white-pizza",
        "yakisoba",
      ]
    }, {
      "id" : "3",
      "name" : "Week 3",
      "recipes" : [
        "crispy-sw-chicken-wrap",
        "fish-taco-bowl",
        "grilled-cheese-avocado",
        "honey-salmon",
        "slow-cooker-garlic-chicken",
        "steak-salad",
        "turkey-burger",
      ]
    }, {
      "id" : "4",
      "name" : "Week 4 (summer!)",
      "recipes" : [
        "asparagus-salad",
        "honey-mustard-chicken",
        "bbq",
        "avocado-caprese-chicken-salad",
        "chicken-bacon-garlic-pasta",
      ]
    }, {
      "id" : "5",
      "name" : "Week 5",
      "recipes" : [
        "blt-salad",
        "chicken-casserole",
        "chicken-noodle",
        "chicken-wraps",
        "rigatoni",
        "santa-fe-chicken",
      ]
    },
    {
      "id" : "6",
      "name" : "Week 6",
      "recipes" : [
        "grilled-steaks",
        "one-pot-mac",
        "pulled-pork",
        "sausage-kale-soup",
        "souvlaki-kabobs",
        "turkey-panini",
      ]
    },
    {
      "id" : "7",
      "name" : "Week 7",
      "recipes" : [
        "braised-chicken",
        "steak-fajitas",
        "spinach-artichoke-pasta",
        "chicken-guac-sliders",
        "tenderloin-sandwich",
        "sweet-potato-salad",
      ]
    }
  ]
})


export default Group;
