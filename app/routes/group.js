import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    localStorage.setItem('path', 'group/'+params.id)
    return this.store.find('group', params.id)
  },
  // setupController: function(controller, model) {
  //   this._super(controller, model)
  //   model.get('recipes').then(function(recipes) {
  //     let iList = {'menu': [''], 'produce': {}, 'bulk': {}, 'bread': {}, 'snacks': {}, 'meat': {}, 'dairy': {}, 'cheese': {}, 'freezer': {}, 'baking': {}, 'pasta': {}, 'beans': {}, 'soup': {}}
  //     recipes.forEach(function(recipe, i) {
  //
  //       iList['menu'].push(recipe.get('title'))
  //       recipe.get('ingredients').forEach(function(ingredient, ii) {
  //         if (ingredient.aisle) {
  //           let name = ingredient.name.toLowerCase()
  //           let nameValue = iList[ingredient.aisle][name]
  //           //check here for nameValue to either have an s at the end or for the new value to have one
  //           if (nameValue) {
  //             nameValue = nameValue + ', '+(i+1).toString()
  //           } else {
  //             nameValue = (i+1).toString()
  //           }
  //           iList[ingredient.aisle][name] = nameValue
  //         }
  //       })
  //     })
  //
  //     iList.staples = [{name: 'little tomatoes'},{name: 'bananas'},{name: 'avocados'},{name: 'lettuce'},{name: 'cucumber'},{name: 'broccoli'},{name: 'berries'},{name: 'bell pepper'},{name: 'bread'},{name: 'crackers'},{name: 'applesauce'},{name: 'pecans'},{name: 'yogurt'},{name: 'string cheese'},{name: 'almond butter'},{name: 'peanut butter'},{name: 'honey'},{name: 'chocolate chips'},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''}]
  //
  //     iList.produce   = $.map(iList.produce,    function(item, name) {return {name: name, recipe: item}})
  //     iList.bulk      = $.map(iList.bulk,       function(item, name) {return {name: name, recipe: item}})
  //     iList.bread     = $.map(iList.bread,      function(item, name) {return {name: name, recipe: item}})
  //     iList.snacks = $.map(iList.snacks,  function(item, name) {return {name: name, recipe: item}})
  //     iList.meat      = $.map(iList.meat,       function(item, name) {return {name: name, recipe: item}})
  //     iList.dairy     = $.map(iList.dairy,      function(item, name) {return {name: name, recipe: item}})
  //     iList.cheese    = $.map(iList.cheese,     function(item, name) {return {name: name, recipe: item}})
  //     iList.freezer   = $.map(iList.freezer,    function(item, name) {return {name: name, recipe: item}})
  //     iList.baking    = $.map(iList.baking,     function(item, name) {return {name: name, recipe: item}})
  //     iList.pasta     = $.map(iList.pasta,      function(item, name) {return {name: name, recipe: item}})
  //     iList.beans     = $.map(iList.beans,      function(item, name) {return {name: name, recipe: item}})
  //     iList.soup      = $.map(iList.soup,       function(item, name) {return {name: name, recipe: item}})
  //     controller.set('list', iList)
  //   })
  // },
  actions: {
    addGroupToList: function() {
      this.store.find('list', 'current').then((list) => {
        let groups = list.get('groups')
        let group = this.controller.get('model')
        console.log(groups)
        groups.addObject(group)
        list.save()
        group.save().then((result) => {
          console.log('list saved (supposedly)')

          //change the link to be a confirmation and a remove button maybe??
          // $('.dialog').addClass('confirming')
          // Ember.run.later(() => {
          //   this.container.lookup('controller:dialogs/addToList').set('itemToAdd', null)
          //   $('.dialog').removeClass('confirming')
          //   $('.input-field input').focus()
          // }, 1000)
        });
      })
    }
  }
});
