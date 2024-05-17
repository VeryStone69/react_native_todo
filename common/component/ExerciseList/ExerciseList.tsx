import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Exercise} from "../HomeScreen/HomeScreen";


type ExerciseListProps = {
    exercises: Exercise[];
    onSelectExercise: (exercise: Exercise) => void;
    navigation: any;
}

export const ExerciseList = (props: ExerciseListProps) => {

    const handleSelectExercise = (selectedExercise: Exercise) => {
        props.navigation.navigate('Exercise', {exercise: selectedExercise});
    };
    return (
        <View>
            <Text style={{width: 200, height: 50, fontSize: 18, textAlign: "center"}}>Выберите упражнение:</Text>

            <FlatList
                data={props.exercises}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleSelectExercise(item)}>
                        <Text style={{
                            width: 200,
                            height: 50,
                            fontSize: 18,
                            textAlign: "center"
                        }}>{item.exerciseName}</Text>
                    </TouchableOpacity>

                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

