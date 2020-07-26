import 'react-native-gesture-handler';
import * as React from 'react';

import { Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoadingScreen from './src/screens/loading';
import Home from './src/screens/home';
import Chat from './src/screens/chat';
import SearchResources from './src/screens/resources-search';
import AddResource from './src/screens/resource-add';
import EditResource from './src/screens/resource-edit';
import MyResources from './src/screens/resources-my';
import SearchHospitals from './src/screens/resources-search';
import AddHospital from './src/screens/hospital-add';
import EditHospital from './src/screens/hospital-edit';
import MyHospitals from './src/screens/hospital-my';
import AddTravel from './src/screens/travel-add';
import EditTravel from './src/screens/travel-edit';
import MyTravel from './src/screens/travel-my';
import Map from './src/screens/map';

import {
  HomeIcon,
  DonateIcon,
  SearchIcon,
  HospitalIcon,
  CoronaIcon
} from './src/images/svg-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ResourcesStackOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <Button onPress={() => navigation.navigate('Chat')} title="Chat " />
    ),
  };
};

const DonationsStackOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <Button
        onPress={() => navigation.navigate('Add Donation')}
        title="Add "
      />
    ),
  };
};

const HospitalsStackOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <Button
        onPress={() => navigation.navigate('Add Hospital')}
        title="Add "
      />
    ),
  };
};

const TravelStackOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <Button
        onPress={() => navigation.navigate('Add Travel')}
        title="Add "
      />
    ),
  };
};

const tabBarOptions = {
  // showLabel: false,
  activeTintColor: '#1062FE',
  inactiveTintColor: '#000',
  style: {
    backgroundColor: '#F1F0EE',
    paddingTop: 5,
  },
};

const TabLayout = () => (
  <Tab.Navigator
    style={{ paddingTop: 50 }}
    initialRouteName="Home"
    tabBarOptions={tabBarOptions}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
      }}
    />
    <Tab.Screen
      name="Donate"
      component={DonateStackLayout}
      options={{
        tabBarIcon: ({ color }) => <DonateIcon fill={color} />,
      }}
    />
    <Tab.Screen
      name="Hospitals"
      component={HospitalStackLayout}
      options={{
        tabBarIcon: ({ color }) => <HospitalIcon fill={color} />,
      }}
    />
    <Tab.Screen
      name="Corona count"
      component={TravelStackLayout}
      options={{
        tabBarIcon: ({ color }) => <CoronaIcon fill={color} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStackLayout}
      options={{
        tabBarIcon: ({ color }) => <SearchIcon fill={color} />,
      }}
    />
  </Tab.Navigator>
);

const DonateStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="My Donations"
      component={MyResources}
      options={DonationsStackOptions}
    />
    <Stack.Screen name="Add Donation" component={AddResource} />
    <Stack.Screen name="Edit Donation" component={EditResource} />
  </Stack.Navigator>
);

const HospitalStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Hospitals"
      component={MyHospitals}
      options={HospitalsStackOptions}
    />
    <Stack.Screen name="Add Hospital" component={AddHospital} />
    <Stack.Screen name="Edit Hospital" component={EditHospital} />
  </Stack.Navigator>
);

const TravelStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Hospitals"
      component={MyTravel}
      options={TravelStackOptions}
    />
    <Stack.Screen name="Add Travel" component={AddTravel} />
    <Stack.Screen name="Edit Travel" component={EditTravel} />
  </Stack.Navigator>
);

const SearchStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search Resources"
      component={SearchResources}
      options={ResourcesStackOptions}
    />
    <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen name="Map" component={Map} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <NavigationContainer>
        <TabLayout />
      </NavigationContainer>
    );
  }
};

export default App;
