export const AGREGAR_PARTIDO = "AGREGAR_PARTIDO";
export const RETORNAR_PARTIDO = "RETORNAR_PARTIDO";
export const CAMBIAR_ASISTENCIA = "CAMBIAR_ASISTENCIA";

export const agregar_partido_accion = (evento) => {
  //ACCION EN SI
  return {
    type: AGREGAR_PARTIDO,
    payload: evento,
  };
};

export const retornar_partido_accion = (idevento) => {
  //ACCION EN SI
  return {
    type: RETORNAR_PARTIDO,
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
