import { guitarNeck } from "../data/guitarNeck";
import { keyboardKeys } from "../data/keyboardKeys";

export const getDynamicKeysAndChords = (
  firstRowKeys,
  secondRowKeys,
  thirdRowKeys,
  fourthRowKeys,
  fifthRowKeys,
  sixthRowKeys,
  startFromTheChord,
  lockTheZeroChord,
  invertKeyboard
) => {
  // Obtiene las filas de las teclas del teclado
  let assignKeys = keyboardKeys.map((k) => k.keys);

  // Invertir el orden de las filas de las teclas del teclado
  if (invertKeyboard === true) {
    assignKeys.reverse();
  }

  // Encontrar las cuerdas
  let ropes = [
    guitarNeck.find((n) => n.rope === firstRowKeys),
    guitarNeck.find((n) => n.rope === secondRowKeys),
    guitarNeck.find((n) => n.rope === thirdRowKeys),
    guitarNeck.find((n) => n.rope === fourthRowKeys),
    guitarNeck.find((n) => n.rope === fifthRowKeys),
    guitarNeck.find((n) => n.rope === sixthRowKeys),
  ];

  // Asignar teclas a cada cuerda
  ropes.forEach((rope, index) => {
    let keysForRope = assignKeys[index];

    for (let i = 0; i < rope.frets.length; i++) {
      let element = rope.frets[i];

      if (i === 0 && lockTheZeroChord) {
        // Si estamos en el traste 0 y 'lockTheZeroChord' es true, no reasignamos la tecla
        continue;
      }

      // Si estamos fuera del rango de asignación de teclas o antes de 'startFromTheChord', asignamos 'undefined'
      if (
        i < startFromTheChord ||
        i - startFromTheChord >= keysForRope.length
      ) {
        element.key = undefined;
      } else {
        // Asignar la tecla correspondiente a los trastes a partir de 'startFromTheChord'
        element.key = keysForRope[i - startFromTheChord];
      }
    }
  });

  // Devolver las cuerdas con las teclas asignadas
  return ropes.map((rope) => ({ ...rope }));
};

// // Obtiene las filas de las teclas del teclado
// let assignKeys = keyboardKeys.map((k) => k.keys);

// // Invertir el orden de las filas de las teclas del teclado
// if (invertKeyboard === true) {
//   assignKeys.reverse();
// }

// // Encontrar la cuerda específica en el objeto 'neck' (mástil de la guitarra).
// let findFirstRope = guitarNeck.find((n) => n.rope === firstRowKeys);
// let findSecondRope = guitarNeck.find((n) => n.rope === secondRowKeys);
// let findThirdRope = guitarNeck.find((n) => n.rope === thirdRowKeys);
// let findFourthRope = guitarNeck.find((n) => n.rope === fourthRowKeys);
// let findFifthRope = guitarNeck.find((n) => n.rope === fifthRowKeys);
// let findSixthRope = guitarNeck.find((n) => n.rope === sixthRowKeys);

// // Asignar las teclas a los trastes de la primera cuerda desde el índice especificado por 'startFromTheChord'.
// for (let i = 0; i < findFirstRope.frets.length; i++) {
//   let element = findFirstRope.frets[i];

//   // Solo asignar teclas si el índice es mayor o igual a 'startFromTheChord' y está dentro del rango de la fila de teclas.
//   if (
//     i >= startFromTheChord &&
//     i - startFromTheChord < assignKeys[0].length
//   ) {
//     element.key = assignKeys[0][i - startFromTheChord];
//   } else {
//     // Si no hay teclas disponibles, dejar la propiedad 'key' indefinida.
//     element.key = undefined;
//   }
// }

// for (let i = 0; i < findSecondRope.frets.length; i++) {
//   let element = findSecondRope.frets[i];

//   if (
//     i >= startFromTheChord &&
//     i - startFromTheChord < assignKeys[1].length
//   ) {
//     element.key = assignKeys[1][i - startFromTheChord];
//   } else {
//     element.key = undefined;
//   }
// }

// for (let i = 0; i < findThirdRope.frets.length; i++) {
//   let element = findThirdRope.frets[i];

//   if (
//     i >= startFromTheChord &&
//     i - startFromTheChord < assignKeys[2].length
//   ) {
//     element.key = assignKeys[2][i - startFromTheChord];
//   } else {
//     element.key = undefined;
//   }
// }

// for (let i = 0; i < findFourthRope.frets.length; i++) {
//   let element = findFourthRope.frets[i];

//   if (
//     i >= startFromTheChord &&
//     i - startFromTheChord < assignKeys[3].length
//   ) {
//     element.key = assignKeys[3][i - startFromTheChord];
//   } else {
//     element.key = undefined;
//   }
// }

// for (let i = 0; i < findFifthRope.frets.length; i++) {
//   let element = findFifthRope.frets[i];

//   if (
//     i >= startFromTheChord &&
//     i - startFromTheChord < assignKeys[4].length
//   ) {
//     element.key = assignKeys[4][i - startFromTheChord];
//   } else {
//     element.key = undefined;
//   }
// }

// for (let i = 0; i < findSixthRope.frets.length; i++) {
//   let element = findSixthRope.frets[i];

//   if (
//     i >= startFromTheChord &&
//     i - startFromTheChord < assignKeys[5].length
//   ) {
//     element.key = assignKeys[5][i - startFromTheChord];
//   } else {
//     element.key = undefined;
//   }
// }

// // Asigna las teclas a cada cuerda
// if (lockTheZeroChord === false) {
//   return [
//     { ...findFirstRope },
//     { ...findSecondRope },
//     { ...findThirdRope },
//     { ...findFourthRope },
//     { ...findFifthRope },
//     { ...findSixthRope },
//   ];
// } else {
//   // DEFINIR LA LOGICA PARA ASIGNAR LAS TECLAS MANTENIENDO LAS TECLAS DE LA FILA DE CUERDAS 0
//   /*

//   | 1 |   |   | 2 | 3 | 4 |
//   | Q |   |   | W | E | R |
//   | A |   |   | S | D | F |
//   | Z |   |   | X | C | V |
//   |   |   |   |   |   |   |
//   |   |   |   |   |   |   |

//   EL CODIGO MOSTRADO SE PODRIA OBTENER SI SE LLAMA A LA FUNCIÓN CON getDynamicKeysAndChords(1, 2, 3, 4, 5, 6, 3, true, false)
//   */
// }
