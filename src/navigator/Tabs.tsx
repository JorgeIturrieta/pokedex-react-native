import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1 } from './Tab1';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Tab2Screen } from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}
            tabBarOptions={{
                activeTintColor: '#5856D6',
                labelStyle: {
                    marginBottom: (Platform.OS === 'android') ? 10 : 0,
                },
                style: {
                    position:'absolute',
                    backgroundColor:'rgba(255,255,255,0.90)',
                    borderWidth: 0,
                    elevation: 0,
                    height:(Platform.OS === 'android') ? 60 : 90,
                }
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={Tab1}
                options={{
                    tabBarLabel: "Listado",
                    tabBarIcon: ({ color }) =>
                        <Icon
                            color={color}
                            size={30}
                            name="list-outline"
                        />
                }}
            />
            <Tab.Screen 
            name="Settings" 
            component={Tab2Screen} 
            options={{
                tabBarLabel: "Buscar",
                tabBarIcon: ({ color }) =>
                    <Icon
                        color={color}
                        size={30}
                        name="search-outline"
                    />
            }}
            />
        </Tab.Navigator>
    );
}