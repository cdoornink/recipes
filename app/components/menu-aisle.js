import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    itemClick: function(item) {
      this.sendAction('checkListItemClick', item)
    },
    deleteItem: function(item) {
      this.sendAction('removeFromList', item)
    }
  }
});
