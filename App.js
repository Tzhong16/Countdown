import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventList from './EventList';
import { YellowBox } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import EventForm from './EventForm';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated'
]);

const AppNavigator = createStackNavigator({
  list: {
    screen: EventList,
    navigationOptions: () => ({ title: 'Your Events' })
  },
  form: {
    screen: EventForm,
    navigationOptions: () => ({ title: 'Add an event' })
  }
});
// ,
// navigationOptions: () => ({
//   title: 'Your events'
// })

// ,
// form: {
//   screen: EventForm,
//   navigationOptions: () => ({
//     title: 'Add an event'
//   })
// }
export default createAppContainer(AppNavigator);
