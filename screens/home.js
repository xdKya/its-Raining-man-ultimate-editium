import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";

SplashScreen.preventAutoHideAsync();

let fonts = {
  "Anja-Eliane": require("../assets/Anja.ttf"),
};

export default class Home extends Component {
  constructor() {
    super();
    this.state = { FontsLoaded: false, rainForecast: null };
    this.cidade = "SP";
  }

  async loadFonts() {
    await Font.loadAsync(fonts);
    this.setState({ FontsLoaded: true });
  }
  componentDidMount() {
    this.loadFonts();
    this.fetchData();
  }
  fetchData = () => {
    axios
      .get(
        "https://fcc-weather-api.glitch.me/api/current?lat=-23.5489&lon=-46.6388"
      )
      .then((response) => {
        this.setState({
          rainForecast: response.data,
        });
      });
  };

  render() {
    const { rainForecast } = this.state;
    if (this.state.FontsLoaded) {
      SplashScreen.hideAsync();
      if (!rainForecast) {
        return <Text>Carregando...</Text>;
      } else {
        return (
          <View style={styles.Container}>
            <ImageBackground
              source={require("../assets/ensolarado.jpeg")}
              style={styles.ImageBackground}
            >
              <View
                style={{
                  marginTop: 50,
                }}
              >
                <Text
                  style={styles.textContainer}
                >{`Weather Forecast - ${this.cidade}`}</Text>
              </View>
              <View
                style={[styles.cardContainer, { border: "solid 2px yellow" }]}
              >
                <Text
                  style={styles.textContainer}
                >{`Temperature: ${rainForecast.main.temp}°C`}</Text>
                <Text
                  style={styles.textContainer}
                >{`Real Feel: ${rainForecast.main.feels_like}°C`}</Text>
              </View>

              <View
                style={[
                  styles.cardContainer,
                  { border: "solid 2px lightblue" },
                ]}
              >
                <Text
                  style={styles.textContainer}
                >{`Humidity: ${rainForecast.main.humidity}%`}</Text>
                <Text
                  style={styles.textContainer}
                >{`Wind Speed: ${rainForecast.wind.speed} KM/h`}</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.cardContainer,
                  {
                    border: "solid 2px gray",
                    flex: 0.1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                  },
                ]}
                onPress={() => {
                  this.props.navigation.navigate("Config");
                }}
              >
                <Text
                  style={[
                    styles.textContainer,
                    {
                      textAlign: "center",
                      alignSelf: "center",
                      paddingBottom: 10,
                    },
                  ]}
                >
                  Settings
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  cardContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    flex: 0.5,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 100,
    borderRadius: 18,
    fontFamily: "Anja-Eliane",
  },

  textContainer: {
    textAlign: "center",
    fontFamily: "Anja-Eliane",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10,
  },

  ImageBackground: {
    flex: 1,
    backgroundColor: "black",
  },
});
