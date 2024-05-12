import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';

export type ExerciseData = {
    exerciseName: string;
    category: string;
}

type AddExerciseFormProps = {
    onAddExercise: (exerciseData: ExerciseData) => void;
}

export const AddExerciseForm= (props:AddExerciseFormProps) => {
    const [exerciseName, setExerciseName] = useState('');
    const [category, setCategory] = useState('');

    const handleAddExercise = () => {
        props.onAddExercise({exerciseName, category});
        setExerciseName('');
        setCategory('');
    };

    return (
        <View >
            <TextInput
                style={{width:200,height:50, fontSize:25, textAlign:"center"}}
                placeholder="Название упражнения"
                value={exerciseName}
                onChangeText={setExerciseName}
            />
            <TextInput
                style={{width:200,height:50, fontSize:25, textAlign:"center"}}
                placeholder="Категория"
                value={category}
                onChangeText={setCategory}
            />
                <Button title="Добавить упражнение" onPress={handleAddExercise} />

        </View>
    );
};
