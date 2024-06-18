import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import { icons } from "../../constants";

type props = {
  icon: any;
  name: string;
  color: string;
  focused: boolean;
};
const TabIcon = ({ icon, name, color, focused }: props) => {
  const styles = `${focused ? "text-" : "text-gray-500"}`;
  return (
    <View className="justify-center items-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-[10px]`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 2,
            borderTopColor: "#232533",
            height: 70, // px
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={icons.home}
                name="Home"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={icons.bookmark}
                name="Bookmark"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={icons.plus}
                name="Create"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={icons.profile}
                name="Profile"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

      </Tabs>
    </>
  );
};

export default TabsLayout;
