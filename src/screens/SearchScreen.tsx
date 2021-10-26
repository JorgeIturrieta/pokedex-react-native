import { View, Text, Platform, ActivityIndicator, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/appTheme';
import React,{ useState } from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { useEffect } from 'react';

const screenWidth = Dimensions.get('window').width;
const SearchScreen = () => {
    const { top } = useSafeAreaInsets()
    const { isFetching, simplePokemonList } = usePokemonSearch();
    const [term, setTerm] = useState('');
    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])

    useEffect(() => {
        if(term.length === 0) {
            setPokemonFiltered([]);
        }
        
        if(isNaN(Number(term))) {
            setPokemonFiltered(
                simplePokemonList.filter(
                    pokemon => pokemon.name.toLocaleLowerCase()
                                 .includes(term.toLowerCase()))
            )
        } else {
            const pokemonById = simplePokemonList.find(pokemon => pokemon.id === term)
            setPokemonFiltered((pokemonById)? [pokemonById] : [] );
        }
    }, [term])

    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={{
            flex: 1,
            // marginTop: (Platform.OS === "ios") ? top : top + 10,
            marginHorizontal: 20
        }}>
            <SearchInput 
                 onDebounce = {(value)=>setTerm(value)}
                style={{
                    position:'absolute',
                    zIndex: 999,
                    width: screenWidth -40,
                    top:(Platform.OS === "ios") ? top : top + 30,
                }}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={pokemonFiltered}
                keyExtractor={(pokemon) => pokemon.id}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                // Header 
                ListHeaderComponent={(
                    <Text style={{
                        ...styles.title,
                        ...styles.globalMargin,
                        paddingBottom: 10,
                        marginTop: (Platform.OS === "ios") ? top+60 : top + 80,
                    }}
                    >
                        {term}
                    </Text>
                )}

            />

        </View>
    )
}


export default SearchScreen
