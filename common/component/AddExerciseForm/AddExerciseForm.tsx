import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export type ExerciseData = {
    exerciseName: string;
}

type AddExerciseFormProps = {
    onAddExercise: (exerciseData: ExerciseData) => void;
}

export const AddExerciseForm= (props:AddExerciseFormProps) => {

    const [exerciseName, setExerciseName] = useState('');

    const handleAddExercise = () => {
        props.onAddExercise({exerciseName});
        setExerciseName('');
    };

    return (
        <View >
            <TextInput
                style={{width:200,height:50, fontSize:25, textAlign:"center"}}
                placeholder="Название упражнения"
                value={exerciseName}
                onChangeText={setExerciseName}
            />
                <Button title="Добавить упражнение" onPress={handleAddExercise} />

        </View>
    );
};
