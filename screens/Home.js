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
} from "react-native";
import store from "../redux/store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import {
  agregar_evento_accion,
  retornar_evento_accion,
} from "../redux/actions/participanteAction";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
    };
  }

  ejemplofuncion = () => {
    let asdasd = this.props.eventos.eventos;
    this.state.lista = asdasd;
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
          <View key={key} style={styles.viewHolder}>
            <Text style={{ color: "white" }} >{item.nombreEvento} ({confirmados.length}/{item.participantes.length} jugadores)</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <ImageBackground source={require('../assets/pasto.jpg')} style={{ flex: 1, paddingTop: 20, backgroundColor: "#34495E" }}>
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
          <View style={styles.contenedorParticipantes}>{nuevoArray}</View>
        </ScrollView>
        <View>
          <Button
            title="Agregar partido"
            color="#FF0000"
            onPress={() => this.props.navigation.navigate("AddEvento")}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    viewHolder: {
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
  contenedorParticipantes: {
    flexDirection: "column",
    margin: 10,
    padding: 2,
  },
});

const mapDispatchToProps = {
  agregar_evento_accion,
  retornar_evento_accion,
};

const mapStateToProps = (state) => {
  return {
    eventos: state.event_reducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
