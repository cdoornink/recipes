import PikadayInput from 'ember-pikaday/components/pikaday-input';

export default PikadayInput.extend({
  focusOut: function() {
    console.log('focusOut');
  },
  userSelectedDate: function() {
    this._super();

    var selectedDate = this.get('pikaday').getDate()

    if (this.get('useUTC')) {
      selectedDate = moment.utc([selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()]).toDate();
    }

    let id = this.$().closest('.calendar').data().item

    this.sendAction('selectedDate', {id: id, selectedDate: selectedDate})
  }
});
