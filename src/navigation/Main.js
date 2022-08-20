import * as React from 'react';
import { View, Text, Button} from 'react-native';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Login'
import DashBoard from './DashBoard';



function HomeScreen(props) {

    const onLoginPress =  () => {
        props.navigation.navigate('Login')
    }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="go to login screen" onPress={onLoginPress}></Button>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>   
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" 
                      component={Login} 
                      options = {{
                        headerTitle: 'login to System',
                        headerRight: () => {
                          <Button 
                            onPress={() => alert('this is a Button')}
                            tittle='info'
                            color='#fff'
                            >
                         </Button>
                        }

                      }}
                      />
                      <Stack.Screen
                        name='DashBoard'
                        component = {DashBoard}

                      >
                        
                      </Stack.Screen>

                      
                      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;