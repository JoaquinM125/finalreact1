import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import store from "../redux/store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import {
  agregar_partido_accion,
  retornar_partido_accion,
} from "../redux/actions/participanteAction";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
    };
  }

  ejemplofuncion = () => {
    let ej = this.props.eventos.eventos;
    this.state.lista = ej;
  };
  render() {

    this.state.lista = [];

    this.ejemplofuncion();

    const nuevoArray = this.state.lista.map((item, key) => {
      let confirmados = item.participantes.filter(participante => participante.estado === true);
      return (
        <TouchableOpacity
          key={key}
          onPress={() => this.props.navigation.navigate("Evento", { key })}
        >
          <View key={key} style={styles.viewPartido}>
            <Text style={{ color: "white" }} >{item.nombreEvento} ({confirmados.length}/{item.participantes.length} jugadores)</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
      <ImageBackground source={require('../assets/pasto.jpg')} style={{ flex: 3, paddingTop: 20}}>
        <Text
          style={{
            marginBottom: 10,
            marginTop: 10,
            fontWeight: "bold",
            fontSize: 50,
            textAlign: "center",
            color: "white",
          }}
        >
          Partidos
        </Text>
        <ScrollView>
          <TouchableOpacity activeOpacity={0.8}><View style={styles.contenedorJugadores}>{nuevoArray}</View></TouchableOpacity>
        </ScrollView>
        <View>
          <TouchableOpacity
          activeOpacity={0.8}>
          <Button
            title="Agregar partido"
            color="#FF0000"
            onPress={() => this.props.navigation.navigate("AddEvento")}
          /></TouchableOpacity>
        </View>

      </ImageBackground>
        <View style={styles.footer}>
        {
          Platform.OS == 'android'
          ?
          <Text>Trabajo React -Android</Text>
          :
          Platform.OS == 'ios'
          ?
          <Text>Trabajo React -IOS</Text>
          :
          <Text>Trabajo React -Web</Text>
        }
      </View></View>      
    );
  }
}

const styles = StyleSheet.create({
    viewPartido: {
    height: 55,
    backgroundColor: "#1CA901",
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderRadius: 20,
  },
  headerText: {
    color: "white",
    fontSize: 25,
  },
  contenedorJugadores: {
    flexDirection: "column",
    margin: 10,
    padding: 2,
  },
  footer:{
    flex:0.2,
    justifyContent:'center',
    alignItems: 'center',
    ...Platform.select({
      'ios': {
        backgroundColor: '#FCE694'
      },
      'android': {
        backgroundColor: '#679436'
      },
      'web':{
        backgroundColor: '#8FBB99'
      }
    })
  },
  container:{
    flex:1,
    flexDirection: 'column',
  }
});
const mapStateToProps = (state) => {
  return {
    eventos: state.event_reducer,
  };
};
const mapDispatchToProps = {
  agregar_partido_accion,
  retornar_partido_accion,
};



export default connect(mapStateToProps, mapDispatchToProps)(Home);
