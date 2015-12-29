import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['list-filter'],
  filterValue: '',
  valueChanged: Ember.observer('filterValue', function(){
    let val = this.get('filterValue').toLowerCase()
    $(this.get('listClass')).show();
    this.$().find('.filter-clear').removeClass('icon-search').addClass('icon-cancel-circle')
    $(this.get('listClass')).each(function() {
      if ($(this).find('.recipe-link-item').html().toLowerCase().indexOf(val) == -1) {
        $(this).hide()
      }
    })
  }),
  actions: {
    clear: function() {
      this.set('filterValue', '')
      this.$().find('.filter-clear').addClass('icon-search').removeClass('icon-cancel-circle')
      $(this.get('listClass')).show();
    }
  }
});
