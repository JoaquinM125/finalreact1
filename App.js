import React from "react";
import {Platform} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import Home from "./screens/Home";
import Blog from "./screens/Blog";
import BlogDetails from "./screens/BlogDetails";
import store from "./redux/store";

const Stack = createStackNavigator();

function NavStack() {
  return (
    <Provider store={store}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            ...Platform.select({
              'ios': {
                backgroundColor: '#FCE694'
              },
              'android': {
                backgroundColor: '#679436'
              },
              'web': {
                backgroundColor: '#8FBB99'
              },
            })
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={Home}
          options={{ title: "CanchApp" }}
        />
        <Stack.Screen
          name="Evento"
          component={Blog}
          options={{ title: "Sobre el partido" }}
        />
        <Stack.Screen
          name="AddEvento"
          component={BlogDetails}
          options={{ title: "Nuevo partido" }}
        />
      </Stack.Navigator>
    </Provider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}
