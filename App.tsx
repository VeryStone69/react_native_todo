import * as React from 'react';
import {TouchableWithoutFeedback, Keyboard, Button} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {ReactElement, ReactNode} from "react";
import {ExerciseScreen} from "./common/component/ExerciseList/ExerciseScreen/ExerciseScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeScreen} from "./common/component/HomeScreen/HomeScreen";



export function MyBackButton() {
    const navigation = useNavigation();

    return (
        <Button
            title="Back"
            onPress={() => {
                navigation.goBack();
            }}
        />
    );
}



const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
)

const Stack:any = createNativeStackNavigator();
function App() {
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


//======================================================================================================== OLD VERSION
// import {Alert, Keyboard, StyleSheet, Text, TextInput, Touchable, TouchableWithoutFeedback, View} from 'react-native';
// import {ReactElement, ReactNode, useState} from "react";
// import {Button, CheckBox} from "react-native-elements";
//
// type TaskType = {
//     id: number
//     title: string
//     isDone: boolean
// }
//
// export default function App() {
//     const [value, setValue] = useState("");
//     const [task, setTasks] = useState([
//         {id: 0, title: "HTML", isDone: false},
//         {id: 1, title: "CSS", isDone: false},
//         {id: 2, title: "JS", isDone: false},
//         {id: 3, title: "React", isDone: false},
//         {id: 4, title: "Vue", isDone: false},
//     ])
//     const changeTask = (taskId: number) => {
//         const updatedTasks = task.map(taskItem => {
//             if (taskItem.id === taskId) {
//                 return {...taskItem, isDone: !taskItem.isDone};
//             }
//             return taskItem;
//         });
//         setTasks(updatedTasks);
//     }
//     const addTask = () => {
//         if (value.length >= 35) {
//             Alert.alert(JSON.stringify("Напиши покороче. Тут ограничение в 35 символов"))
//             return
//         }
//         if (value.trim()) {
//             const newTasks = {id: task.length + 1, title: value, isDone: false}
//             setTasks([...task, newTasks])
//             setValue("")
//         } else {
//             Alert.alert(JSON.stringify("Напиши что-нибудь"))
//         }
//
//     }
//     const deleteTask = (taskId: number) => {
//         setTasks([...task.filter(el => el.id != taskId)])
//         Alert.alert(String(taskId))
//     }
//     return (
//         <HideKeyboard>
//             <View style={styles.container}>
//                 <View style={[styles.inputContainer]}>
//                     <TextInput value={value} style={[styles.input]} onChangeText={setValue}/>
//                     <Button title="Add" onPress={addTask} buttonStyle={[styles.addButton]}></Button>
//                 </View>
//
//                 <View>
//                     {task.map((el: TaskType) => {
//                         return <View key={el.id} style={[styles.inputContainer]}>
//                             <CheckBox
//                                 title={el.title}
//                                 checked={el.isDone}
//                                 onPress={() => changeTask(el.id)}
//                                 checkedColor='#272343'
//                                 containerStyle={[el.isDone ? styles.checkboxNegative : styles.checkboxActive]}
//                             />
//                             <Button title="Del" onPress={() => deleteTask(el.id)}
//                                     buttonStyle={[styles.delButton]}></Button>
//                         </View>
//                     })}
//                 </View>
//             </View>
//         </HideKeyboard>
//     );
// }
//
// const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
// )
//
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fffffe',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     input: {
//         backgroundColor: '#bae8e8',
//         borderRadius: 5,
//         width: 300,
//         fontSize: 20,
//         padding: 8,
//         paddingHorizontal: 15
//     },
//     checkboxActive: {
//         opacity: 1
//     },
//     checkboxNegative: {
//         opacity: 0.2
//     },
//     addButton: {
//         backgroundColor: '#ffd803',
//         color: "#272343"
//     },
//     delButton: {
//         backgroundColor: "#ff0303"
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
// });
// const globalStyles = StyleSheet.create({
//     border: {
//         borderStyle: "solid",
//         borderWidth: 5,
//         borderColor: "#2d334a",
//         borderRadius: 5
//
//     }
// })
