import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('string'),
  groups: DS.hasMany('group', {key: 'groups', async: true}),
  addons: DS.attr('string')
});
