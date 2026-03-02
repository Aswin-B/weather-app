import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

const API_KEY = "98862172f62598ce20d0a90d96929cfd";

type Weather = {
  coord: {
    lon: number;
    lat: number;
  };

  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  base: string;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };

  visibility: number;

  wind: {
    speed: number;
    deg: number;
  };

  clouds: {
    all: number;
  };

  dt: number;

  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };

  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const WeatherPage = () => {
    const [city, setCity] = useState<string>("Chennai");
    const [weatherData, setWeatherData] = useState<Weather | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    
    const fetchWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        setError("");
        setWeatherData(null);
        if(!city){
            setError("City name can\'t be Empty");
            setWeatherData(null);
            return;
        }
        else{
            try{
                setLoading(true);
                const response = await fetch(url);
                const data = await response.json();
                // console.log(data);
                if(data.cod != 200){
                    setWeatherData(null);
                    setError("City not Found");
                    setLoading(false);
                }
                else{
                    setWeatherData(data);
                    setLoading(false);
                }
                
            }
            catch(err){
                console.log("Something went wrong");
            }
            finally{
                setLoading(false);
            }
        }
    };

    // useEffect(() => {fetchWeather()}, [])

  return (
    <View style={styles.weatherBox}>
      <Text style={styles.heading}>Weather App</Text>
      <TextInput
      placeholder='Enter City' value={city} onChangeText={(text) => setCity(text.trim())} style={styles.inputCity}
      />
      <TouchableOpacity style={styles.searchButton} onPress={fetchWeather}>
        <Text style={styles.btnText}>Search</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#007BFF" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && (
        <View style={styles.weatherContainer}>
            <Text style={styles.city}>{weatherData?.name}</Text>
            <Text style={styles.temp}>{weatherData?.main?.temp}°C</Text>
            <Text style={styles.desc}>
                {weatherData?.weather[0]?.description}
            </Text>
            <Text>Humidity: {weatherData?.main?.humidity}%</Text>
            <Text>Wind Speed: {weatherData?.wind?.speed} m/s</Text>
        </View>
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
    weatherBox: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputCity: {
        width: 250,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    searchButton: {
        width: 100,
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    city: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 48,
        marginVertical: 10,
    },
    desc: {
        fontSize: 20,
        textTransform: 'capitalize',
        marginBottom: 10,
    },
    weatherContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default WeatherPage