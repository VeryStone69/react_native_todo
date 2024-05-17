import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {Exercise} from "../../HomeScreen/HomeScreen";


export const ExerciseScreen= (props: Exercise) => {
    const [sets, setSets] = useState<{ weight: number; reps: number }[]>([]);
    const [newWeight, setNewWeight] = useState('');
    const [newReps, setNewReps] = useState('');

    const handleAddSet = () => {
        const weight = parseFloat(newWeight);
        const reps = parseInt(newReps);

        if (!isNaN(weight) && !isNaN(reps)) {
            const newSet = { weight, reps };
            setSets([...sets, newSet]);
            setNewWeight('');
            setNewReps('');
        }
    };

    const totalSets = sets.length;
    const totalWeight = sets.reduce((total, set) => total + set.weight * set.reps, 0);

    return (
        <View>
            <Text>{props.exerciseName}</Text>
            <Text>Всего подходов: {totalSets}</Text>
            <Text>Всего поднято веса: {totalWeight}</Text>

            <View>
                <TextInput
                    placeholder="Вес"
                    keyboardType="numeric"
                    value={newWeight}
                    onChangeText={setNewWeight}

                />
                <TextInput
                    placeholder="Количество повторений"
                    keyboardType="numeric"
                    value={newReps}
                    onChangeText={setNewReps}
                />
                <Button title="Добавить подход" onPress={handleAddSet} />
            </View>

            <Text>Подходы:</Text>
            {sets.map((set, index) => (
                <View key={index}>
                    <Text>Подход {index + 1}: Вес - {set.weight}, Повторения - {set.reps}</Text>
                </View>
            ))}
        </View>
    );
};

