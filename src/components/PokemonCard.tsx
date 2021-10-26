import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import { getColorPicture } from '../helpers/getColorPicture';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
interface Props {
    pokemon: SimplePokemon

}
const PokemonCard = ({ pokemon }: Props) => {
    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const { navigate } = useNavigation();
    const getColor = async () => {
        if (!isMounted.current) return
        const [color = 'grey'] = await getColorPicture(pokemon.picture);
        setBgColor(color);

    }
    useEffect(() => {
        getColor();
        return () => {
            isMounted.current = false
        }

    }, []);
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                navigate('PokemonScreen',
                    { simplePokemon: pokemon ,
                       color:bgColor
                    })
            }}
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor,
            }}>
                {/* Nombre del pokemon y ID */}
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>
                <View style={styles.pokebolaContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>
                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -20,
        bottom: -20,
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5,
    }

});
export default PokemonCard

