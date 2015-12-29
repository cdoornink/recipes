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
      id: 2,
      name: "Week 2",
      recipes: ['chicken-caesar', 'chicken-tacos', 'korean-beef', 'orzo-soup', 'white-pizza', 'yakisoba']
    },
    {
      id: 5,
      name: "Week 5",
      recipes: ['blt-salad', 'rigatoni', 'chicken-wraps', 'chicken-noodle', 'santa-fe-chicken', 'chicken-casserole']
    }
  ]
})

export default Group;
