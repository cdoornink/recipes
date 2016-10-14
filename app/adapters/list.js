import ApplicationAdapter from './application';
import config from '../config/environment';

export default ApplicationAdapter.extend({
  pathForType: function(type) {
    let path = 'lists'
    if (config.environment == 'development') {
      path = "devvingLists"
    }
    return 'lists' //remove before merging this commit
    return path
  }
});
