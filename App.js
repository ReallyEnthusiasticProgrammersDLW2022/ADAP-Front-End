import { NavigationContainer } from '@react-navigation/native';
import HomePage from './containers/HomePage';
import UploadPage from './containers/UploadPage';
import PlansPage from './containers/PlansPage';
import PreviewPage from './containers/PreviewPage';
import PricingPage from './containers/PricingPage';
import AboutPage from './containers/AboutPage';
import CBDPage from './containers/CBDPage';
import ViewImagePage from './containers/ViewImagePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none'}}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="PlansPage" component={PlansPage} />
        <Stack.Screen name="UploadPage" component={UploadPage} />
        <Stack.Screen name="PreviewPage" component={PreviewPage} />
        <Stack.Screen name="PricingPage" component={PricingPage} />
        <Stack.Screen name="AboutPage" component={AboutPage} />
        <Stack.Screen name="CBDPage" component={CBDPage} />
        <Stack.Screen name="ViewImagePage" component={ViewImagePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}