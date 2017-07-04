import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

export const selectNotifications = () => createSelector(
  (state) => state.get('notifications'),
  (notifications) => {
    const collection = notifications.toJS();
    if (collection.length > 1) {
      console.log('sorting');
      sortBy(collection, ['dismissable', 'date']);
    }
    return collection;
  }
);
