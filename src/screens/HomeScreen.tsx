import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Image, FlatList, Text, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../theme/appTheme';
// import Icon from 'react-native-vector-icons/Ionicons';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { FadeInImage } from '../components/FadeInImage';
import PokemonCard from '../components/PokemonCard';
import { pokemonApi } from '../api/pokemonApi';

const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, simplePokemonList, loadPokemons } = usePokemonPaginated();
    return (
        <>
            <Image
                source={require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />
            
            <View style={{alignItems:'center'}} >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={simplePokemonList}
                    keyExtractor={(pokemon) => pokemon.id}
                    renderItem={({ item }) => (
                        <PokemonCard pokemon={item} />
                    )}
                    // Header 
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom:10,
                        }}
                        >
                            Pokedex
                        </Text>
                    )}

                    // Infinite Scroll 
                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4}
                    ListFooterComponent={
                        <ActivityIndicator
                            style={{
                                height: 100
                            }}
                            size={20}
                            color="grey"
                        />}
                />
            </View>

        </>
    )
}

export default HomeScreen
