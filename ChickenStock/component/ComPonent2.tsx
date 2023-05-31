import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chart from './TabContents/Tab1';
import Buy from './TabContents/Tab2';
import Price from './TabContents/Tab3';
import News from './TabContents/Tab4';
import Info from './TabContents/Tab5';

const Tab = createMaterialTopTabNavigator();

const ComPonent2 = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chart" component={Chart} />
      <Tab.Screen name="Buy" component={Buy} />
      <Tab.Screen name="Price" component={Price} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Info" component={Info} />
    </Tab.Navigator>
  );
};

export default ComPonent2;
