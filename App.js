import * as React from 'react';
import { View, Platform } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from  './components/History';
import {purple , white} from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; 
import { createMaterialTopTabNavigator,createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const Tabs = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}


const TabNav = createAppContainer(Platform.OS === 'ios' ? createBottomTabNavigator(Tabs, navigationOptions) : createMaterialTopTabNavigator(Tabs, navigationOptions));

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{flex:1}}>
        <View style={{height:30}} />
        <TabNav />
      </View>
    </Provider>
  );
}