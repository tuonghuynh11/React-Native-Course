import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllExpense from "./Screens/AllExpense";
import RecentExpense from "./Screens/RecentExpense";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./Component/UI/IconButton";
import ManageExpense from "./Screens/ManageExpense";
import ExpensesContextProvider from "./Store/expense-context";
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
export default function App() {
  function ExpensesOverview({ navigation }) {
    function navigateToManageExpense() {
      navigation.navigate("ManageExpense");
    }
    return (
      <BottomTab.Navigator
        screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
            color: "white",
          },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          tabBarLabelStyle: {
            color: "white",
          },
          headerRight: ({ tintColor, size }) => {
            return (
              <IconButton
                icon={"add"}
                size={24}
                color={tintColor}
                onPress={navigateToManageExpense}
              ></IconButton>
            );
          },
        }}
      >
        <BottomTab.Screen
          name="RecentExpense"
          component={RecentExpense}
          options={{
            title: "Recent Expense",
            tabBarLabel: "Recent Expenses",

            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="hourglass" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="AllExpense"
          component={AllExpense}
          options={{
            title: "All Expenses",
            tabBarLabel: "All Expenses",
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="calendar" size={size} color={color} />;
            },
          }}
        />
      </BottomTab.Navigator>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer style={styles.container}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    alignItems: "center",
    justifyContent: "center",
  },
});
