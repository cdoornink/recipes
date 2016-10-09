import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['add-recipe'],
  classNameBindings: ['icon'],
  icon: Ember.computed('recipe', function() {
    let icon = 'icon-plus'
    var c = this.container.lookup('controller:application').get('model')
    if (c.currentRecipes.indexOf(this.get('recipe.id')) != -1) {
      icon = 'icon-checkmark'
    }
    return icon
  }),
  click(event) {
    event.preventDefault()
    if (this.get('icon') == 'icon-plus') {
      this.sendAction('addRecipeToList', this.get('recipe'))
      this.set('icon', 'icon-checkmark')
    } else {
      this.sendAction('removeRecipeFromList', this.get('recipe'))
      this.set('icon', 'icon-plus')
    }
    return false;
  }
});
