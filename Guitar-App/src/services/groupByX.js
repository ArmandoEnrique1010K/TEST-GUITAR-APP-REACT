import { guitar } from "../data/guitar";

// AGRUPAR SEGUN EL EJE X DEL ARREGLO
export const groupByX = () => {
  return guitar.reduce((groups, note) => {
    const x = note.position.x;
    if (!groups[x]) {
      groups[x] = [];
    }
    groups[x].push(note);
    return groups;
  }, {});
};
