import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AddExerciseForm, ExerciseData} from "../AddExerciseForm/AddExerciseForm";
import uuid from "react-native-uuid";
import {Alert, Button, View} from "react-native";
import {ExerciseList} from "../ExerciseList/ExerciseList";
import * as React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// export type Exercise = {
//     exerciseName: string
//     id: string | number[]
// }




export function HomeScreen() {
    // const [exercises, setExercises] = useState<Exercise[]>([]);
    const navigation = useNavigation();

    const handleAddExercise = async (exerciseName: string) => {
        //============== OLD VERSION WITHOUT ASYNC STORAGE ==============
        // if (!!exerciseData.exerciseName.trim()) {
        //     const newExercise = {id: uuid.v4(), ...exerciseData};
        //     setExercises([...exercises, newExercise]);
        // } else {
        //     Alert.alert(JSON.stringify("Напиши покороче. Тут ограничение в 35 символов"))
        // }
        if (!exerciseName.trim()) {
            return Alert.alert('Ошибка', 'Невозможно сохранить упражнение без названия');
        }
        try {
            const defaultSettingsForExercise = {
                exerciseName,
                id:uuid.v4(),
                exerciseStatic: {
                    totalSets_local:null,
                    totalWeight_local: null,
                    maxWeight_local: null
                }
            }
            const key = `${exerciseName.trim()}`; // задаем ключ из названия категории и имени
            await AsyncStorage.setItem(key, JSON.stringify(defaultSettingsForExercise));
            Alert.alert('Сохранено!', `Упражнение "${exerciseName}" сохранено с ключом "${key}".`);
        } catch (e) {
            console.error('Ошибка сохранения упражнения', e);
            Alert.alert('Ошибка', 'Не удалось сохранить упражнение.');
        }
    };
    // =============== А это НУЖНО?!
    // const handleSelectExercise = (selectedExercise: string) => {
    //     Alert.alert(JSON.stringify(`Выбрано упражнение: ${selectedExercise}`))
    // };
    return (
        <>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <AddExerciseForm onAddExercise={handleAddExercise}/>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <ExerciseList
                    // exercises={exercises}
                    // onSelectExercise={handleSelectExercise}
                    navigation={navigation}/>
            </View>
            <Button title={"Clean"} onPress={ async ()=>{
                try {
                    await AsyncStorage.clear()
                } catch(e) {
                    Alert.alert('Ошибка', `${e}`);
                }
            }}></Button>
        </>


    );
}