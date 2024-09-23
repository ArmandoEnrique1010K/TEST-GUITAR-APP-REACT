import { keyboard } from "../data/keyboard";
import { neck } from "../data/neck";

// UTILICE CHATGPT PARA INVESTIGAR ESO
export const getDynamicFretboardSimulation = (
  firstRope,
  secondRope,
  thirdRope,
  fourthRope,
  fifthRope,
  sixthRope,
  firstRowKeys,
  secondRowKeys,
  thirdRowKeys,
  fourthRowKeys,
  fifthRowKeys,
  sixthRowKeys,
  startFromTheChord
) => {
  // Asignar las teclas correspondientes de cada fila del teclado.
  let assignFirstRowKeys = keyboard[firstRowKeys].keys;
  let assignSecondRowKeys = keyboard[secondRowKeys].keys;
  let assignThirdRowKeys = keyboard[thirdRowKeys].keys;
  let assignFourthRowKeys = keyboard[fourthRowKeys].keys;
  let assignFifthRowKeys = keyboard[fifthRowKeys].keys;
  let assignSixthRowKeys = keyboard[sixthRowKeys].keys;

  // Encontrar la cuerda específica en el objeto 'neck' (mástil de la guitarra).
  let findFirstRope = neck.find((n) => n.rope === firstRope);
  let findSecondRope = neck.find((n) => n.rope === secondRope);
  let findThirdRope = neck.find((n) => n.rope === thirdRope);
  let findFourthRope = neck.find((n) => n.rope === fourthRope);
  let findFifthRope = neck.find((n) => n.rope === fifthRope);
  let findSixthRope = neck.find((n) => n.rope === sixthRope);

  // Asignar las teclas a los trastes de la primera cuerda desde el índice especificado por 'startFromTheChord'.
  for (let index = 0; index < findFirstRope.frets.length; index++) {
    let element = findFirstRope.frets[index];

    // Solo asignar teclas si el índice es mayor o igual a 'startFromTheChord' y está dentro del rango de la fila de teclas.
    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignFirstRowKeys.length
    ) {
      //...
      element.key = assignFirstRowKeys[index - startFromTheChord];
    } else {
      // Si no hay teclas disponibles, dejar la propiedad 'key' indefinida.
      element.key = undefined;
    }
  }
  // Repetir el mismo proceso para la segunda cuerda.
  for (let index = 0; index < findSecondRope.frets.length; index++) {
    let element = findSecondRope.frets[index];
    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignSecondRowKeys.length
    ) {
      element.key = assignSecondRowKeys[index - startFromTheChord];
    } else {
      element.key = undefined;
    }
  }
  // Repetir el proceso para la tercera cuerda.
  for (let index = 0; index < findThirdRope.frets.length; index++) {
    let element = findThirdRope.frets[index];
    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignThirdRowKeys.length
    ) {
      element.key = assignThirdRowKeys[index - startFromTheChord];
    } else {
      element.key = undefined;
    }
  }
  // Repetir el proceso para la cuarta cuerda.
  for (let index = 0; index < findFourthRope.frets.length; index++) {
    let element = findFourthRope.frets[index];
    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignFourthRowKeys.length
    ) {
      element.key = assignFourthRowKeys[index - startFromTheChord];
    } else {
      element.key = undefined;
    }
  }
  // Repetir el proceso para la quinta cuerda.
  for (let index = 0; index < findFifthRope.frets.length; index++) {
    let element = findFifthRope.frets[index];
    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignFifthRowKeys.length
    ) {
      element.key = assignFifthRowKeys[index - startFromTheChord];
    } else {
      element.key = undefined;
    }
  }
  // Repetir el proceso para la sexta cuerda.
  for (let index = 0; index < findSixthRope.frets.length; index++) {
    let element = findSixthRope.frets[index];
    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignSixthRowKeys.length
    ) {
      element.key = assignSixthRowKeys[index - startFromTheChord];
    } else {
      element.key = undefined;
    }
  }

  // Devolver las cuatro cuerdas actualizadas con las teclas asignadas.
  return [
    { ...findFirstRope },
    { ...findSecondRope },
    { ...findThirdRope },
    { ...findFourthRope },
    { ...findFifthRope },
    { ...findSixthRope },
  ];
};
