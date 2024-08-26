// El mástil (neck) de la guitarra
// Este arreglo representa las cuerdas y trastes de una guitarra.

// rope: cuerda (número de cuerda, empezando desde la más fina)
// frets: trastes (las divisiones a lo largo del mástil que definen las notas)
// chord: acorde (representa la nota o el acorde asociado con ese traste)
// file: nombre del archivo de sonido correspondiente a la nota en ese traste

export const neck = [
  {
    rope: 1,
    frets: [
      {
        chord: 100,
        file: "1-0",
      },
      {
        chord: 101,
        file: "1-1",
      },
    ],
  },
  {
    rope: 2,
    frets: [
      {
        chord: 200,
        file: "2-0",
      },
      {
        chord: 201,
        file: "2-1",
      },
    ],
  },
  {
    rope: 3,
    frets: [
      {
        chord: 300,
        file: "3-0",
      },
      {
        chord: 301,
        file: "3-1",
      },
    ],
  },
  {
    rope: 4,
    frets: [
      {
        chord: 400,
        file: "4-0",
      },
      {
        chord: 401,
        file: "4-1",
      },
    ],
  },
  {
    rope: 5,
    frets: [
      {
        chord: 500,
        file: "5-0",
      },
      {
        chord: 501,
        file: "5-1",
      },
    ],
  },
  {
    rope: 6,
    frets: [
      {
        chord: 600,
        file: "6-0",
      },
      {
        chord: 601,
        file: "6-1",
      },
    ],
  },
];
