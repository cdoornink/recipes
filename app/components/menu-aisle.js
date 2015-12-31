import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    itemClick: function(item) {
      this.sendAction('checkListItemClick', item)
    }
  }
});
