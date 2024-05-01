import {Alert, Keyboard, StyleSheet, Text, TextInput, Touchable, TouchableWithoutFeedback, View} from 'react-native';
import {ReactElement, ReactNode, useState} from "react";
import {Button, CheckBox} from "react-native-elements";
import { Swipeable } from 'react-native-gesture-handler';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export default function App() {
    const [value, setValue] = useState("USEstate value");
    const [task, setTasks] = useState([
        {id: 0, title: "HTML", isDone: true},
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Vue", isDone: false},
    ])
    const toggleTask = (taskId: number) => {
        const updatedTasks = task.map(taskItem => {
            if (taskItem.id === taskId) {
                return {...taskItem, isDone: !taskItem.isDone};
            }
            return taskItem;
        });
        setTasks(updatedTasks);
    }
    const addTask = () => {
        if(value.trim()){
            const newTasks = {id:task.length+1,title:value,isDone:false}
            setTasks([...task,newTasks])
            setValue("")
        } else {
            Alert.alert(JSON.stringify("Напиши что-нибудь"))
        }

    }
    const deleteTask = (taskId:number) =>{
        setTasks([...task.filter(el=>el.id!=taskId )])
        Alert.alert(String(taskId))
    }
    return (
        <HideKeyboard>
            <View style={styles.container}>

                <View style={[styles.inputContainer]}>
                    <TextInput value={value} style={[styles.input]} onChangeText={setValue}/>
                    <Button title="Add" onPress={addTask} buttonStyle={[styles.addButton]}></Button>
                </View>

                <View>
                    {task.map((el: TaskType) => {
                        return <View key={el.id} style={[styles.inputContainer]}>
                            <CheckBox
                                title={el.title}
                                checked={el.isDone}
                                onPress={() => toggleTask(el.id)}
                                checkedColor='#272343' // Здесь задается цвет галочки
                            />
                            <Button title="Del" onPress={()=>deleteTask(el.id)} buttonStyle={[styles.addButton]}></Button>
                        </View>
                    })}
                </View>
            </View>
        </HideKeyboard>
    );
}

const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffffe',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#bae8e8',
        borderRadius: 5,
        width: 200,
        fontSize: 20,
        padding: 8,
        paddingHorizontal: 15
    },
    addButton: {
        backgroundColor: '#ffd803',
        color: "#272343"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
const globalStyles = StyleSheet.create({
    border: {
        borderStyle: "solid",
        borderWidth: 5,
        borderColor: "#2d334a",
        borderRadius: 5

    }
})
