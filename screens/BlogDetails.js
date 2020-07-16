import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { agregar_evento_accion } from "../redux/actions/participanteAction";

class BlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { valorArray: [], participante: "", evento: "" };
    this.indice = 0;
  }

  agregarParticipante = () => {
    if (this.state.participante == "") {
      Alert.alert("Debe ingresar un nombre del participante primero");
    }
    else {
      let nuevoParticipante = {
        indiceParticipante: this.indice,
        nombreParticipante: this.state.participante,
        estado: false,
      };
      this.setState(
        { valorArray: [...this.state.valorArray, nuevoParticipante] },
        () => {
          this.indice = this.indice + 1;
        }
      );
    }
  };

  agregarEvento = () => {
    if (this.state.evento == "") {
      Alert.alert("Debe ingresar un nombre para el partido");
    } else if (this.state.valorArray == 0) {
      Alert.alert("El evento debe tener al menos un participante");
    }
    else {
      let event = {
        idEvento: 1,
        nombreEvento: this.state.evento,
        participantes: this.state.valorArray,
      };


      this.props.agregar_evento_accion(event);
      this.props.navigation.navigate("Inicio");
    }
  };

  handleParticipante = (text) => {
    this.setState({ participante: text });
  };

  handleEvento = (text) => {
    this.setState({ evento: text });
  };

  render() {
    let arrayNuevo = this.state.valorArray.map((item, key) => {
      return (
        <View key={key} style={styles.viewPlayer}>
          <Text style={styles.headerText}>
            N°{item.indiceParticipante + 1}| {item.nombreParticipante}
          </Text>
        </View>
      );
    });

    return (
      <View style={{flexDirection:'column'},{flex:1}}>
      <ImageBackground source={require('../assets/pasto.jpg')} style={styles.container}>
        <View>
          <View style={styles.headerInput}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Competencia"
              placeholderTextColor="white"
              autoCapitalize="none"
              onChangeText={this.handleEvento}
            />
          </View>
          <View style={styles.headerInput}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nombre del Jugador"
              placeholderTextColor="white"
              autoCapitalize="none"
              onChangeText={this.handleParticipante}
            />
          </View>
          <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn_Agregar}
              onPress={this.agregarParticipante}
            >
              <Text style={{ color: "white" }} >AGREGAR</Text>
            </TouchableOpacity>
        </View>
        
        <ScrollView>
          <View style={styles.contenedorJugadores}>{arrayNuevo}</View>
        </ScrollView>
        <View>
          <TouchableOpacity
          activeOpacity={0.8}>
          <Button
            title="Confirmar Partido"
            color="#FF0000"
            onPress={this.agregarEvento} /></TouchableOpacity>
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
  container: {
    flex: 3,
    paddingTop: 30,
    backgroundColor: "#34495E",
  },

  headerInput: {
    flexDirection: "row",
  },
  
  btn_Agregar: {
    height:50,
    borderRadius: 10,
    marginRight: 30,
    marginLeft:30,
    marginBottom:15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF0000",
    textShadowColor: "white",
  },
  input: {
    margin: 15,
    flex: 2,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
  },
  viewPlayer: {
    flex:1,
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
});

const mapStateToProps = (state) => {
  return {
    eventos: state.event_reducer,
  };
};

const mapDispatchToProps = {
  agregar_evento_accion,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails);
