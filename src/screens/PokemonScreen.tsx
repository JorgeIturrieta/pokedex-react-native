import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigator/Tab1'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FadeInImage } from '../components/FadeInImage'
import usePokemon from '../hooks/usePokemon'
import PokemonDetails from '../components/PokemonDetails';


interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };
const PokemonScreen = ({ navigation, route }: Props) => {
    const { simplePokemon, color } = route.params;
    const { name, id, picture } = simplePokemon;
    const { top } = useSafeAreaInsets();
    const { isLoading, pokemon } = usePokemon(id);
    return (
        <View style={{ flex: 1 }}>
            {/* Header Container */}
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,
            }}>
                <TouchableOpacity
                    onPress={() => { navigation.pop() }}
                    activeOpacity={0.5}
                    style={{
                        ...styles.backButton,
                        top: top + 10
                    }}
                >
                    <Icon
                        name="arrow-back-outline"
                        color="white"
                        size={35}
                    />
                </TouchableOpacity>
                {/* Nombre del Pokemon */}
                <Text
                    style={{
                        ...styles.pokemonName,
                        top: top + 45
                    }}
                >
                    {name + '\n'}#{id}
                </Text>
                {/* Pokebola Blanca */}
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokeball}
                />
                <FadeInImage
                    uri={picture}
                    style={styles.pokemonImage}
                />
            </View>
            {/* Detalles y Loading */}
            {
                isLoading 
                    ? (
                        <View style={styles.loadingIndicator}>
                            <ActivityIndicator
                                color={color}
                                size={50}
                            />
                        </View>
                    )
                    : <PokemonDetails pokemon={pokemon!}/>
            }



        </View>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20,
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default PokemonScreen
