import {
  AGREGAR_PARTIDO,
  RETORNAR_PARTIDO,
  CAMBIAR_ASISTENCIA,
} from "../actions/participanteAction";

const default_event_state = {
  eventos: [
    {
      idEvento: "0",
      nombreEvento: "Libertadores",
      participantes: [
        {
          indiceParticipante: "0",
          nombreParticipante: "Riquelme",
          estado: true,
        },
      ],
    },
  ],
};

const event_reducer = (state = default_event_state, action) => {
  switch (action.type) {
    case AGREGAR_PARTIDO: {
      return {
        ...state,
        eventos: [...state.eventos, action.payload],
      };
    }
    case RETORNAR_PARTIDO: {
      return {
        ...state,
        eventos: [...state.eventos],
      };
    }
    case CAMBIAR_ASISTENCIA: {
      const ind = state.eventos[action.payload.idEvento].participantes;
      return {
        ...state,
        eventos: [...state.eventos],
      };
    }
    default:
      return state;
  }
};

export default event_reducer;
