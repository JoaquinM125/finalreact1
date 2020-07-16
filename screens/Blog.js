import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Vibration,
  ImageBackground,
  Platform,
  TouchableOpacity
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

  actualizarEstadoRedux = () => {
    this.props.cambiar_asistencia_accion(this.state.idEvento, this.state.lista);
    this.props.navigation.navigate("Inicio");
  };

  SwitchGo(num, e) {
    const lista = [...this.state.lista];
    lista[num].estado = !lista[num].estado;
    if (lista[num].estado === true) {
      Vibration.vibrate(500);
    }
    this.setState({ lista });
  };

  render() {

    let identificador = this.props.route.params.key; //EL ID DEL EVENTO

    let nuevoArray = this.props.eventos.eventos[
      identificador
    ].participantes.map((item, key) => {
      this.ejemplofuncion(identificador, key);
      return (
        <View style={styles.container1}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white", marginRight:20, marginLeft:20 }}>
            {item.nombreParticipante}
          </Text>
          <Switch
            key={key}
            disabled={false}
            style={{ alignContent: "flex-end", justifyContent: "flex-end", marginLeft:20, marginRight:20 }}
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
        <View style={{flexDirection:'column'},{flex:1}}>
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
          <View style={styles.container}>
          <ScrollView>
            <View style={styles.contenedorParticipantes}>{nuevoArray}</View>
          </ScrollView>
          </View>
          <TouchableOpacity
          activeOpacity={0.8}>
          <Button
            title="Confirmar"
            color='#FF0000'
            onPress={this.actualizarEstadoRedux}
          ></Button></TouchableOpacity>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  container1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor:'#1CA901',    
    marginTop: 8,
    paddingStart: 30,
    borderRadius:25
  },
  listita: {
    flex: 3,
    paddingTop: 20,
  },
  contenedorParticipantes: {
    flex:1,
    flexDirection: "column",
    marginTop: 10,
    padding: 5,
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
});


const mapStateToProps = (state) => {
  return {
    eventos: state.event_reducer,
  };
};

const mapDispatchToProps = {
  agregar_evento_accion,
  cambiar_asistencia_accion,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
