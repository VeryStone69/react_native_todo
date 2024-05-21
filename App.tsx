import * as React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ReactElement, ReactNode} from "react";
import {ExerciseScreen} from "./common/component/ExerciseList/ExerciseScreen/ExerciseScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeScreen} from "./common/component/HomeScreen/HomeScreen";

type RootStackParamList = {
    Home: undefined;
    Exercise: { exerciseName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
)

function App() {
    //TODO: delete this console later
    console.log("render_App")

    return (
        <HideKeyboard>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Exercise" component={ExerciseScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </HideKeyboard>
    );
}


export default App;
