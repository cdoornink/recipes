import Ember from 'ember';
import ListItem from '../models/listItem'
import CurrentListRoute from '../routes/current-list'

export default CurrentListRoute.extend({
  model: function(params) {
    localStorage.setItem('path', 'last-list')
    return this.store.find('list', 'last')
  },
});
