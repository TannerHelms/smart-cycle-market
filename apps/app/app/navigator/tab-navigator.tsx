import { AntDesign } from '@expo/vector-icons';
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NewListing } from '@views/new-listing';
import { AppNavigator } from "./app-navigator";
import { ProfileNavigator } from "./profile-navigator";
const Tab = createBottomTabNavigator();


const getOptions = (iconName: string): BottomTabNavigationOptions => {
    return {
        tabBarIcon({ color, focused, size }) {
            return <AntDesign name={iconName as any} size={size} color={color} />
        },
        title: "Home"
    }
}

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HomeNavigator" component={AppNavigator} options={getOptions("home")} />
            <Tab.Screen name="NewListing" component={NewListing} options={getOptions("pluscircleo")} />
            <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={getOptions("user")} />
        </Tab.Navigator>
    )
}

export default TabNavigator;