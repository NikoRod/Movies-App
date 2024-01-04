// REACT
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

// COMPONENTS
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

// EXPO
import { StatusBar } from 'expo-status-bar';

// API
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

// THEME
import { styles } from '../theme';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log(data.results.length);
    if(data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log(data.results.length);
    if(data && data.results) setUpcoming(data.results);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log(data.results.length);
    if(data && data.results) setTopRated(data.results);
  };

  return (

    <View className="flex-1 bg-neutral-800">

      {/* SEARCH BAR */}
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>

        <StatusBar style="light" />

        <View className="flex-row justify-between items-center mx-4">

          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />

          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>

          <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>

        </View>

      </SafeAreaView>

      {
        loading? (
          <Loading />
        ):(
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 10}}
          >

            {/* TRENDING MOVIES */}
            { trending.length>0 && <TrendingMovies data={trending} /> }

            {/* UPCOMING MOVIES */}
            { upcoming.length>0 && <MovieList title="Upcoming" data={upcoming} /> }
            

            {/* TOP MOVIES */}
            { topRated.length>0 && <MovieList title="Top Rated" data={topRated} /> }

          </ScrollView>
        )
      }
      
  </View>

  );
}
