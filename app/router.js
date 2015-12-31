import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('group', {path: '/group/:id'});
  this.route('recipe', {path: '/recipe/:id'});
  this.route('current-list');
  this.route('list');
  this.route('last-list');
});

export default Router;
