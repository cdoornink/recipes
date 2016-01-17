import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('string'),
  recipes: DS.hasMany('recipe', {key: 'recipes', async: true}),
  madeRecipes: DS.hasMany('recipe', {key: 'madeRecipes', async: true}),
  datedRecipes: DS.attr('string'),
  addons: DS.attr('string')
});
