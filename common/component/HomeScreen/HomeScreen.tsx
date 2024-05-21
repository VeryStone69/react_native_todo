import {NavigationProp, useNavigation} from "@react-navigation/native";
import {AddExerciseForm} from "../AddExerciseForm/AddExerciseForm";
import {Alert, View} from "react-native";
import {ExerciseList} from "../ExerciseList/ExerciseList";
import * as React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from "react";
import {RootStackParamList} from "../../../Type/NavigationType";

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
    const [exerciseKeys, setExerciseKeys] = useState<readonly string[]>([]);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    useEffect(() => {
        const fetchExerciseKeys = async () => {
            const keys = await AsyncStorage.getAllKeys();
            setExerciseKeys(keys.filter(key => key.startsWith('exercise_list_')));
        };

        fetchExerciseKeys();
    }, []);

    const handleAddExercise = async (exerciseName: string) => {
        if (!exerciseName.trim()) {
            return Alert.alert('Ошибка', 'Невозможно сохранить упражнение без названия');
        }
        try {
            const key = `exercise_list_${exerciseName.trim()}`; // задаем ключ из названия категории и имени
            await AsyncStorage.setItem(key, exerciseName);
            const keys = await AsyncStorage.getAllKeys();
            // setExerciseKeys(getAllkeys);
            setExerciseKeys(keys.filter(key => key.startsWith('exercise_list_')));
        } catch (e) {
            Alert.alert('Ошибка', 'Не удалось сохранить упражнение.');
        }
    };

    //TODO delete this console later
    console.log("render_HomeScreen")

    return (
        <>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <AddExerciseForm onAddExercise={handleAddExercise}/>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <ExerciseList navigation={navigation} allExerciseList={exerciseKeys}/>
            </View>
        </>
    );
}