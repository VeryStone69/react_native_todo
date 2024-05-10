import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';

type ExerciseData = {
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
        <View>
            <TextInput
                placeholder="Название упражнения"
                value={exerciseName}
                onChangeText={setExerciseName}
            />
            <TextInput
                placeholder="Категория"
                value={category}
                onChangeText={setCategory}
            />
            <Button title="Добавить упражнение" onPress={handleAddExercise}/>
        </View>
    );
};

