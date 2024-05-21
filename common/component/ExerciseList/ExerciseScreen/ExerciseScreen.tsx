import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Alert, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

type ExerciseScreenProps = {
    route: {
        params: {
            exerciseName: string;
        };
    };
};
export const ExerciseScreen = ({route}: ExerciseScreenProps) => {
    const {exerciseName} = route.params;
    const [sets, setSets] = useState<{ weight: number; reps: number }[]>([]);
    const [newWeight, setNewWeight] = useState('');
    const [newReps, setNewReps] = useState('');
    const [maxWeight, setMaxWeight] = useState(0);

    useEffect(() => {
        const loadSets = async () => {
            try {
                const storedSets = await AsyncStorage.getItem(`${exerciseName}_sets`);
                if (storedSets !== null) {
                    setSets(JSON.parse(storedSets));
                }
            } catch (e) {
                Alert.alert('Ошибка', 'Не удалось загрузить подходы.');
            }
        };

        const loadMaxWeight = async () => {
            try {
                const storedMaxWeight = await AsyncStorage.getItem(`${exerciseName}_maxWeight`);
                if (storedMaxWeight !== null) {
                    setMaxWeight(parseFloat(storedMaxWeight));
                }
            } catch (e) {
                Alert.alert('Ошибка', 'Не удалось загрузить максимальный вес.');
            }
        };

        loadSets();
        loadMaxWeight();
    }, [exerciseName]);

    const handleAddSet = async () => {
        const weight = parseFloat(newWeight);
        const reps = parseInt(newReps);

        if (!isNaN(weight) && !isNaN(reps)) {
            const newSet = {weight, reps};
            const updatedSets = [...sets, newSet];
            setSets(updatedSets);
            await AsyncStorage.setItem(`${exerciseName}_sets`, JSON.stringify(updatedSets));

            if (weight > maxWeight) {
                setMaxWeight(weight);
                await AsyncStorage.setItem(`${exerciseName}_maxWeight`, weight.toString());
            }

            setNewWeight('');
            setNewReps('');
        } else {
            Alert.alert('Ошибка', 'Введите корректные значения веса и повторений.');
        }
    };

    const totalSets = sets.length;
    const totalWeight = sets.reduce((total, set) => total + set.weight * set.reps, 0);

    //TODO: delete this console later
    console.log("render_ExerciseScreen")

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{exerciseName}</Text>
            <Text style={styles.stat}>Всего подходов: {totalSets}</Text>
            <Text style={styles.stat}>Всего поднято веса: {totalWeight}</Text>
            <Text style={styles.stat}>Максимальный вес за одно повторение: {maxWeight}</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Вес"
                    keyboardType="numeric"
                    value={newWeight}
                    onChangeText={setNewWeight}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Количество повторений"
                    keyboardType="numeric"
                    value={newReps}
                    onChangeText={setNewReps}
                />
                <Button title="Добавить подход" onPress={handleAddSet}/>
            </View>

            <Text style={styles.subtitle}>Подходы:</Text>
            {sets.map((set, index) => (
                <View key={index} style={styles.set}>
                    <Text>Подход {index + 1}: Вес - {set.weight}, Повторения - {set.reps}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stat: {
        fontSize: 18,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        marginBottom: 10,
    },
    set: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
});