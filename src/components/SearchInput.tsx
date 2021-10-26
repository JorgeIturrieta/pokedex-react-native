import React from 'react'
import { View, Text, StyleSheet, TextInput, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useEffect } from 'react';

interface Props {
    style?: StyleProp<ViewStyle>
    onDebounce: (value: string) => void
}
const SearchInput = ({ style,onDebounce }: Props) => {
    const [textValue, setTextValue] = useState('');
    const debounceValue = useDebouncedValue(textValue);

    useEffect(() => {
        onDebounce(debounceValue);
    }, [debounceValue])
    return (
        <View style={{
            ...styles.container,
            ...style as any

        }} >
            <View style={styles.textBackground}>
                <TextInput
                    placeholder="Buscar pokemon"
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={setTextValue}
                />
                <Icon
                    name="search-outline"
                    size={20}
                    color="grey"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    textBackground: {
        backgroundColor: "#F3F1F3",
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    textInput: {
        top: 2,
        flex: 1,
        fontSize: 18
    }
});

export default SearchInput
