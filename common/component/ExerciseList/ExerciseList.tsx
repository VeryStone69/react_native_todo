import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Alert, Button} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


type ExerciseListProps = {
    allExerciseList: readonly string[]
    //TODO fix this type
    navigation: any;
}

export const ExerciseList = (props: ExerciseListProps) => {
    const [exerciseData, setExerciseData] = useState<readonly string[]>([]);

    useEffect(() => {
        setExerciseData(props.allExerciseList)

    }, [props.allExerciseList]);

    const handleSelectExercise = (selectedExercise: string) => {
        const exerciseName = selectedExercise.replace('exercise_list_', '');
        props.navigation.navigate('Exercise', {exerciseName});
    };

    const removeExercise = async (item: string) => {
        try {
            await AsyncStorage.removeItem(item);
            const keys = await AsyncStorage.getAllKeys();
            setExerciseData(keys.filter(key => key.startsWith('exercise_list_')));
        } catch (e) {
            Alert.alert('Ошибка', `${e}`);
        }
    };

    //TODO: delete this console later
    console.log("render_ExerciseList")

    return (
        <View>
            <Text style={{width: 200, height: 50, fontSize: 18, textAlign: "center"}}>Выберите упражнение:</Text>
            <FlatList
                data={exerciseData}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleSelectExercise(item)} style={{flexDirection: 'row'}}>
                        <Text style={{width: 200, height: 50, fontSize: 18, textAlign: 'center'}}>
                            {item.replace('exercise_list_', '')}
                        </Text>
                        <Button title="Del" onPress={() => removeExercise(item)}/>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

