import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import {Exercise} from "../../../App";


type ExerciseListProps = {
    exercises: Exercise[];
    onSelectExercise: (exercise: Exercise) => void;
}

export const ExerciseList = (props: ExerciseListProps) => {
    return (
        <View>
            <Text style={{width:200,height:50, fontSize:18, textAlign:"center"}}>Выберите упражнение:</Text>
            <FlatList
                data={props.exercises}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => props.onSelectExercise(item)}>
                        <Text style={{width:200,height:50, fontSize:18, textAlign:"center"}}>{item.exerciseName}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

