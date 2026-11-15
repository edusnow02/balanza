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

   Convención de las tablas de rangos: cada fila dice "hasta" (límite
   superior EXCLUSIVO). Se recorre de arriba hacia abajo y gana la primera
   fila cuyo "hasta" sea mayor que el valor. "hasta: null" = sin límite.
   ========================================================================== */
window.CONFIG = {
  version: "3.0 — adultos",

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
  // "aporte" = calorías y macros de UNA porción del grupo. La guía paraguaya
  // no lo trae, así que se completa así (decisión del nutricionista):
  //  - Cereales, Panificados, Verduras, Azúcares: Guía de intercambio de
  //    alimentos (MINSA Perú 2014).
  //  - Frutas, Legumbres, Aceites: tabla de alimentos propia, porque la
  //    porción peruana no coincide con la paraguaya (1 manzana de 140 g,
  //    50 g de lenteja, 5 g de aceite).
  //  - Leche y Carnes: la guía peruana tiene más de una fila; se elige la
  //    "variante" en cada paciente.
  porciones: {
    columnas: [
      { id: "a19h", nombre: "Adultos 19–29, hombre", edadMin: 19, edadMax: 29,  sexo: "hombre", kcal: 2550 },
      { id: "a19m", nombre: "Adultos 19–29, mujer",  edadMin: 19, edadMax: 29,  sexo: "mujer",  kcal: 1900 },
      { id: "a30h", nombre: "Adultos 30–59, hombre", edadMin: 30, edadMax: 59,  sexo: "hombre", kcal: 2450 },
      { id: "a30m", nombre: "Adultos 30–59, mujer",  edadMin: 30, edadMax: 59,  sexo: "mujer",  kcal: 1850 },
      { id: "a60h", nombre: "Adultos mayores (60 o más), hombre", edadMin: 60, edadMax: 200, sexo: "hombre", kcal: 2050 },
      { id: "a60m", nombre: "Adultos mayores (60 o más), mujer",  edadMin: 60, edadMax: 200, sexo: "mujer",  kcal: 1700 },
    ],
    grupos: [
      { nombre: "Cereales, tubérculos y derivados", corto: "Cereales",
        porcion: "90 g arroz cocido (¼ plato) · 200 g polenta (¼ plato) · 90 g fideo cocido (¼ plato) · 100 g mandioca cocida · 200 g papa cocida (¼ plato) · 185 g batata cocida (¼ plato)",
        aporte: { kcal: 135, hc: 25, prot: 5, grasa: 1 },
        valores: { a19h: "6", a19m: "4", a30h: "6", a30m: "3", a60h: "3", a60m: "2" } },
      { nombre: "Panificados", corto: "Panificados",
        porcion: "50 g galleta (1 un.) · 50 g pan felipe (1 un.) · 50 g palito/coquito (10 un.) · 65 g pan de sándwich (2 rebanadas) · 55 g rosquita (4 un.) · 50 g pan árabe (1½ un.) · 30 g galletita de agua (8 un.)",
        aporte: { kcal: 135, hc: 25, prot: 5, grasa: 1 },
        valores: { a19h: "2", a19m: "2", a30h: "2", a30m: "2", a60h: "2", a60m: "2" } },
      { nombre: "Verduras", corto: "Verduras",
        porcion: "100 g verduras crudas (1 taza o ½ plato) · 100 g verduras cocidas (1 taza o ½ plato)",
        aporte: { kcal: 25, hc: 5, prot: 1, grasa: 0 },
        valores: { a19h: "4", a19m: "4", a30h: "4", a30m: "4", a60h: "4", a60m: "3" } },
      { nombre: "Frutas", corto: "Frutas",
        porcion: "140 g manzana (1 un.) · 120 g pera (1 un.) · 110 g banana (1 un.) · 180 g naranja (1 un.) · 90 g mamón (¾ taza) · 130 g piña (¾ taza) · 120 g uva (¾ taza) · 120 g kiwi (1 un.) · 250 g acerola (1 taza)",
        aporte: { kcal: 90.4, hc: 21.3, prot: 0.4, grasa: 0.4 },
        valores: { a19h: "3", a19m: "3", a30h: "3", a30m: "3", a60h: "3", a60m: "3" } },
      { nombre: "Leche y derivados", corto: "Leche",
        porcion: "200 ml leche (1 taza) · 200 g yogur (1 taza) · 30 g queso (1 feta) · 25 g queso rallado (5 cucharadas)",
        variantes: [
          { nombre: "Lácteos altos en grasa", kcal: 130, hc: 10, prot: 7,  grasa: 7 },
          { nombre: "Lácteos bajos en grasa", kcal: 65,  hc: 10, prot: 5,  grasa: 1 },
          { nombre: "Quesos altos en grasa",  kcal: 130, hc: 1,  prot: 10, grasa: 9 },
        ],
        valores: { a19h: "4", a19m: "3-4", a30h: "4", a30m: "3-4", a60h: "3-4", a60m: "3-4" } },
      { nombre: "Carnes y huevos", corto: "Carnes",
        porcion: "50 g carne vacuna/hígado · 50 g carne molida (1 cucharada colmada) · 50 g pollo (1 muslo) · 50 g pescado (1 palma) · 50 g atún enlatado (2 cucharadas) · 50 g huevo de gallina (1 un.) · 50 g carne de cerdo · 44 g huevo de codorniz (4 un.)",
        variantes: [
          { nombre: "Carnes altas en grasa", kcal: 130, hc: 0, prot: 12, grasa: 9 },
          { nombre: "Carnes bajas en grasa", kcal: 55,  hc: 0, prot: 11, grasa: 1 },
        ],
        valores: { a19h: "4", a19m: "4", a30h: "4", a30m: "3", a60h: "4", a60m: "3-4" } },
      { nombre: "Legumbres secas", corto: "Legumbres",
        porcion: "50 g de porotos / lenteja / arveja (¼ taza o 4 cucharadas)",
        aporte: { kcal: 175.3, hc: 30, prot: 12.3, grasa: 0.7 },
        valores: { a19h: "1", a19m: "1", a30h: "1", a30m: "1", a60h: "1", a60m: "1" } },
      { nombre: "Azúcares y mieles", corto: "Azúcares",
        porcion: "5 g azúcar (1 cucharadita) · 6 g miel (1 cucharadita) · 5 g dulce (1 cucharadita)",
        aporte: { kcal: 20, hc: 6, prot: 0, grasa: 0 },
        valores: { a19h: "4", a19m: "4", a30h: "4", a30m: "4", a60h: "4", a60m: "4" } },
      { nombre: "Aceites y grasas", corto: "Aceites",
        porcion: "5 ml aceite (1 cucharada) · 12 g mayonesa (1 cucharada) · 6 g margarina (1 cucharada) · 8 g maní (12 un.)",
        aporte: { kcal: 45, hc: 0, prot: 0, grasa: 5 },
        valores: { a19h: "4", a19m: "3", a30h: "4", a30m: "3", a60h: "3", a60m: "2" } },
    ],
    // A qué grupo de porciones cuenta cada grupo de la tabla de alimentos
    // (posición en la lista de arriba, empezando en 0). Se usa solo para la
    // guía "cuánto llevás cubierto" del plan semanal, que es aproximada.
    // Los grupos que no figuran acá (por ejemplo "Otros") no se cuentan.
    grupoDeAlimento: { "Cereales": 0, "Panificados": 1, "Vegetales": 2, "Frutas": 3, "Lácteos": 4, "Carnes": 5, "Huevos": 5,
                       "Legumbres": 6, "Dulces": 7, "Grasas": 8, "Frutos secos": 8 },
  },
};