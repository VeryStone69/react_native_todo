import {ReactElement, ReactNode, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AddExerciseForm, ExerciseData} from "../AddExerciseForm/AddExerciseForm";
import uuid from "react-native-uuid";
import {Alert, Keyboard, TouchableWithoutFeedback, View} from "react-native";
import {ExerciseList} from "../ExerciseList/ExerciseList";
import * as React from "react";

export type Exercise = {
    exerciseName: string
    id: string | number[]
}



export function HomeScreen() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const navigation = useNavigation();

    const handleAddExercise = (exerciseData: ExerciseData) => {
        if (!!exerciseData.exerciseName.trim()) {
            const newExercise = {id: uuid.v4(), ...exerciseData};
            setExercises([...exercises, newExercise]);
        } else {
            Alert.alert(JSON.stringify("Напиши покороче. Тут ограничение в 35 символов"))
        }
    };
    const handleSelectExercise = (selectedExercise: Exercise) => {
        Alert.alert(JSON.stringify(`Выбрано упражнение: ${selectedExercise.exerciseName}`))
    };
    return (
        <>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <AddExerciseForm onAddExercise={handleAddExercise}/>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <ExerciseList exercises={exercises} onSelectExercise={handleSelectExercise} navigation={navigation}  />
            </View>
        </>


    );
}