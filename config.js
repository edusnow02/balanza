/* ============================================================================
   CONFIG — TODAS las constantes de cálculo de la app.
   Editá los números acá; no hace falta tocar index.html.

   Fuentes:
   - "Tablas y Fórmulas" (Word, Universidad Autónoma de Asunción): puntos de
     corte, ecuaciones, factores y tabla Metropolitan.
   - Excel "Calculos Adultos": coeficientes de peso ajustado y kcal/kg por
     objetivo (decisión del nutricionista: en esos dos puntos manda el Excel).
   - Rotafolio Guías Alimentarias del Paraguay 2021: porciones por grupo.
   - Guía de intercambio de alimentos (MINSA Perú, 2014): aporte por porción.
   - "Ficha de evaluación – PPS Adultos" (Universidad Autónoma de Asunción):
     preguntas del cuestionario y tablas de riesgo de apnea y perímetro sagital.

   Convención de las tablas de rangos: cada fila dice "hasta" (límite
   superior EXCLUSIVO). Se recorre de arriba hacia abajo y gana la primera
   fila cuyo "hasta" sea mayor que el valor. "hasta: null" = sin límite.
   ========================================================================== */
window.CONFIG = {
  version: "4.4 — adultos",

  /* ---------- Validación de carga (plausibilidad, no criterio clínico) ---------- */
  validacion: {
    peso: [20, 300], tallaCm: [100, 230], grasaPct: [3, 75], musculoPct: [10, 95],
    cintura: [40, 220], cadera: [40, 220], muneca: [8, 30],
    grasaKg: [1, 200], musculoKg: [5, 150],
    // Si los kg de grasa cargados difieren del peso × % de grasa en más de
    // este valor, la app avisa: suele ser un error de tipeo.
    toleranciaGrasaKg: 1.5,
  },

  /* ---------- IMC ---------- */
  edadAdultoMayor: 65,
  imc: {
    // Adultos de 20 a 64 años. "estado" es la familia que usa el resto de la app.
    adulto: [
      { hasta: 15,   nombre: "Desnutrición muy severa",   estado: "desnutricion" },
      { hasta: 16,   nombre: "Desnutrición grado III",    estado: "desnutricion" },
      { hasta: 17,   nombre: "Desnutrición grado II",     estado: "desnutricion" },
      { hasta: 18.5, nombre: "Desnutrición grado I",      estado: "desnutricion" },
      { hasta: 25,   nombre: "Normopeso",                 estado: "normopeso" },
      { hasta: 30,   nombre: "Sobrepeso",                 estado: "sobrepeso" },
      { hasta: 35,   nombre: "Obesidad grado I",          estado: "obesidad" },
      { hasta: 40,   nombre: "Obesidad grado II",         estado: "obesidad" },
      { hasta: 50,   nombre: "Obesidad grado III",        estado: "obesidad" },
      { hasta: null, nombre: "Súper obeso o mega obeso",  estado: "obesidad" },
    ],
    // 65 años y más. Obesidad desde 32 (confirmado por el nutricionista;
    // la tabla original decía "> 39").
    adultoMayor: [
      { hasta: 23,   nombre: "Desnutrición grado I", estado: "desnutricion" },
      { hasta: 28,   nombre: "Normopeso",            estado: "normopeso" },
      { hasta: 32,   nombre: "Sobrepeso",            estado: "sobrepeso" },
      { hasta: null, nombre: "Obesidad",             estado: "obesidad" },
    ],
  },

  /* ---------- Contextura = talla (cm) / circunferencia de muñeca (cm) ---------- */
  contextura: {
    hombre: { pequenaMayorA: 10.4, grandeMenorA: 9.6 },
    mujer:  { pequenaMayorA: 11.0, grandeMenorA: 10.1 },
  },

  /* ---------- Peso ideal (Metropolitan 1983) y peso ajustado ---------- */
  pesoIdeal: {
    // De 25 a 50 años se usa la contextura; fuera de ese rango, la edad.
    edadPorContextura: [25, 50],
    // Si falta la circunferencia de muñeca se supone esta contextura
    // (decisión del nutricionista) y la app lo aclara.
    contexturaSiFaltaMuneca: "Mediana",
    columnasEdad: [[15, 16], [17, 19], [20, 24], [25, 29], [30, 39], [40, 49], [50, 59], [60, 69]],
    // Peso ajustado = coef × (peso actual − peso ideal) + peso ideal.
    // Coeficientes del Excel. Solo se ofrece desde obesidad.
    coefAjustado: { mujer: 0.38, hombre: 0.32 },
    // Cada fila: talla en cm -> [8 columnas por edad, pequeño, mediano, grande].
    metropolitan: {
      mujer: {
        148: [44.4, 45.3, 46.6, 48.9, 52.4, 55.6, 56.9, 57.8, 43.4, 46.35, 50.85],
        149: [44.9, 45.8, 47.2, 49.4, 52.8, 55.9, 57.3, 58.2, 43.85, 46.75, 51.35],
        150: [45.4, 46.3, 47.7, 50.0, 53.1, 56.3, 57.7, 58.6, 44.3, 47.25, 51.8],
        151: [46.0, 46.9, 48.2, 50.5, 53.7, 56.9, 58.2, 58.9, 44.7, 47.8, 52.3],
        152: [46.5, 47.4, 48.8, 51.0, 54.2, 57.4, 58.8, 59.3, 45.2, 48.3, 52.85],
        153: [47.1, 48.1, 49.4, 51.6, 54.8, 57.9, 59.3, 59.8, 45.7, 48.85, 53.4],
        154: [47.9, 48.8, 50.1, 52.1, 55.3, 58.5, 59.8, 60.3, 46.2, 49.4, 53.95],
        155: [48.6, 49.5, 50.8, 52.6, 55.8, 59.0, 60.4, 60.8, 46.75, 49.9, 54.45],
        156: [49.3, 50.2, 51.3, 53.2, 56.3, 59.5, 60.9, 61.3, 47.25, 50.45, 54.95],
        157: [50.0, 50.9, 51.9, 53.7, 56.9, 60.0, 61.4, 61.9, 47.8, 50.95, 55.5],
        158: [50.6, 51.5, 52.4, 54.3, 57.4, 60.6, 62.1, 62.5, 48.35, 51.55, 56.05],
        159: [51.1, 52.1, 53.0, 54.8, 58.0, 61.1, 62.8, 63.2, 48.9, 52.05, 56.6],
        160: [51.7, 52.6, 53.5, 55.3, 58.5, 61.7, 63.5, 63.9, 49.4, 52.6, 57.15],
        161: [52.2, 53.3, 54.0, 55.9, 59.0, 62.4, 64.2, 64.7, 50.0, 53.2, 57.75],
        162: [52.8, 54.0, 55.6, 56.5, 59.6, 63.1, 64.9, 65.4, 50.5, 53.9, 58.4],
        163: [53.4, 54.8, 55.2, 57.0, 60.1, 63.8, 65.7, 66.1, 51.05, 54.5, 59.05],
        164: [54.1, 55.5, 55.9, 57.7, 60.7, 64.3, 66.4, 66.8, 51.6, 55.1, 59.8],
        165: [54.8, 56.2, 56.6, 58.5, 61.2, 64.8, 67.1, 67.5, 52.1, 55.75, 60.55],
        166: [55.5, 56.7, 57.3, 59.2, 61.9, 65.5, 67.8, 68.2, 52.7, 56.55, 61.2],
        167: [56.2, 57.3, 58.1, 59.9, 62.6, 66.2, 68.5, 68.9, 53.35, 57.35, 61.95],
        168: [56.9, 57.8, 58.7, 60.5, 63.2, 66.9, 69.2, 69.7, 54.0, 58.1, 62.65],
        169: [57.4, 58.3, 59.2, 61.1, 63.8, 67.6, 69.9, 70.4, 54.75, 58.8, 63.35],
        170: [58.0, 58.9, 59.8, 61.6, 64.3, 68.4, 70.6, 71.1, 55.45, 59.5, 64.05],
        171: [58.6, 59.6, 60.5, 62.3, 65.0, 69.1, 71.3, 71.8, 56.15, 60.2, 64.75],
        172: [59.4, 60.3, 61.2, 63.0, 65.7, 69.8, 72.1, 72.5, 56.85, 60.9, 65.25],
        173: [60.1, 61.0, 61.9, 63.7, 66.4, 70.5, 72.8, 73.2, 57.55, 61.7, 66.2],
        174: [60.8, 61.7, 62.6, 64.4, 67.1, 71.2, 73.5, 73.9, 58.3, 62.4, 66.95],
        175: [61.5, 62.4, 63.2, 65.1, 67.9, 71.9, 74.2, 74.7, 59.05, 63.1, 67.65],
        176: [62.2, 63.1, 64.0, 65.8, 68.6, 72.8, 75.1, 75.7, 59.8, 63.8, 68.4],
        177: [62.9, 63.8, 64.7, 66.6, 69.3, 73.7, 75.9, 76.1, 60.6, 64.3, 69.2],
        178: [63.6, 64.6, 65.5, 67.3, 70.0, 74.6, 76.8, 76.8, 61.35, 64.9, 70.0],
        179: [null, 65.5, 66.4, 68.2, 70.9, 75.5, 77.7, null, 62.1, 65.9, 70.8],
        180: [null, 66.4, 67.3, 69.8, 71.8, 76.4, 78.6, null, 62.8, 66.7, 71.6],
        181: [null, 67.3, 68.2, 70.0, 72.7, 77.2, 79.6, null, 63.55, 67.4, 72.45],
        182: [null, 68.2, 69.1, 70.9, 73.6, 78.1, 80.7, null, 64.25, 68.1, 73.25],
        183: [null, 69.1, 70.0, 71.8, 74.5, 79.0, 81.8, null, 64.95, 68.8, 74.05],
        184: [null, 70.0, 70.9, 72.7, 75.4, 79.9, 82.9, null, 65.65, 69.5, 74.85],
        185: [null, 70.9, 71.8, 73.6, 76.3, 80.8, 83.9, null, 66.35, 70.2, 75.65]
      },
      hombre: {
        153: [44.9, 51.7, 55.7, 58.4, 59.7, 61.1, 62.0, 60.7, null, null, null],
        154: [45.6, 52.1, 56.2, 58.9, 60.3, 61.6, 62.5, 61.2, null, null, null],
        155: [46.3, 52.6, 56.7, 59.5, 60.8, 62.2, 63.1, 61.7, null, null, null],
        156: [47.2, 53.2, 57.2, 60.0, 61.3, 62.7, 63.6, 62.2, null, null, null],
        157: [48.1, 53.7, 57.8, 60.5, 61.9, 63.2, 64.1, 62.8, 52.35, 55.75, 60.3],
        158: [49.0, 54.3, 58.4, 61.2, 62.5, 63.9, 64.7, 63.3, 52.9, 56.35, 60.8],
        159: [49.9, 55.1, 59.1, 61.9, 63.2, 64.6, 65.2, 63.9, 53.4, 56.95, 61.4],
        160: [50.8, 55.8, 59.9, 62.6, 63.9, 65.3, 65.8, 64.1, 54.0, 57.6, 61.9],
        161: [51.7, 56.5, 60.6, 63.1, 64.7, 66.0, 66.5, 65.1, 54.5, 58.15, 62.5],
        162: [52.6, 57.2, 61.3, 63.7, 65.4, 66.7, 67.5, 65.8, 55.05, 58.65, 63.15],
        163: [53.5, 58.0, 61.9, 64.2, 66.1, 67.5, 67.9, 66.6, 55.75, 59.2, 63.85],
        164: [54.5, 58.7, 62.5, 64.8, 66.8, 68.2, 68.6, 67.3, 56.1, 59.75, 64.45],
        165: [55.3, 59.4, 63.0, 65.3, 67.5, 68.9, 69.4, 68.0, 56.7, 60.3, 65.05],
        166: [56.1, 60.1, 63.5, 66.0, 68.2, 69.6, 70.0, 68.7, 57.3, 60.9, 65.65],
        167: [57.0, 60.8, 64.1, 66.7, 68.9, 70.3, 70.8, 69.4, 57.9, 61.5, 66.3],
        168: [57.9, 61.6, 64.6, 67.3, 69.7, 71.1, 71.5, 70.2, 58.55, 62.15, 67.0],
        169: [58.8, 62.2, 65.1, 67.9, 70.4, 72.0, 72.4, 71.1, 59.25, 62.85, 67.8],
        170: [59.7, 62.9, 65.7, 68.4, 71.1, 72.9, 73.3, 72.0, 59.95, 63.65, 68.6],
        171: [60.6, 63.6, 66.4, 69.1, 71.8, 73.6, 74.1, 72.7, 60.65, 64.4, 69.45],
        172: [61.5, 64.3, 67.1, 69.8, 72.5, 74.3, 74.8, 73.4, 61.4, 65.2, 70.35],
        173: [62.4, 65.1, 67.8, 70.5, 73.2, 75.0, 75.5, 74.2, 62.15, 65.95, 71.2],
        174: [63.3, 65.8, 68.5, 71.2, 73.9, 75.8, 76.2, 75.1, 62.85, 66.7, 71.9],
        175: [64.2, 66.5, 69.2, 71.9, 74.7, 76.5, 76.9, 76.0, 63.55, 67.4, 72.6],
        176: [64.9, 67.2, 69.9, 72.6, 75.5, 77.3, 77.8, 73.9, 64.3, 67.65, 73.3],
        177: [65.7, 67.9, 70.6, 73.4, 76.4, 78.2, 78.7, 77.8, 65.1, 68.45, 74.05],
        178: [66.4, 68.6, 71.4, 74.1, 77.3, 79.1, 79.6, 78.7, 65.9, 69.25, 74.75],
        179: [67.1, 69.3, 72.1, 74.8, 78.0, 79.8, 80.5, 79.5, 66.65, 70.0, 75.6],
        180: [67.8, 70.1, 72.8, 75.5, 78.7, 80.5, 81.3, 80.4, 67.35, 70.8, 76.4],
        181: [68.5, 70.9, 73.6, 76.3, 79.5, 81.3, 82.2, 81.3, 68.05, 71.6, 77.0],
        182: [69.2, 71.8, 74.5, 77.2, 80.4, 82.2, 83.1, 82.2, 68.75, 72.4, 78.15],
        183: [70.0, 72.7, 75.4, 78.1, 81.3, 83.1, 84.0, 83.1, 69.5, 73.2, 79.05],
        184: [70.9, 73.4, 76.1, 79.0, 82.0, 83.6, 84.7, 84.0, 70.2, 74.4, 79.85],
        185: [71.7, 74.1, 76.8, 79.9, 82.7, 84.5, 85.4, 84.9, 70.9, 75.2, 80.65],
        186: [72.6, 74.8, 77.5, 80.0, 83.5, 85.3, 87.3, 85.8, 71.7, 76.0, 81.45],
        187: [73.5, 75.5, 78.2, 81.7, 84.4, 86.2, 87.1, 86.7, 72.5, 76.8, 82.35],
        188: [74.4, 76.2, 79.0, 82.6, 85.3, 87.1, 88.0, 87.6, 73.3, 77.6, 83.25],
        189: [75.3, 76.9, 79.7, 83.3, 86.2, 88.0, 88.9, 88.5, 74.0, 78.5, 84.15],
        190: [76.2, 77.7, 80.4, 84.0, 87.1, 88.9, 89.9, 89.4, 74.7, 79.4, 85.05],
        191: [77.1, 78.4, 81.0, 84.7, 88.1, 89.9, 90.8, 90.3, 75.4, 80.3, 85.9],
        192: [78.0, 79.1, 81.5, 85.4, 89.2, 91.0, 91.9, 91.4, 76.1, 81.2, 86.7],
        193: [null, 79.8, 82.1, 86.2, 90.2, 92.0, 92.9, 92.5, 76.85, 82.05, 87.5],
        194: [null, 80.5, 82.6, 86.9, 91.3, 93.1, 94.0, 93.6, 77.6, 82.95, 88.3],
        195: [null, 81.2, 83.2, 87.6, 92.4, 94.2, 95.1, 94.6, 78.3, 83.85, 89.15]
      },
    },
  },

  /* ---------- % de peso ideal = peso actual / peso ideal × 100 ---------- */
  pctPesoIdeal: [
    { hasta: 75,   nombre: "Desnutrición grave" },
    { hasta: 85,   nombre: "Desnutrición moderada" },
    { hasta: 90,   nombre: "Desnutrición leve" },
    { hasta: 110,  nombre: "Aceptable" },
    { hasta: 120,  nombre: "Sobrepeso" },
    { hasta: 140,  nombre: "Obesidad I" },
    { hasta: 180,  nombre: "Obesidad II" },
    { hasta: null, nombre: "Obesidad mórbida" },
  ],

  /* ---------- % de peso habitual = peso actual / peso habitual × 100 ---------- */
  pctPesoHabitual: [
    { hasta: 48,   nombre: "Por debajo del peso mínimo de sobrevivencia" },
    { hasta: 55.01, nombre: "Peso mínimo de sobrevivencia" },
    { hasta: 75,   nombre: "Desnutrición severa — 3er grado" },
    { hasta: 85,   nombre: "Desnutrición moderada — 2do grado" },
    { hasta: 90.01, nombre: "Desnutrición leve — 1er grado" },
    { hasta: null, nombre: "Sin desnutrición según esta tabla" },
  ],

  /* ---------- % de pérdida de peso = (habitual − actual) / habitual × 100 ---------- */
  perdidaPeso: [
    { periodo: "1 semana", significativaDesde: 1,   graveMayorA: 2 },
    { periodo: "1 mes",    significativaDesde: 5,   graveMayorA: 5 },
    { periodo: "3 meses",  significativaDesde: 7.5, graveMayorA: 7.5 },
    { periodo: "6 meses",  significativaDesde: 10,  graveMayorA: 10 },
  ],

  /* ---------- Circunferencia de cintura: riesgo cardiovascular ---------- */
  cintura: {
    hombre: { altoDesde: 94, muyAltoDesde: 102 },
    mujer:  { altoDesde: 80, muyAltoMayorA: 88 },
  },

  /* ---------- Relación cintura / cadera ---------- */
  cinturaCadera: {
    hombre: { androideMayorA: 1.0, mixtaDesde: 0.85, bajoRiesgoMenorA: 0.94 },
    mujer:  { androideMayorA: 0.9, mixtaDesde: 0.75, bajoRiesgoMenorA: 0.82 },
  },

  /* ---------- Masa grasa ---------- */
  grasa: {
    // Bray. Por debajo de "normalDesde" la tabla no define categoría.
    bray: {
      hombre: { normalDesde: 12, limiteDesde: 21, obesidadMayorA: 25 },
      mujer:  { normalDesde: 20, limiteDesde: 31, obesidadMayorA: 33 },
    },
    // Deurenberg: %MG = imc×IMC + edad×EDAD − sexo×SEXO − constante (hombre=1, mujer=0).
    // Se usa solo como estimación cuando no se cargó el % de grasa medido.
    deurenberg: { imc: 1.2, edad: 0.23, sexo: 10.8, constante: 5.4 },
  },

  /* ---------- Masa muscular ---------- */
  // El Word no trae puntos de corte de músculo: se registra la calificación
  // que muestra AiLink, sin recalcularla.
  musculo: { calificacionesAilink: ["Bajo", "Insuficiente", "Estándar", "Excelente"] },

  /* ---------- Gasto energético ---------- */
  energia: {
    // Harris-Benedict: c + p×peso(kg) + t×talla(cm) − e×edad(años)
    harrisBenedict: {
      hombre: { c: 66.47, p: 13.75, t: 5,    e: 6.75 },
      mujer:  { c: 655.1, p: 9.56,  t: 1.85, e: 4.68 },
    },
    // Factor de actividad: el nutricionista elige un valor dentro del rango.
    actividad: [
      { nombre: "Reposo absoluto",       min: 1.0, max: 1.1, detalle: "Coma" },
      { nombre: "Reposo relativo",       min: 1.1, max: 1.2, detalle: "En cama, puede moverse, se levanta" },
      { nombre: "Muy leve / Sedentario", min: 1.2, max: 1.3, detalle: "Sentado, de pie, oficina, manejar, cocinar" },
      { nombre: "Leve",                  min: 1.4, max: 1.5, detalle: "De pie, caminata moderada, limpieza, docencia" },
      { nombre: "Moderada",              min: 1.6, max: 1.7, detalle: "Caminata intensa, ciclismo, tenis, bailar" },
      { nombre: "Intensa",               min: 1.9, max: 2.1, detalle: "Trabajo físico pesado, fútbol, básquetbol" },
      { nombre: "Agitante o excepcional", min: 2.2, max: 2.4, detalle: "Deportistas de élite" },
    ],
    // Factor de injuria. No se incluyeron las filas de "infección y estrés"
    // porque en el Word los valores no quedan claramente emparejados.
    injuria: [
      { nombre: "Sin enfermedad / sin estrés", min: 1.0, max: 1.0 },
      { nombre: "Desnutrición proteico-energética", min: 1.2, max: 1.7 },
      { nombre: "Cirugía menor programada", min: 1.1, max: 1.2 },
      { nombre: "Cirugía mayor", min: 1.2, max: 1.3 },
      { nombre: "Herida limpia", min: 1.1, max: 1.2 },
      { nombre: "Herida infectada", min: 1.3, max: 1.4 },
      { nombre: "Fractura, hueso largo / múltiple", min: 1.2, max: 1.3 },
      { nombre: "Lesión craneana cerrada", min: 1.2, max: 1.3 },
      { nombre: "EPOC", min: 1.2, max: 1.4 },
      { nombre: "Insuficiencia respiratoria / renal", min: 1.2, max: 1.4 },
      { nombre: "Cáncer con quimioterapia o radiación, caquexia cardíaca", min: 1.2, max: 1.5 },
      { nombre: "Trasplante de órgano sólido", min: 1.3, max: 1.5 },
      { nombre: "Traumatismo esquelético / contuso", min: 1.3, max: 1.4 },
      { nombre: "Traumatismo mayor, múltiple", min: 1.5, max: 1.6 },
      { nombre: "Quemaduras < 20% SCQ", min: 1.2, max: 1.4 },
      { nombre: "Quemaduras 20 – 40% SCQ", min: 1.5, max: 1.8 },
      { nombre: "Quemaduras > 40% SCQ", min: 1.8, max: 2.0 },
    ],
    // Fórmula práctica: kcal por kg de peso actual según objetivo (Excel).
    formulaPractica: {
      "Descenso":      { min: 25, max: 29 },
      "Mantenimiento": { min: 30, max: 34 },
      "Aumento":       { min: 35, max: 40 },
    },
  },

  /* ---------- Proteínas: g por kg de PESO ACTUAL por día ---------- */
  proteinas: {
    rangos: [
      { nombre: "Paciente normal", min: 0.8, max: 1.24 },
      { nombre: "Moderadamente comprometido / desnutrición leve o moderada", min: 1.25, max: 1.8 },
      { nombre: "Severamente comprometido / desnutrición severa", min: 1.81, max: 2.5 },
    ],
  },

  kcalPorGramo: { proteina: 4, hc: 4, grasa: 9 },

  /* ---------- Adecuación: se acepta meta ± tolerancia (%) ---------- */
  adecuacion: { tolerancia: 5 },

  /* ---------- Comidas del día y reparto inicial (%) ---------- */
  comidas: ["Desayuno", "Media mañana", "Almuerzo", "Merienda", "Media tarde", "Cena"],
  comidasPctInicial: [25, 0, 35, 15, 0, 25],

  /* ---------- Plan semanal ---------- */
  dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],

  /* ---------- Reparto de porciones e intercambios entre comidas ---------- */
  // La propuesta automática reparte según el % de cada comida y redondea a
  // este paso (0.5 = medias porciones), sin cambiar el total indicado.
  reparto: { paso: 0.5 },

  /* ---------- Proteínas de alto valor biológico ---------- */
  pavb: { grupos: ["Lácteos", "Carnes", "Huevos"] },

  /* ---------- Porciones por grupo (Guías Alimentarias del Paraguay 2021) ---------- */
  // La guía paraguaya manda: grupos, porciones sugeridas por edad y sexo, y
  // la equivalencia de una porción. La app las SUGIERE; el nutricionista decide.
  //
  // "aporte" = calorías y macros de UNA porción de la fila. La guía paraguaya
  // no lo trae, así que se completa así (decisión del nutricionista):
  //  - Cereales, Panificados, Verduras, Azúcares, Leches (altas y bajas en
  //    grasa), Quesos y Carnes (altas en grasa y magras): Guía de intercambio
  //    de alimentos (MINSA Perú 2014).
  //  - Frutas, Legumbres, Aceites: tabla de alimentos propia, porque la
  //    porción peruana no coincide con la paraguaya (1 manzana de 140 g,
  //    50 g de lenteja, 5 g de aceite).
  //
  // Cada fila tiene un "id" fijo. Con ese id se guardan y se exportan los
  // datos: NO cambiar los id. El nombre visible sí se puede cambiar.
  //
  // "comparte": la guía paraguaya da UNA sola sugerencia para todo ese grupo
  // (por ejemplo, 4 porciones de leche y derivados). Las filas que llevan el
  // mismo texto muestran esa misma sugerencia y el nutricionista la reparte.
  porciones: {
    esquema: 4,
    columnas: [
      { id: "a19h", nombre: "Adultos 19–29, hombre", edadMin: 19, edadMax: 29,  sexo: "hombre", kcal: 2550 },
      { id: "a19m", nombre: "Adultos 19–29, mujer",  edadMin: 19, edadMax: 29,  sexo: "mujer",  kcal: 1900 },
      { id: "a30h", nombre: "Adultos 30–59, hombre", edadMin: 30, edadMax: 59,  sexo: "hombre", kcal: 2450 },
      { id: "a30m", nombre: "Adultos 30–59, mujer",  edadMin: 30, edadMax: 59,  sexo: "mujer",  kcal: 1850 },
      { id: "a60h", nombre: "Adultos mayores (60 o más), hombre", edadMin: 60, edadMax: 200, sexo: "hombre", kcal: 2050 },
      { id: "a60m", nombre: "Adultos mayores (60 o más), mujer",  edadMin: 60, edadMax: 200, sexo: "mujer",  kcal: 1700 },
    ],
    grupos: [
      { id: "cereales", nombre: "Cereales, tubérculos y derivados", corto: "Cereales",
        porcion: "90 g arroz cocido (¼ plato) · 200 g polenta (¼ plato) · 90 g fideo cocido (¼ plato) · 100 g mandioca cocida · 200 g papa cocida (¼ plato) · 185 g batata cocida (¼ plato)",
        aporte: { kcal: 135, hc: 25, prot: 5, grasa: 1 },
        valores: { a19h: "6", a19m: "4", a30h: "6", a30m: "3", a60h: "3", a60m: "2" } },
      { id: "panificados", nombre: "Panificados", corto: "Panificados",
        porcion: "50 g galleta (1 un.) · 50 g pan felipe (1 un.) · 50 g palito/coquito (10 un.) · 65 g pan de sándwich (2 rebanadas) · 55 g rosquita (4 un.) · 50 g pan árabe (1½ un.) · 30 g galletita de agua (8 un.)",
        aporte: { kcal: 135, hc: 25, prot: 5, grasa: 1 },
        valores: { a19h: "2", a19m: "2", a30h: "2", a30m: "2", a60h: "2", a60m: "2" } },
      { id: "verduras", nombre: "Verduras", corto: "Verduras",
        porcion: "100 g verduras crudas (1 taza o ½ plato) · 100 g verduras cocidas (1 taza o ½ plato)",
        aporte: { kcal: 25, hc: 5, prot: 1, grasa: 0 },
        valores: { a19h: "4", a19m: "4", a30h: "4", a30m: "4", a60h: "4", a60m: "3" } },
      { id: "frutas", nombre: "Frutas", corto: "Frutas",
        porcion: "140 g manzana (1 un.) · 120 g pera (1 un.) · 110 g banana (1 un.) · 180 g naranja (1 un.) · 90 g mamón (¾ taza) · 130 g piña (¾ taza) · 120 g uva (¾ taza) · 120 g kiwi (1 un.) · 250 g acerola (1 taza)",
        aporte: { kcal: 90.4, hc: 21.3, prot: 0.4, grasa: 0.4 },
        valores: { a19h: "3", a19m: "3", a30h: "3", a30m: "3", a60h: "3", a60m: "3" } },
      { id: "leche_alta", nombre: "Leches y derivados altos en grasa", corto: "Leche alta", comparte: "Leches, derivados y quesos",
        porcion: "200 ml leche (1 taza) · 200 g yogur (1 taza)",
        aporte: { kcal: 130, hc: 10, prot: 7, grasa: 7 },
        valores: { a19h: "4", a19m: "3-4", a30h: "4", a30m: "3-4", a60h: "3-4", a60m: "3-4" } },
      { id: "leche_baja", nombre: "Leches y derivados bajos en grasa", corto: "Leche baja", comparte: "Leches, derivados y quesos",
        porcion: "200 ml leche (1 taza) · 200 g yogur (1 taza)",
        aporte: { kcal: 65, hc: 10, prot: 5, grasa: 1 },
        valores: { a19h: "4", a19m: "3-4", a30h: "4", a30m: "3-4", a60h: "3-4", a60m: "3-4" } },
      { id: "quesos", nombre: "Quesos", corto: "Quesos", comparte: "Leches, derivados y quesos",
        porcion: "30 g queso (1 feta) · 25 g queso rallado (5 cucharadas)",
        aporte: { kcal: 130, hc: 1, prot: 10, grasa: 9 },
        valores: { a19h: "4", a19m: "3-4", a30h: "4", a30m: "3-4", a60h: "3-4", a60m: "3-4" } },
      { id: "carne_alta", nombre: "Carnes y huevos altos en grasa", corto: "Carne alta", comparte: "Carnes y huevos",
        porcion: "50 g carne vacuna/hígado · 50 g carne molida (1 cucharada colmada) · 50 g pollo (1 muslo) · 50 g pescado (1 palma) · 50 g atún enlatado (2 cucharadas) · 50 g huevo de gallina (1 un.) · 50 g carne de cerdo · 44 g huevo de codorniz (4 un.)",
        aporte: { kcal: 130, hc: 0, prot: 12, grasa: 9 },
        valores: { a19h: "4", a19m: "4", a30h: "4", a30m: "3", a60h: "4", a60m: "3-4" } },
      { id: "carne_magra", nombre: "Carnes y huevos magros", corto: "Carne magra", comparte: "Carnes y huevos",
        porcion: "50 g carne vacuna/hígado · 50 g carne molida (1 cucharada colmada) · 50 g pollo (1 muslo) · 50 g pescado (1 palma) · 50 g atún enlatado (2 cucharadas) · 50 g huevo de gallina (1 un.) · 50 g carne de cerdo · 44 g huevo de codorniz (4 un.)",
        aporte: { kcal: 55, hc: 0, prot: 11, grasa: 1 },
        valores: { a19h: "4", a19m: "4", a30h: "4", a30m: "3", a60h: "4", a60m: "3-4" } },
      { id: "legumbres", nombre: "Legumbres secas", corto: "Legumbres",
        porcion: "50 g de porotos / lenteja / arveja (¼ taza o 4 cucharadas)",
        aporte: { kcal: 175.3, hc: 30, prot: 12.3, grasa: 0.7 },
        valores: { a19h: "1", a19m: "1", a30h: "1", a30m: "1", a60h: "1", a60m: "1" } },
      { id: "azucares", nombre: "Azúcares y mieles", corto: "Azúcares",
        porcion: "5 g azúcar (1 cucharadita) · 6 g miel (1 cucharadita) · 5 g dulce (1 cucharadita)",
        aporte: { kcal: 20, hc: 6, prot: 0, grasa: 0 },
        valores: { a19h: "4", a19m: "4", a30h: "4", a30m: "4", a60h: "4", a60m: "4" } },
      { id: "aceites", nombre: "Aceites y grasas", corto: "Aceites",
        porcion: "5 ml aceite (1 cucharada) · 12 g mayonesa (1 cucharada) · 6 g margarina (1 cucharada) · 8 g maní (12 un.)",
        aporte: { kcal: 45, hc: 0, prot: 0, grasa: 5 },
        valores: { a19h: "4", a19m: "3", a30h: "4", a30m: "3", a60h: "3", a60m: "2" } },
    ],

    // A qué fila de porciones cuenta cada alimento de la tabla de alimentos.
    // Se usa solo para la guía "cuánto llevás cubierto" del plan semanal, que
    // es aproximada. Los grupos que no figuran acá ("Otros") no se cuentan.
    //  - Un texto: todos los alimentos de ese grupo van a esa fila.
    //  - "porNombre": si el nombre del alimento contiene alguna de las
    //    palabras, va a esa fila (así se separan los quesos de las leches).
    //  - "masParecida": entre esas filas se elige la que más se parece al
    //    alimento en el porcentaje de sus calorías que viene de la grasa.
    //    No hay punto de corte: se compara contra el aporte de cada fila.
    grupoDeAlimento: {
      "Cereales": "cereales", "Panificados": "panificados", "Vegetales": "verduras", "Frutas": "frutas",
      "Lácteos": { porNombre: [{ palabras: ["queso", "requesón", "requeson"], fila: "quesos" }], masParecida: ["leche_alta", "leche_baja"] },
      "Carnes": { masParecida: ["carne_alta", "carne_magra"] },
      "Huevos": { masParecida: ["carne_alta", "carne_magra"] },
      "Legumbres": "legumbres", "Dulces": "azucares", "Grasas": "aceites", "Frutos secos": "aceites",
    },
    // Correcciones a mano de la regla anterior, por número (id) de alimento.
    // Ejemplo:  23: "carne_magra"   (el 23 es "Bife magro, 1 chico").
    // Los id están en alimentos.js y en la lista que entrega la app en
    // Ajustes > Desarrollo > "Clasificación de lácteos y carnes".
    filaDeAlimento: {
    },

    // Cómo pasan a las filas actuales las porciones guardadas con la versión 3
    // (9 grupos, con "tipo" elegido por paciente en Leche y en Carnes).
    // Posición = número de grupo de la versión 3.
    migracionV3: [
      "cereales", "panificados", "verduras", "frutas",
      { nombre: "Leche y derivados", tipos: ["leche_alta", "leche_baja", "quesos"], sinTipo: "leche_alta" },
      { nombre: "Carnes y huevos", tipos: ["carne_alta", "carne_magra"], sinTipo: "carne_alta" },
      "legumbres", "azucares", "aceites",
    ],
  },

  /* ---------- Cuestionario (Ficha de evaluación – PPS Adultos, páginas 2 a 6) ---------- */
  // Las preguntas están escritas como en la ficha y en su mismo orden. No se
  // incluyen, por decisión del nutricionista: el examen físico, la fecha,
  // "Valorado por" ni el apartado de conclusiones ("Evaluado por", "CI Nº").
  //
  // Cada pregunta tiene un "id" fijo: con ese id se guarda la respuesta.
  // NO cambiar los id (se perdería el enlace con lo ya respondido). El texto
  // visible sí se puede cambiar, y se pueden agregar preguntas nuevas.
  //
  // tipo: "texto" (por defecto), "largo" (varios renglones), "numero",
  //       "fecha", "sino" (Si / No) u "opcion" (con su lista de "opciones").
  // soloSexo: la pregunta aparece solo en pacientes de ese sexo.
  // detalle: preguntas que acompañan a la principal (cantidad, describir…).
  // tabla: filas × columnas; cada casilla se guarda como "fila.columna".
  // tabla con "multiple: true": cada fila admite varios renglones (por
  //   ejemplo, Pescado: salmón y atún), cada uno con todas sus columnas.
  // columna de tipo "alimento": se elige de la base de alimentos (así se
  //   puede cruzar con el plan semanal) o se escribe como texto libre.
  cuestionario: {
    sino: ["Si", "No"],
    secciones: [
      { id: "datos", titulo: "Ficha de evaluación", campos: [
        { id: "estado_civil", texto: "Estado Civil" },
        { id: "ocupacion", texto: "Profesión u ocupación" },
        { id: "fum", texto: "¿Cuándo fue su último período? (FUM)", tipo: "fecha", soloSexo: "mujer" },
      ] },
      { id: "app", titulo: "Antecedentes patológicos personales",
        tabla: { titulo: "Signos Vitales", columnas: [{ id: "valor", texto: "Valor" }, { id: "dx", texto: "Diagnostico" }],
          filas: [{ id: "pa", texto: "Presion Arterial" }, { id: "fc", texto: "Frecuencia Cardiaca" }, { id: "fr", texto: "Frecuencia Respiratoria" }, { id: "temp", texto: "Tº axilar" }] },
        campos: [
          { id: "patologias", texto: "Patologias diagnosticadas", tipo: "largo" },
          { id: "alergia_alim", texto: "Alergia alimentaria" },
          { id: "intolerancia_alim", texto: "Intolerancia alimentaria" },
          { id: "farmacos", texto: "Tratamiento farmacologico", tipo: "sino", detalle: [{ id: "farmacos_esp", texto: "Especificar" }] },
        ] },
      { id: "apf", titulo: "Antecedentes patológicos familiares",
        tabla: { titulo: "Patologias", columnas: [{ id: "sino", texto: "Si/No", tipo: "sino" }, { id: "familiar", texto: "Familiar" }],
          filas: [{ id: "apf_obesidad", texto: "Obesidad" }, { id: "apf_hta", texto: "HTA" }, { id: "apf_ecv", texto: "ECV" }, { id: "apf_ca", texto: "Ca" },
                  { id: "apf_hipercol", texto: "Hipercolesterolemia" }, { id: "apf_hipertg", texto: "Hipertrigliceridemia" }, { id: "apf_dm", texto: "Diabetes Mellitus" }, { id: "apf_alergias", texto: "Alergias" }] },
        campos: [{ id: "apf_obs", texto: "Observaciones", tipo: "largo" }] },
      { id: "gi", titulo: "Síntomas gastrointestinales",
        tabla: { columnas: [{ id: "sino", texto: "Si/No", tipo: "sino" }, { id: "detalle", texto: "Detalle (opcional)" }],
          filas: [{ id: "gi_nauseas", texto: "Nauseas" }, { id: "gi_vomitos", texto: "Vómitos" }, { id: "gi_diarrea", texto: "Diarrea" }, { id: "gi_constipacion", texto: "Constipación" },
                  { id: "gi_disfagia", texto: "Disfagia" }, { id: "gi_odinofagia", texto: "Odinofagia" }, { id: "gi_pirosis", texto: "Pirosis" }, { id: "gi_flatulencia", texto: "Flatulencia" }] } },
      { id: "lab", titulo: "Datos de laboratorio", especial: "laboratorio" },
      { id: "antropo", titulo: "Datos antropométricos", especial: "antropometria" },
      { id: "anamnesis", titulo: "Anamnesis clínico-nutricional", campos: [
        { id: "fuma", texto: "Fuma", tipo: "sino", detalle: [{ id: "fuma_cant", texto: "Cantidad/día" }, { id: "fuma_tiempo", texto: "Tiempo" }] },
        { id: "alcohol", texto: "Bebidas alcohólicas", tipo: "sino", detalle: [{ id: "alcohol_frec", texto: "Frec. semanal" }, { id: "alcohol_tipo", texto: "Tipo de bebida" }] },
        { id: "agua", texto: "Agua", tipo: "sino", detalle: [{ id: "agua_cant", texto: "Cantidad/día" }] },
        { id: "jugos_nat", texto: "Jugos naturales", tipo: "sino", detalle: [{ id: "jugos_nat_cant", texto: "Cantidad/día" }] },
        { id: "jugos_env", texto: "Jugos envasados", tipo: "sino", detalle: [{ id: "jugos_env_cant", texto: "Cantidad/día" }] },
        { id: "carbonatadas", texto: "Bebidas carbonatadas", tipo: "sino", detalle: [{ id: "carbonatadas_cant", texto: "Cantidad/día" }] },
        { id: "plan_previo", texto: "Realizo algún tipo de plan alimentario", tipo: "sino", detalle: [
          { id: "plan_previo_tiempo", texto: "Tiempo" }, { id: "plan_previo_desc", texto: "Describir", tipo: "largo" },
          { id: "plan_previo_result", texto: "Resultados obtenidos" }, { id: "plan_previo_abandono", texto: "Motivos de abandono" }] },
        { id: "suplementos", texto: "Toma suplementos a base de vitaminas y minerales", tipo: "sino", detalle: [
          { id: "suplementos_desc", texto: "Describir" }, { id: "suplementos_por", texto: "Indicado por" }] },
        { id: "ronca", texto: "Durante el sueño, acostumbra roncar", tipo: "sino" },
        { id: "jadea", texto: "Durante el sueño, acostumbra jadear", tipo: "sino" },
        { id: "unas_quebradizas", texto: "Uñas quebradizas", tipo: "sino" },
        { id: "caida_cabello", texto: "Caída de cabello", tipo: "sino" },
        { id: "diuresis", texto: "Diuresis", tipo: "sino" },
        { id: "apetito", texto: "Su apetito es", tipo: "opcion", opciones: ["Voraz", "Bueno", "Regular", "Malo"] },
        { id: "apetito_entre", texto: "Siente apetito entre comidas", tipo: "opcion", opciones: ["Si", "No", "A veces"], detalle: [{ id: "apetito_entre_desc", texto: "Describir" }] },
        { id: "edulcorantes", texto: "Consume edulcorantes", tipo: "sino", detalle: [{ id: "edulcorantes_desc", texto: "Describir" }] },
      ] },
      { id: "r24", titulo: "Recordatorio de 24 horas", especial: "recordatorio" },
      { id: "frecuencia", titulo: "Cuestionario frecuencia de consumo alimentario",
        tabla: { multiple: true, columnas: [{ id: "tipo", texto: "Tipo", tipo: "alimento" }, { id: "cantidad", texto: "Cantidad" }, { id: "diaria", texto: "Frec. Diaria", tipo: "numero" },
                            { id: "semanal", texto: "Frec. Semanal", tipo: "numero" }, { id: "mensual", texto: "Frec. Mensual", tipo: "numero" }, { id: "obs", texto: "Obs." }],
          filas: [
            { id: "fc_leche", texto: "Leche" }, { id: "fc_yogur", texto: "Yogur" }, { id: "fc_queso", texto: "Queso" }, { id: "fc_carne_vacuna", texto: "Carne vacuna" },
            { id: "fc_pollo", texto: "Pollo o aves" }, { id: "fc_pescado", texto: "Pescado" }, { id: "fc_visceras", texto: "Vísceras" }, { id: "fc_huevos", texto: "Huevos" },
            { id: "fc_poroto", texto: "Poroto" }, { id: "fc_lenteja", texto: "Lenteja" }, { id: "fc_garbanzos", texto: "Garbanzos" }, { id: "fc_soja", texto: "Soja" },
            { id: "fc_papa", texto: "Papa" }, { id: "fc_mandioca", texto: "Mandioca" }, { id: "fc_batata", texto: "Batata" }, { id: "fc_hort_crudas", texto: "Hortalizas crudas" },
            { id: "fc_hort_cocidas", texto: "Hortalizas cocidas" }, { id: "fc_frutas", texto: "Frutas" }, { id: "fc_panificados", texto: "Panificados" }, { id: "fc_fideos", texto: "Fideos" },
            { id: "fc_otras_pastas", texto: "Otras pastas" }, { id: "fc_arroz", texto: "Arroz" }, { id: "fc_harinas", texto: "Harinas" }, { id: "fc_pasteleria", texto: "Prod. Pasteleria" },
            { id: "fc_azucar", texto: "Azúcar de mesa" }, { id: "fc_golosinas", texto: "Golosinas" }, { id: "fc_aceites", texto: "Aceites" }, { id: "fc_manteca", texto: "Manteca/Margarina" },
            { id: "fc_crema", texto: "Crema de leche" }, { id: "fc_aderezos", texto: "Aderezos comerciales" }, { id: "fc_alcohol", texto: "Bebidas alcohólicas" }, { id: "fc_carbonatadas", texto: "Bebidas carbonatadas" },
            { id: "fc_jugos", texto: "Jugos comerciales" }, { id: "fc_gelatinas", texto: "Gelatinas" }, { id: "fc_infusiones", texto: "Infusiones" }, { id: "fc_otros", texto: "Otros" },
          ] } },
    ],

    // Laboratorio: se pueden cargar varios análisis por paciente, cada uno con
    // su fecha. Para agregar una determinación fija, sumar un renglón acá con
    // un id nuevo. Desde la app también se agregan determinaciones sueltas.
    // "interpretaciones" es la lista para elegir en cada valor (la ficha no
    // trae valores de referencia: la interpretación la decide el nutricionista).
    laboratorio: {
      interpretaciones: ["Bajo", "Normal", "Alto"],
      determinaciones: [
        { id: "gr", texto: "GR" }, { id: "hb", texto: "Hb" }, { id: "hto", texto: "Hto" }, { id: "gb", texto: "GB" }, { id: "linfocitos", texto: "Linfocitos" },
        { id: "rtl", texto: "RTL" }, { id: "plaquetas", texto: "Plaquetas" }, { id: "prot_totales", texto: "Proteinas Totales" }, { id: "albumina", texto: "Albumina" },
        { id: "rel_alb_glob", texto: "Rel Album/Globulina" }, { id: "col_total", texto: "Colest Total" }, { id: "ldl", texto: "LDL" }, { id: "hdl", texto: "HDL" },
        { id: "tg", texto: "TG" }, { id: "glucosa", texto: "Glucosa" }, { id: "urea", texto: "Urea" }, { id: "creatinina", texto: "Creatinina" },
        { id: "ac_urico", texto: "Acido Urico" }, { id: "got", texto: "GOT" }, { id: "gpt", texto: "GPT" }, { id: "fosfatasa_alc", texto: "Fosfatasa Alc" },
      ],
    },

    // Datos antropométricos, en el orden de la ficha.
    //  - app: lo calcula o ya lo tiene la app (última medición); no se vuelve a cargar.
    //  - sin "app": se carga a mano (valor e interpretación).
    //  - suma: se calcula sumando esos campos (solo si están los cuatro).
    antropometria: {
      parametros: [
        { id: "an_peso", texto: "Peso Corporal Actual", app: "peso" }, { id: "an_talla", texto: "Talla", app: "talla" },
        { id: "an_peso_hab", texto: "Peso Habitual", app: "pesoHabitual" }, { id: "an_pct_hab", texto: "% Peso Habitual", app: "pctHabitual" },
        { id: "an_peso_ideal", texto: "Peso Ideal", app: "pesoIdeal" }, { id: "an_pct_ideal", texto: "% Peso Ideal", app: "pctIdeal" },
        { id: "an_peso_aj", texto: "Peso Ajustado", app: "pesoAjustado" }, { id: "an_imc", texto: "IMC", app: "imc" },
        { id: "an_peso_seco", texto: "Peso Seco" }, { id: "an_cintura", texto: "Cia. Cintura", app: "cintura" },
        { id: "an_perdida", texto: "% Pérdida de peso", app: "perdida" }, { id: "an_contextura", texto: "Contextura", app: "contextura" },
        { id: "an_muneca", texto: "Cia Muñeca", app: "muneca" }, { id: "an_cuello", texto: "Cia. de Cuello" },
        { id: "an_braquial", texto: "Cia Braquial" }, { id: "an_pct", texto: "PCT" },
        { id: "an_pantorrilla", texto: "Pantorrilla" }, { id: "an_pcb", texto: "PCB" },
        { id: "an_agua", texto: "% Agua" }, { id: "an_pcse", texto: "PCSE" },
        { id: "an_grasa", texto: "%Grasa", app: "grasa" }, { id: "an_pcsi", texto: "PCSI" },
        { id: "an_deurenberg", texto: "% Grasa Deurenberg", app: "deurenberg" }, { id: "an_suma4", texto: "Suma 4 pliegues", suma: ["an_pct", "an_pcb", "an_pcse", "an_pcsi"] },
        { id: "an_rcv", texto: "RCV según cintura", app: "rcv" }, { id: "an_cmb", texto: "CMB" },
        { id: "an_apnea", texto: "Riesgo apnea del sueño", app: "apnea" }, { id: "an_sagital", texto: "Perímetro sagital" },
      ],
      // Tabla de la ficha. Cuello: Bajo < 43 cm; Medio 43 a 48 cm; Alto > 48 cm.
      apnea: { campo: "an_cuello", bajoMenorA: 43, altoMayorA: 48 },
      // Tabla de la ficha. Riesgo metabólico si el perímetro sagital supera
      // este valor (cm): mujeres > 25, hombres > 23.
      sagital: { campo: "an_sagital", riesgoMayorA: { mujer: 25, hombre: 23 } },
    },

    // Comidas del recordatorio, en el orden de la ficha.
    recordatorio: { comidas: ["Desayuno", "Media Mañana", "Almuerzo", "Merienda", "Cena", "Colación"] },
  },
};