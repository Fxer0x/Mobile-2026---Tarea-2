import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  NavigationContainer,
  DarkTheme as NavDark,
  DefaultTheme as NavLight,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import ArticleListScreen from "./src/screens/ArticleListScreen";
import ArticleDetailScreen from "./src/screens/ArticleDetailScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import { registerBackgroundFetch } from "./src/services/backgroundTask";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavLight,
  reactNavigationDark: NavDark,
});

const CombinedLight = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: { ...MD3LightTheme.colors, ...LightTheme.colors },
};
const CombinedDark = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: { ...MD3DarkTheme.colors, ...DarkTheme.colors },
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ArticleList" component={ArticleListScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}

function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icon =
            route.name === "HomeTab" ? "home-outline" : "heart-outline";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ title: "Favoritos" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const isDark = useColorScheme() === "dark";

  useEffect(() => {
    registerBackgroundFetch().catch(console.warn);
  }, []);

  return (
    <PaperProvider theme={isDark ? CombinedDark : CombinedLight}>
      <NavigationContainer theme={isDark ? DarkTheme : LightTheme}>
        <RootTabs />
      </NavigationContainer>
    </PaperProvider>
  );
}
