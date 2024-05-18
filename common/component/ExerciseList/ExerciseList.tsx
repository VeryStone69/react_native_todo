import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Alert, Button} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


type ExerciseListProps = {
    // onSelectExercise: (exercise: string) => void;
    //TODO fix this type
    navigation: any;
}

export const ExerciseList = (props: ExerciseListProps) => {

    const [exerciseKeys, setExerciseKeys] = useState<readonly string[]>([]);
    const fetchData = async () => {
        const keys = await AsyncStorage.getAllKeys();
        setExerciseKeys(keys);
    };
    useEffect(() => {
         fetchData();
    }, [exerciseKeys]);

    const handleSelectExercise = (selectedExercise: string) => {
        props.navigation.navigate('Exercise', {exercise: selectedExercise});
    };

    return (
        <View>
            <Text style={{width: 200, height: 50, fontSize: 18, textAlign: "center"}}>Выберите упражнение:</Text>

            <FlatList
                data={exerciseKeys}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleSelectExercise(item)}
                                      style={{ flexDirection: 'row' }}
                    >
                        <Text style={{
                            width: 200,
                            height: 50,
                            fontSize: 18,
                            textAlign: "center"
                        }}>{item}</Text>
                        <Button title={"Del"} 
                                onPress={ async ()=>{
                            try {
                                await AsyncStorage.removeItem(`${item}`)
                                await fetchData()
                            } catch(e) {
                                Alert.alert('Ошибка', `${e}`);
                            }
                        }}></Button>
                    </TouchableOpacity>

                )}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

