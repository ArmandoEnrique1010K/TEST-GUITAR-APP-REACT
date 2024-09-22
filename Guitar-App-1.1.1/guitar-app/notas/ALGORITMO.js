export const keyboard = [
  {
    row: 1,
    keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "'"],
  },
  {
    row: 2,
    keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "´"],
  },
  {
    row: 3,
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "{"],
  },
  {
    row: 4,
    keys: ["z", "x", "c", "v", "b", "n", "m", ",", ".", "-", "Shift"],
  },
  {
    row: 5,
    keys: [],
  },
  {
    row: 6,
    keys: [],
  },
];

// UNE EL ARREGLO KEYBOARD AL ARREGLO NECK DE TAL MANERA QUE CADA ELEMENTO DEL ARREGLO TENGA UN :
//   {
//     rope: 1,
//     frets: [
//       {
//         id: 100,
//         chord: 0,
//         file: "1-0",
//         key: "1"
//       },
//       {
//         id: 101,
//         chord: 1,
//         file: "1-1",
//          key: "2"
//       },
//     ],
//   },
// Y CADA VEZ QUE SE ASIGNE UN VALOR QUE SE DESPLACE EL VALOR DE KEY, QUEDANDO:
//   {
//     rope: 1,
//     frets: [
//       {
//         id: 100,
//         chord: 0,
//         file: "1-0",
//         key: "" <--- AQUI NO HAY VALOR
//       },
//       {
//         id: 101,
//         chord: 1,
//         file: "1-1",
//          key: "1" <--- SE DESPLAZO EL VALOR EN 1
//       },
//     ],
//   },
// Y QUE LOS VALORES INICIALES

export const neck = [
  {
    rope: 1,
    frets: [
      {
        id: 100,
        chord: 0,
        file: "1-0",
      },
      {
        id: 101,
        chord: 1,
        file: "1-1",
      },
      {
        id: 102,
        chord: 2,
        file: "1-2",
      },
      {
        id: 103,
        chord: 3,
        file: "1-3",
      },
    ],
  },
  {
    rope: 2,
    frets: [
      {
        id: 200,
        chord: 0,
        file: "2-0",
      },
      {
        id: 201,
        chord: 1,
        file: "2-1",
      },
      {
        id: 202,
        chord: 2,
        file: "2-2",
      },
      {
        id: 203,
        chord: 3,
        file: "2-3",
      },
    ],
  },
  {
    rope: 3,
    frets: [
      {
        id: 300,
        chord: 0,
        file: "3-0",
      },
      {
        id: 301,
        chord: 1,
        file: "3-1",
      },
      {
        id: 302,
        chord: 2,
        file: "3-2",
      },
      {
        id: 303,
        chord: 3,
        file: "3-3",
      },
    ],
  },
  {
    rope: 4,
    frets: [
      {
        id: 400,
        chord: 0,
        file: "4-0",
      },
      {
        id: 401,
        chord: 1,
        file: "4-1",
      },
      {
        id: 402,
        chord: 2,
        file: "4-2",
      },
      {
        id: 403,
        chord: 3,
        file: "4-3",
      },
    ],
  },
  {
    rope: 5,
    frets: [
      {
        id: 500,
        chord: 0,
        file: "5-0",
      },
      {
        id: 501,
        chord: 1,
        file: "5-1",
      },
      {
        id: 502,
        chord: 2,
        file: "5-2",
      },
      {
        id: 503,
        chord: 3,
        file: "5-3",
      },
    ],
  },
  {
    rope: 6,
    frets: [
      {
        id: 600,
        chord: 0,
        file: "6-0",
      },
      {
        id: 601,
        chord: 1,
        file: "6-1",
      },
      {
        id: 602,
        chord: 2,
        file: "6-2",
      },
      {
        id: 603,
        chord: 3,
        file: "6-3",
      },
    ],
  },
];

// FUNCIONA
// const newNeckWithKeys = (one, two, three, four) => {
//     let result1 = neck.find((n)=> n.rope === one)
//     let result2 = neck.find((n) => n.rope === two);
//     let result3 = neck.find((n) => n.rope === three);
//     let result4 = neck.find((n) => n.rope === four);
//     return [{ ...result1 }, { ...result2 }, { ...result3 }, { ...result4 }];
// }
// console.log(newNeckWithKeys(1,2,5,6));

const newNeckWithKeys = (
  one,
  two,
  three,
  four,
  firstKeys,
  secondKeys,
  thirdKeys,
  fouthKeys,
  startValue1,
  startValue2,
  startValue3,
  startValue4
) => {
  let assignKeys1 = keyboard.map((a) => a.keys);
  let assignKeys2 = keyboard.map((b) => b.keys);
  let assignKeys3 = keyboard.map((c) => c.keys);
  let assignKeys4 = keyboard.map((d) => d.keys);

  let result1 = neck.find((n) => n.rope === one);
  for (let index = 0; index < result1.frets.length; index++) {
    let element = result1.frets[index];
    element.key = assignKeys2[secondKeys][startValue2++];
    let start1 = neck.find((n) => n.frets.chord === startValue1);
    element.key = assignKeys1[firstKeys][start1++];
  }

  let result2 = neck.find((n) => n.rope === two);
  for (let index = 0; index < result2.frets.length; index++) {
    let element = result2.frets[index];
    element.key = assignKeys2[secondKeys][startValue2++];

    let start2 = neck.find((n) => n.frets.chord === startValue2);
    element.key = assignKeys2[secondKeys][start2++];
  }

  let result3 = neck.find((n) => n.rope === three);
  for (let index = 0; index < result3.frets.length; index++) {
    let element = result3.frets[index];
    element.key = assignKeys3[thirdKeys][startValue3++];

    let start3 = neck.find((n) => n.frets.chord === startValue3);
    element.key = assignKeys3[thirdKeys][start3++];
  }

  let result4 = neck.find((n) => n.rope === four);
  for (let index = 0; index < result4.frets.length; index++) {
    let element = result4.frets[index];
    element.key = assignKeys4[fouthKeys][startValue4++];

    let start4 = neck.find((n) => n.frets.chord === startValue4);
    element.key = assignKeys4[firstKeys][start4++];
  }

  return [{ ...result1 }, { ...result2 }, { ...result3 }, { ...result4 }];
};
// console.log(newNeckWithKeys(3, 4, 5, 6, 0, 1, 2, 3, 0, 0, 0, 0));

// const newNeckWithKeys2 = (
//   primeracuerda,
//   segundacuerda,
//   terceracueda,
//   cuartacuerda,
//   primerafiladeteclas,
//   segundafiladeteclas,
//   tercerafiladeteclas,
//   cuartafiladeteclas,
//   empiezadesdelafila,
// ) => {
//   // Accedemos a las teclas de cada fila de `keyboard`
//   let assignKeys1 = keyboard[firstKeys].keys;
//   let assignKeys2 = keyboard[secondKeys].keys;
//   let assignKeys3 = keyboard[thirdKeys].keys;
//   let assignKeys4 = keyboard[fouthKeys].keys;

//   // Procesamos la primera cuerda
//   let result1 = neck.find((n) => n.rope === one);
//   for (let index = 0; index < result1.frets.length; index++) {
//     let element1 = result1.frets[index];
//     element1.key = assignKeys1[firstKeys][index - startValue1];
//   }

//   // Procesamos la segunda cuerda
//   let result2 = neck.find((n) => n.rope === two);
//   for (let index = 0; index < result2.frets.length; index++) {
//     let element2 = result2.frets[index];
//     if (index >= startValue2) {
//       element2.key = assignKeys2[secondKeys][index - startValue2];
//     } else {
//       element2.key = "";
//     }
//   }

//   // Procesamos la tercera cuerda
//   let result3 = neck.find((n) => n.rope === three);
//   for (let index = 0; index < result3.frets.length; index++) {
//     let element = result3.frets[index];
//     if (index >= startValue3) {
//       element.key = assignKeys3[thirdKeys][index - startValue3];
//     } else {
//       element.key = "";
//     }
//   }

//   // Procesamos la cuarta cuerda
//   let result4 = neck.find((n) => n.rope === four);
//   for (let index = 0; index < result4.frets.length; index++) {
//     let element = result4.frets[index];
//     if (index >= startValue4) {
//       element.key = assignKeys4[fouthKeys][index - startValue4];
//     } else {
//       element.key = "";
//     }
//   }

//   // Devolvemos el nuevo `neck` con las teclas asignadas
//   return [{ ...result1 }, { ...result2 }, { ...result3 }, { ...result4 }];
// };
// console.log(newNeckWithKeys2(1, 2, 3, 4, 0, 1, 2, 3, 1, 1, 1, 1));

const newNeckWithKeys2 = (
  primeracuerda,
  // segundacuerda,
  // terceracueda,
  // cuartacuerda,
  primerafiladeteclas,
  segundafiladeteclas,
  tercerafiladeteclas,
  cuartafiladeteclas,
  empiezadesdelafila
) => {
  // Accedemos a las teclas de cada fila de `keyboard`
  let asignarprimerfiladeteclas = keyboard[primerafiladeteclas].keys;
  // let asignarsegundafiladeteclas = keyboard[segundafiladeteclas].keys;
  // let asignartercerafiladeteclas = keyboard[tercerafiladeteclas].keys;
  // let asignarcuartafiladeteclas = keyboard[cuartafiladeteclas].keys;

  // Procesamos la primera cuerda
  let result1 = neck.find((n) => n.rope === primeracuerda);
  for (let index = 0; index < result1.frets.length; index++) {
    let element1 = result1.frets[index];
    element1.key =
      asignarprimerfiladeteclas[primerafiladeteclas][
        index - empiezadesdelafila
      ];
  }

  // Devolvemos el nuevo `neck` con las teclas asignadas
  return [{ ...result1 }];
};
// console.log(newNeckWithKeys2(1, 1, 0));

// ---------------------------------------------------------------------------------------------
// Segun ChatGPT a este algoritmo se le puede denomiar "Dynamic Fretboard Simulation",
/*

El algoritmo en el que está trabajando parece estrechamente relacionado con el concepto de controlar y navegar por los diapasones de la guitarra, especialmente con la capacidad de asignar notas y modos dinámicamente, similar a las técnicas de masterización del diapasón. Este enfoque de asignar entradas de teclado a notas o filas de guitarra específicas a menudo se denomina "Mapeo de diapasón" o "Mapeo de tablatura de guitarra", según el nivel de interacción y control del usuario.

En el mundo de la enseñanza y la tecnología de la guitarra, existen ideas similares, como el uso de entrenamiento por intervalos, visualización de escalas y patrones de acordes en el mástil de la guitarra para ayudar a los usuarios a explorar y tocar música de forma estructurada. Las herramientas para aprender a tocar el diapasón a menudo incorporan ideas como estas para permitir una navegación intuitiva y creatividad​(Guitarras de vanguardia).

Su algoritmo podría denominarse algo así como "Simulación dinámica de diapasón" o "Mapeo interactivo de notas de diapasón", ya que combina el concepto de control de notas interactivo (a través del teclado u otros métodos de entrada) con retroalimentación dinámica (a través de audio e imágenes). No es una coincidencia exacta con nada de lo que se encuentra actualmente en las herramientas convencionales, pero se basa en estas técnicas más amplias utilizadas para desbloquear el dominio del diapasón.

*/
// INVESTIGAR CON CHATGPT ESTE ALGORITMO, ME FALTABA UNAS 7 LINEAS DE CODIGO (IF Y ELSE)
// const dynamicFretboardSimulation = (
//   firstRope,
//   firstRowKeys,
//   startFromTheChord
// ) => {
//   let assignFirstRowKeys = keyboard[firstRowKeys].keys;

//   // Encuentra la cuerda correcta
//   let findFirstRope = neck.find((n) => n.rope === firstRope);

//   // Asigna las teclas a los trastes (frets) desde el índice correcto
//   for (let index = 0; index < findFirstRope.frets.length; index++) {
//     let element1 = findFirstRope.frets[index];

//     // Asigna la tecla correspondiente desde la fila de teclas
//     if (
//       index >= startFromTheChord &&
//       index - startFromTheChord < assignFirstRowKeys.length
//     ) {
//       element1.key = assignFirstRowKeys[index - startFromTheChord];
//     } else {
//       element1.key = undefined; // Dejar en blanco si no hay más teclas
//     }
//   }

//   return [{ ...findFirstRope }];
// };
// console.log(dynamicFretboardSimulation(1, 0, 1));
const dynamicFretboardSimulation = (
  firstRope,
  secondRope,
  thirdRope,
  fourthRope,
  firstRowKeys,
  secondRowKeys,
  thirdRowKeys,
  fourthRowKeys,
  startFromTheChord
) => {
  // Asignar las teclas correspondientes de cada fila del teclado.
  let assignFirstRowKeys = keyboard[firstRowKeys].keys;
  let assignSecondRowKeys = keyboard[secondRowKeys].keys;
  let assignThirdRowKeys = keyboard[thirdRowKeys].keys;
  let assignFourthRowKeys = keyboard[fourthRowKeys].keys;

  // Encontrar la cuerda específica en el objeto 'neck' (mástil de la guitarra).
  let findFirstRope = neck.find((n) => n.rope === firstRope);
  let findSecondRope = neck.find((n) => n.rope === secondRope);
  let findThirdRope = neck.find((n) => n.rope === thirdRope);
  let findFourthRope = neck.find((n) => n.rope === fourthRope);

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

  // Devolver las cuatro cuerdas actualizadas con las teclas asignadas.
  return [
    { ...findFirstRope },
    { ...findSecondRope },
    { ...findThirdRope },
    { ...findFourthRope },
  ];
};
console.log(dynamicFretboardSimulation(1, 2, 3, 4, 0, 1, 2, 3, 0));
