import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';

type AddExerciseFormProps = {
    onAddExercise: (exerciseData: string) => void;
}

export const AddExerciseForm = (props: AddExerciseFormProps) => {
    const [exerciseName, setExerciseName] = useState('');

    const handleAddExercise = () => {
        props.onAddExercise(exerciseName);
        setExerciseName('');
    };

    //TODO: delete this console later
    console.log("render_AddExerciseForm")

    return (
        <View>
            <TextInput
                style={{width: 200, height: 50, fontSize: 25, textAlign: "center"}}
                placeholder="Название упражнения"
                value={exerciseName}
                onChangeText={setExerciseName}
            />
            <Button title="Добавить упражнение" onPress={handleAddExercise}/>
        </View>
    );
};
