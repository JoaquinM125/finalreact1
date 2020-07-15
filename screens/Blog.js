import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Vibration,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import {
  agregar_evento_accion,
  retornar_evento_accion,
  cambiar_asistencia_accion,
} from "../redux/actions/participanteAction";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      idEvento: this.props.route.params.key,
    };
  }

  ejemplofuncion = (idEvento, idParticipante) => {
    let participante = this.props.eventos.eventos[idEvento].participantes[
      idParticipante
    ];

    if (this.props.eventos.eventos[idEvento].participantes.length === 1) {
      if (this.state.lista.length === 0) {
        this.state.lista = [...this.state.lista, participante];
      }
    } else {
      if (this.state.lista.length === 0) {
        this.state.lista = [...this.state.lista, participante];
      } else {
        this.state.lista.push(participante);
      }
    }
  };

  SwitchGo(num, e) {
    const lista = [...this.state.lista];
    lista[num].estado = !lista[num].estado;
    if (lista[num].estado === true) {
      Vibration.vibrate(500);
    }
    this.setState({ lista });
  };

  actualizarEstadoRedux = () => {
    this.props.cambiar_asistencia_accion(this.state.idEvento, this.state.lista);
    this.props.navigation.navigate("Inicio");
  };

  render() {

    let identificador = this.props.route.params.key; //EL ID DEL EVENTO

    let nuevoArray = this.props.eventos.eventos[
      identificador
    ].participantes.map((item, key) => {
      this.ejemplofuncion(identificador, key);
      return (
        <View style={styles.container1}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            {item.nombreParticipante}
          </Text>
          <Switch
            key={key}
            disabled={false}
            style={{ alignContent: "flex-end", justifyContent: "flex-end" }}
            value={this.state.lista[key].estado}
            onValueChange={this.SwitchGo.bind(this, key)}
          />
        </View>
      );
    });

    this.state.lista = this.state.lista.slice(
      0,
      this.props.eventos.eventos[identificador].participantes.length
    );

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/pasto.jpg')} style={styles.listita}>
          <Text
            style={{
              marginTop: 5,
              marginBottom: 5,
              fontWeight: "bold",
              fontSize: 40,
              textAlign: "center",
              color: "white",
            }}
          >
            Evento: {this.props.eventos.eventos[this.state.idEvento].nombreEvento}
          </Text>
          <Text
            style={{
              marginTop: 15,
              marginBottom: 5,
              fontWeight: "bold",
              fontSize: 25,
              textAlign: "center",
              color: "white",
            }}
          >
            Participantes: {this.props.eventos.eventos[identificador].participantes.length}
          </Text>
          <ScrollView>
            <View style={styles.contenedorParticipantes}>{nuevoArray}</View>
          </ScrollView>
          <Button
            title="Confirmar"
            color="#FF0000"
            onPress={this.actualizarEstadoRedux}
          ></Button>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7D7D7",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#ff4081",
  },
  container1: {
    flex: 1,
    backgroundColor: "#D7D7D7",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#1CA901",
    marginTop: 8,
    paddingStart: 10,
  },
  listita: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#34495E",
  },
  contenedorParticipantes: {
    flexDirection: "column",
    marginTop: 10,
    padding: 5,
  },
});
const mapDispatchToProps = {
  agregar_evento_accion,
  cambiar_asistencia_accion,
};

const mapStateToProps = (state) => {
  return {
    eventos: state.event_reducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
