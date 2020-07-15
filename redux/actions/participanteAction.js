export const AGREGAR_EVENTO = "AGREGAR_EVENTO";
export const RETORNAR_EVENTO = "RETORNAR_EVENTO";
export const CAMBIAR_ASISTENCIA = "CAMBIAR_ASISTENCIA";

export const agregar_evento_accion = (evento) => {
  //ACCION EN SI
  return {
    type: AGREGAR_EVENTO,
    payload: evento,
  };
};

export const retornar_evento_accion = (idevento) => {
  //ACCION EN SI
  return {
    type: RETORNAR_EVENTO,
  };
};

export const cambiar_asistencia_accion = (
  idEvento,
  valoresEstadoParticipante,
) => {
  //ACCION EN SI
  return {
    type: CAMBIAR_ASISTENCIA,
    payload: { idEvento, valoresEstadoParticipante },
  };
};
