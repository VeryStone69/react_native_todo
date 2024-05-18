import {useNavigation} from "@react-navigation/native";
import {AddExerciseForm} from "../AddExerciseForm/AddExerciseForm";
import uuid from "react-native-uuid";
import {Alert, View} from "react-native";
import {ExerciseList} from "../ExerciseList/ExerciseList";
import * as React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function HomeScreen() {
    const navigation = useNavigation();

    const handleAddExercise = async (exerciseName: string) => {
        if (!exerciseName.trim()) {
            return Alert.alert('Ошибка', 'Невозможно сохранить упражнение без названия');
        }
        try {
            const defaultSettingsForExercise = {
                exerciseName,
                id: uuid.v4(),
                exerciseStatic: {
                    totalSets_local: null,
                    totalWeight_local: null,
                    maxWeight_local: null
                }
            }
            const key = `${exerciseName.trim()}`; // задаем ключ из названия категории и имени
            await AsyncStorage.setItem(key, JSON.stringify(defaultSettingsForExercise));
        } catch (e) {
            Alert.alert('Ошибка', 'Не удалось сохранить упражнение.');
        }
    };

    return (
        <>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <AddExerciseForm onAddExercise={handleAddExercise}/>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <ExerciseList navigation={navigation}/>
            </View>
        </>
    );
}