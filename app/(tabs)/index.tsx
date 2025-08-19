import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useEffect, useState } from "react";

type Pokemon = {
  name: string;
  url: string;
};

type PokemonData = {
  sprites: Sprite;
};

type Sprite = {
  front_default: string | null;
  front_shiny: string | null;
};

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); // *
  const [sprites, setSprites] = useState<Sprite[]>([]);

  const uris: string[] = [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png",
  ];

  // Fetch images
  const fetchPokemons = async (): Promise<Pokemon[]> => {
    const limit = 10;
    const offset = 0;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json(); // TODO: Add resultType
      const pokemons: Pokemon[] = result.results;
      return pokemons;
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const fetchImagen = async (name: string): Promise<Sprite> => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result: PokemonData = await response.json();
      const sprites: Sprite = result.sprites;
      const { front_default, front_shiny } = sprites;
      return { front_default, front_shiny };
    } catch (error) {
      console.error(error);
    }
    return { front_default: null, front_shiny: null };
  };

  useEffect(() => {
    (async () => {
      const pokemons = await fetchPokemons();
      setPokemons(pokemons);

      // Use Promise.all with map to maintain order and wait for all requests
      const pokemonSprites = await Promise.all(
        pokemons.map(async (pokemon, index) => {
          const sprite = await fetchImagen(pokemon.name);
          return sprite;
        })
      );

      setSprites(pokemonSprites);
    })();
  }, []);

  useEffect(() => {
    console.log(sprites.length);
  }, [sprites]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {sprites.map((sprite, index) => (
        <View key={`ditto ${index}`} style={{ backgroundColor: "red" }}>
          <Image source={sprite.front_shiny} style={styles.image} />
        </View>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  image: {
    width: 120,
    height: 120,
  },
});
