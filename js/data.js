/**
 * Dataset Oficial: Cafés de Especialidad de El Salvador
 * Datos curados de cafeterías de autor, las 6 cordilleras volcánicas,
 * variedades insignes (Pacamara, Bourbon, Pacas) y recetas de barista.
 */

const CAFES_DATA = [
  {
    id: "viva-espresso",
    nombre: "Viva Espresso",
    ciudad: "San Salvador / Santa Tecla",
    zona: "san-salvador",
    cordillera: "El Bálsamo - Quezaltepec",
    distintivo: "Pioneros del Barismo Mundial",
    rating: 4.9,
    reviewsCount: 1240,
    altura: "1,450 - 1,850 msnm",
    variedades: ["Pacamara Natural", "Red Bourbon", "Geisha Salvadoreño"],
    metodos: ["V60", "Chemex", "Aeropress", "Espresso Barista", "Nitro Cold Brew"],
    perfil: "Melocotón maduro, jazmín silvestre, miel de azahar y chocolate negro brillante.",
    bebidaInsigne: "Pacamara V60 Filtrado Lento & Flat White de Origen",
    maridaje: "Torta artesanal de pistacho y croissant de mantequilla francesa.",
    etiquetas: ["San Salvador", "Santa Tecla", "Microlotes", "Coworking", "Pioneros"],
    ubicacion: "Bambu City Center & Multiplaza, Blvd. del Hipódromo, San Salvador",
    horario: "Lun - Dom: 7:00 AM - 8:30 PM",
    telefono: "+503 2243-7000",
    instagram: "@vivaespresso1",
    imagen: "assets/cafe_modern.jpg",
    historia: "Fundada por Federico Bolaños, Viva Espresso es la institución que puso a El Salvador en el mapa mundial del barismo, entrenando a Alejandro Méndez cuando se coronó Campeón Mundial de Barismo (WBC 2011)."
  },
  {
    id: "alquimia-coffee",
    nombre: "Alquimia Coffee Roasters",
    ciudad: "Santa Tecla / Antiguo Cuscatlán",
    zona: "santa-tecla",
    cordillera: "Apaneca - Ilamatepec & El Bálsamo",
    distintivo: "Laboratorio Experimental de Tueste",
    rating: 4.9,
    reviewsCount: 980,
    altura: "1,500 - 1,950 msnm",
    variedades: ["Pacamara Anaeróbico", "Bourbon Miel", "Bernardina"],
    metodos: ["Sifón Japonés", "V60 Cerámica", "Kalita Wave", "Espresso Profiling"],
    perfil: "Moras silvestres, nibs de cacao criollo, tamarindo dulce y acidez crujiente de manzana verde.",
    bebidaInsigne: "Espresso Tonic de la Casa con reducción de café Honey y piel de naranja",
    maridaje: "Cheesecake de frutos rojos bañado en sirope de pulpa de café (cáscara).",
    etiquetas: ["Santa Tecla", "Microlotes", "Pet Friendly", "Terraza", "Laboratorio"],
    ubicacion: "Paseo El Carmen, Santa Tecla, La Libertad",
    horario: "Mar - Dom: 8:00 AM - 9:00 PM",
    telefono: "+503 2228-5412",
    instagram: "@alquimiacoffee",
    imagen: "assets/cafe_patio.jpg",
    historia: "Verdaderos alquimistas del grano. Cada microlote cuenta con una curva de tueste científica que maximiza los azúcares naturales desarrollados en las laderas volcánicas."
  },
  {
    id: "crafters-coffee",
    nombre: "Crafters Specialty Coffee",
    ciudad: "San Benito, San Salvador",
    zona: "san-salvador",
    cordillera: "Alotepec - Metapán",
    distintivo: "Arquitectura Minimalista & Taza Limpia",
    rating: 4.8,
    reviewsCount: 840,
    altura: "1,600 - 2,100 msnm",
    variedades: ["Pacamara Lavado", "Kenya SL28 Salvadoreño", "Pacas"],
    metodos: ["Chemex 6 Tazas", "Hario Switch", "Espresso Doble", "Cold Brew 18h"],
    perfil: "Flor de azahar, mandarina dulce, panela caramelizada y cuerpo sedoso aterciopelado.",
    bebidaInsigne: "Cold Brew infundido con nitrógeno y notas sutiles de vainilla de Chinameca",
    maridaje: "Tostón de masa madre con aguacate hass, queso de cabra y semillas tostadas.",
    etiquetas: ["San Salvador", "Coworking", "Microlotes", "Minimalista"],
    ubicacion: "Calle La Mascota & Colonia San Benito, San Salvador",
    horario: "Lun - Sáb: 7:00 AM - 7:30 PM | Dom: 8:00 AM - 6:00 PM",
    telefono: "+503 2556-9182",
    instagram: "@crafterscoffee",
    imagen: "assets/cafe_modern.jpg",
    historia: "Un templo para los puristas del café de especialidad. Su barra de filtrados expone cafés galardonados en el certamen Taza de la Excelencia (Cup of Excellence)."
  },
  {
    id: "four-monkeys",
    nombre: "4 Monkeys Coffee Roasters",
    ciudad: "Colonia Escalón & Santa Elena",
    zona: "san-salvador",
    cordillera: "Apaneca - Ilamatepec",
    distintivo: "Tueste en Vivo & Cultura Urbana",
    rating: 4.8,
    reviewsCount: 1120,
    altura: "1,380 - 1,750 msnm",
    variedades: ["Yellow Bourbon", "Pacamara Maceración Carbónica", "Catuai Rojo"],
    metodos: ["Aeropress Invertido", "Clever Dripper", "Espresso", "Batch Brew de Lote"],
    perfil: "Caramelo salado, chocolate con leche, avellana tostada y manzana roja.",
    bebidaInsigne: "Cortado 'Gibraltar' servido con Pacamara de tueste medio y leche texturizada a 60°C",
    maridaje: "Galletas de chispas de chocolate amargo recién salidas del horno y banano bread.",
    etiquetas: ["San Salvador", "Pet Friendly", "Coworking", "Tostadores"],
    ubicacion: "79 Av. Norte y 3a Calle Poniente, Colonia Escalón, San Salvador",
    horario: "Todos los días: 7:30 AM - 8:30 PM",
    telefono: "+503 2263-4411",
    instagram: "@4monkeyscoffee",
    imagen: "assets/cafe_modern.jpg",
    historia: "Con tostador de tambor a la vista de los comensales, difunden la cultura del café fresco y la conexión directa con productores de fincas familiares."
  },
  {
    id: "siete-coffee",
    nombre: "Siete Specialty Coffee",
    ciudad: "Antiguo Cuscatlán",
    zona: "santa-tecla",
    cordillera: "El Bálsamo - Quezaltepec",
    distintivo: "Santuario Botánico & Calma Urbana",
    rating: 4.9,
    reviewsCount: 710,
    altura: "1,350 - 1,700 msnm",
    variedades: ["Pacamara Honey", "Orange Bourbon", "Maragogipe"],
    metodos: ["Origami Dripper", "V60 Vidrio", "Prensa Francesa", "Espresso Clásico"],
    perfil: "Fresas silvestres, caña de azúcar madura, té negro bergamota y notas de lima dulce.",
    bebidaInsigne: "Filtrado en Origami Dripper con Pacamara Honey y flor de jazmín salvadoreño",
    maridaje: "Alfajores de dulce de leche artesanal y focaccia de romero y aceitunas.",
    etiquetas: ["Santa Tecla", "Terraza", "Pet Friendly", "Botánico"],
    ubicacion: "Calle Cuscatlán Poniente, Antiguo Cuscatlán",
    horario: "Mar - Dom: 8:00 AM - 8:00 PM",
    telefono: "+503 2289-9134",
    instagram: "@sietecoffeesv",
    imagen: "assets/cafe_patio.jpg",
    historia: "Rodeado de monsteras gigantes, helechos y orquídeas salvadoreñas, ofrece un escape sensorial sereno donde cada taza se prepara con paciencia ceremonial."
  },
  {
    id: "entre-nubes",
    nombre: "Entre Nubes Café & Mirador",
    ciudad: "Apaneca, Ruta de las Flores",
    zona: "ruta-flores",
    cordillera: "Apaneca - Ilamatepec",
    distintivo: "Café en la Cima Volcánica & Niebla",
    rating: 4.9,
    reviewsCount: 1620,
    altura: "1,700 - 2,150 msnm",
    variedades: ["Pacamara Reserva de Altura", "Bourbon Finca Propia", "Typica Ancestral"],
    metodos: ["V60 Cerámica", "Cafetera Chorreadora Tradicional", "Chemex", "Espresso de Altura"],
    perfil: "Miel virgen de cafetal, ciruela pasa, chocolate amargo 80% y canela en rama.",
    bebidaInsigne: "Café de Altura servido en taza de barro negro artesanal junto al mirador de las nubes",
    maridaje: "Auténtica quesadilla salvadoreña de queso de hoja y pupusas de arroz al comal.",
    etiquetas: ["Ruta de las Flores", "Terraza", "Vista Volcán", "Pet Friendly", "Origen Directo"],
    ubicacion: "Km 94.5, Carretera entre Apaneca y Ataco, Ahuachapán",
    horario: "Lun - Dom: 8:00 AM - 7:00 PM",
    telefono: "+503 2433-0219",
    instagram: "@entrenubescafe",
    imagen: "assets/cafe_mountain.jpg",
    historia: "Ubicado en las alturas de la cordillera Apaneca-Ilamatepec, donde la bruma desciende sobre los cafetales bajo sombra y el clima fresco invita al café recién chorreado."
  },
  {
    id: "luz-negra",
    nombre: "Café Luz Negra",
    ciudad: "Santa Ana (Centro Histórico)",
    zona: "santa-ana",
    cordillera: "Apaneca - Ilamatepec",
    distintivo: "Vanguardia Sensorial & Catas Guiadas",
    rating: 4.8,
    reviewsCount: 560,
    altura: "1,550 - 1,900 msnm",
    variedades: ["Pacas Natural", "Bourbon Rosado", "Pacamara Amarillo"],
    metodos: ["Aeropress de Competición", "V60", "Torre de Goteo Frío (Cold Drip)"],
    perfil: "Piña madura deshidratada, infusión de flor de jamaica, cacao criollo y miel de agave.",
    bebidaInsigne: "Tónica de Cáscara Fermentada con extracción lenta de café Pacas Natural",
    maridaje: "Brownie meloso de cacao salvadoreño 75% con escamas de sal marina de Usulután.",
    etiquetas: ["Santa Ana", "Microlotes", "Alternativo", "Catas"],
    ubicacion: "2a Calle Poniente frente a Teatro Nacional, Santa Ana",
    horario: "Mié - Dom: 9:00 AM - 8:30 PM",
    telefono: "+503 2440-1890",
    instagram: "@luznegracafe",
    imagen: "assets/cafe_modern.jpg",
    historia: "Epicentro de la nueva ola del café en la Ciudad Heroica de Santa Ana, fusionando arte contemporáneo, música y microlotes provenientes del cráter del Ilamatepec."
  },
  {
    id: "biscuit-factory",
    nombre: "Biscuit Factory Specialty Coffee",
    ciudad: "Santa Elena, Antiguo Cuscatlán",
    zona: "santa-tecla",
    cordillera: "El Bálsamo - Quezaltepec",
    distintivo: "Maridaje de Autor & Repostería Fina",
    rating: 4.7,
    reviewsCount: 1190,
    altura: "1,320 - 1,650 msnm",
    variedades: ["Bourbon Lavado", "Pacamara Caramelo"],
    metodos: ["Espresso Craft", "Chemex Clásico", "Nitro Cold Brew", "Affogato de Vainilla"],
    perfil: "Vainilla bourbon, caramelo dulce, avellana cremosa y toque sutil de cardamomo.",
    bebidaInsigne: "Affogato de Especialidad con shot doble de Pacamara y helado artesanal de vaina",
    maridaje: "Galletas red velvet rellenas de queso crema y sándwich de brioche artesanal.",
    etiquetas: ["Santa Tecla", "San Salvador", "Brunch", "Pet Friendly"],
    ubicacion: "Bulevar Santa Elena, Calle El Boquerón, Antiguo Cuscatlán",
    horario: "Lun - Dom: 7:00 AM - 8:00 PM",
    telefono: "+503 2520-4100",
    instagram: "@biscuitfactorysv",
    imagen: "assets/cafe_patio.jpg",
    historia: "El destino preferido para combinar café de especialidad salvadoreño con alta panadería artesanal en un ambiente relajado y luminoso."
  },
  {
    id: "cafe-albania",
    nombre: "Café Albania & Mirador",
    ciudad: "Apaneca, Ruta de las Flores",
    zona: "ruta-flores",
    cordillera: "Apaneca - Ilamatepec",
    distintivo: "Aventura, Mirador Volcánico & Laberinto",
    rating: 4.8,
    reviewsCount: 2310,
    altura: "1,650 - 1,920 msnm",
    variedades: ["Bourbon Rojo", "Pacamara Lavado de Altura"],
    metodos: ["Prensa Francesa de Altura", "Espresso", "V60 Filtro", "Café de Olla Tradicional"],
    perfil: "Miel de panela, nuez moscada, manzana roja al horno y acidez brillante balanceada.",
    bebidaInsigne: "Café de Olla Volcánico con canela silvestre servido en terraza frente al abismo verde",
    maridaje: "Semita de piña salvadoreña con miel de dulce de atado y empanadas de plátano.",
    etiquetas: ["Ruta de las Flores", "Terraza", "Vista Volcán", "Aventura"],
    ubicacion: "Apaneca, Ruta de las Flores, Departamento de Ahuachapán",
    horario: "Lun - Dom: 8:00 AM - 6:30 PM",
    telefono: "+503 2433-0498",
    instagram: "@cafealbania.apaneca",
    imagen: "assets/cafe_mountain.jpg",
    historia: "Famoso por su icónico laberinto verde y tirolesa entre las copas de los árboles, ofrece café cosechado en las laderas más altas de Ahuachapán."
  }
];

const CORDILLERAS_DATA = [
  {
    id: "apaneca-ilamatepec",
    nombre: "Apaneca - Ilamatepec",
    departamentos: "Santa Ana, Sonsonate y Ahuachapán",
    altura: "1,200 - 2,380 msnm",
    volcanes: "Volcán Ilamatepec (Santa Ana) e Izalco",
    suelo: "Ceniza volcánica joven rica en minerales, nitrógeno y potasio.",
    notas: ["Chocolate negro", "Jazmín", "Melocotón", "Mandarina", "Mora silvestre"],
    variedadesClave: "Pacamara, Bourbon Rojo y Bourbon Amarillo, Pacas",
    descripcion: "Es la cordillera cafetalera más célebre y premiada de El Salvador. Produce cafés de perfil balanceado con acidez cítrica brillante, dulzura intensa y notas florales distintivas.",
    fincasFamosas: ["Finca Las Delicias", "Finca El Carmen", "Finca Himalaya", "Finca San José"]
  },
  {
    id: "alotepec-metapan",
    nombre: "Alotepec - Metapán",
    departamentos: "Chalatenango y Santa Ana",
    altura: "1,400 - 2,250 msnm",
    volcanes: "Macizo de Montecristo y Cordillera Alotepeque",
    suelo: "Tierras altas con abundante bosque nuboso y materia orgánica profunda.",
    notas: ["Albaricoque", "Caña de azúcar", "Uva dulce", "Té de jazmín", "Chocolate con leche"],
    variedadesClave: "Pacamara, Pacas, Geisha, Bourbon",
    descripcion: "Cuna de múltiples primeros lugares en la 'Taza de la Excelencia' (Cup of Excellence). Sus microclimas de altitud extrema en Chalatenango producen cafés sedosos de insólita complejidad.",
    fincasFamosas: ["Finca El Paraíso", "Finca Los Pirineos", "Finca La Esmeralda"]
  },
  {
    id: "el-balsamo-quezaltepec",
    nombre: "El Bálsamo - Quezaltepec",
    departamentos: "San Salvador y La Libertad",
    altura: "1,200 - 1,960 msnm",
    volcanes: "Volcán Quezaltepec (San Salvador)",
    suelo: "Suelos volcánicos bien drenados enriquecidos con resina de árbol de bálsamo.",
    notas: ["Caramelo", "Cacao dulce", "Nuez de macadamia", "Ciruela roja", "Miel"],
    variedadesClave: "Bourbon, Pacas, Pacamara",
    descripcion: "Abraza al gran San Salvador y la costa de La Libertad. Ofrece cafés con cuerpo cremoso, dulzura a panela y balance sobresaliente ideal para espressos perfectos.",
    fincasFamosas: ["Finca San Antonio", "Finca El Boquerón", "Finca Miramar"]
  },
  {
    id: "chinchontepec",
    nombre: "Chinchontepec",
    departamentos: "San Vicente y La Paz",
    altura: "1,100 - 1,800 msnm",
    volcanes: "Volcán Chinchontepec (San Vicente)",
    suelo: "Suelos volcánicos jóvenes con microclimas térmicos por niebla matutina.",
    notas: ["Vainilla suave", "Manzana verde", "Chocolate blanco", "Almendra"],
    variedadesClave: "Bourbon, Pacas, Cuscatleco",
    descripcion: "Cafés de acidez elegante y suavemente frutal. Los cafetales cultivados bajo la sombra de árboles nativos preservan la biodiversidad de la zona paracentral.",
    fincasFamosas: ["Finca Las Mercedes", "Finca Santa Elena"]
  },
  {
    id: "tecapa-chinameca",
    nombre: "Tecapa - Chinameca",
    departamentos: "Usulután y San Miguel",
    altura: "1,150 - 1,750 msnm",
    volcanes: "Volcán Tecapa y Volcán de Chinameca (Laguna de Alegría)",
    suelo: "Suelos porosos minerales alrededor del cráter esmeralda de Alegría.",
    notas: ["Especias dulces", "Miel de caña", "Chocolate con avellanas", "Cereza"],
    variedadesClave: "Bourbon, Pacamara, Pacas",
    descripcion: "Zona oriental de tradición cafetalera centenaria. Su cercanía a fumarolas geotérmicas y alturas volcánicas dota al café de un bouquet especiado y licoroso.",
    fincasFamosas: ["Finca Alegría", "Finca El Tigre"]
  },
  {
    id: "cacahuatique",
    nombre: "Cacahuatique",
    departamentos: "Morazán y San Miguel",
    altura: "1,000 - 1,650 msnm",
    volcanes: "Cerro Cacahuatique",
    suelo: "Suelos arcillosos ricos en minerales ancestrales y vientos de montaña.",
    notas: ["Cacao puro", "Frutas tropicales maduras", "Panela dorada", "Cítricos suaves"],
    variedadesClave: "Bourbon, Pacas",
    descripcion: "La joya oriental de Morazán. Cafés recolectados a mano por comunidades campesinas comprometidas con el cultivo agroforestal sostenible.",
    fincasFamosas: ["Finca Cacahuatique", "Finca Montecristo Oriente"]
  }
];

const VARIEDADES_DATA = [
  {
    id: "pacamara",
    nombre: "Pacamara Salvadoreño",
    origen: "Creado en El Salvador (1958) por el Instituto Salvadoreño para Investigaciones del Café (ISIC)",
    grano: "Grano gigante (Screen 19+), ovalado y de textura densa.",
    perfil: "Complejidad exótica: frutos rojos, maracuyá, jazmín, miel, acidez málica crujiente y cuerpo sedoso prolongado.",
    metodoRecomendado: "V60, Chemex y Origami Dripper para resaltar su brillo aromático.",
    curiosidad: "Cruce genético entre 'Pacas' (mutación salvadoreña) y 'Maragogipe' (variedad gigante). Es el grano estrella que ha ganado más de 20 Tazas de la Excelencia mundiales.",
    badge: "Orgullo Nacional 🇸🇻"
  },
  {
    id: "bourbon",
    nombre: "Bourbon Tradicional",
    origen: "Introducido a El Salvador en el siglo XIX, base del bosque cafetero salvadoreño.",
    grano: "Grano redondeado y uniforme de maduración roja, amarilla o rosada.",
    perfil: "Elegancia clásica: chocolate con leche, caramelo, avellanas tostadas, dulzura de caña y cuerpo redondo y cremoso.",
    metodoRecomendado: "Espresso, Prensa Francesa y Aeropress para realzar su dulzor acaramelado.",
    curiosidad: "El 60% de los cafetales bajo sombra de El Salvador pertenecen a la variedad Bourbon, constituyendo el segundo pulmón verde del país.",
    badge: "Realeza Clásica ☕"
  },
  {
    id: "pacas",
    nombre: "Pacas Natural",
    origen: "Descubierto en 1949 en Finca San Rafael, Santa Ana, por don Fernando Alberto Pacas Figueroa.",
    grano: "Planta de porte bajo con follaje denso y excelente productividad en vientos fuertes.",
    perfil: "Taza limpia y balanceada: notas de manzana dulce, miel de caña, cacao y acidez cítrica moderada y agradable.",
    metodoRecomendado: "Cold Brew, Kalita Wave y filtrados lentos.",
    curiosidad: "Es una mutación natural del Bourbon que se adaptó a los suelos volcánicos de Santa Ana. Padre genético del Pacamara.",
    badge: "Descubierto en Santa Ana 🌋"
  }
];

const BREW_RECIPES = {
  v60: {
    nombre: "Hario V60 - Filtrado Artesanal",
    ratio: "1:15 (Recomendado para Pacamara y Bourbon)",
    molienda: "Media-Fina (Textura sal de mar fina)",
    temperatura: "92°C - 94°C",
    tiempoTotal: 180, // segundos (3:00)
    descripcion: "El método predilecto de los baristas salvadoreños para extraer la acidez vibrante, flores de jazmín y frutas tropicales del Pacamara.",
    fases: [
      { tiempo: 45, nombre: "Pre-infusión (Bloom)", instruccion: "Vierte 50g de agua en círculos suaves. Permite que el café libere los gases volcánicos atrapados." },
      { tiempo: 90, nombre: "Primer Vertido Continuo", instruccion: "Vierte suavemente en espiral desde el centro hacia los bordes hasta alcanzar 150g de agua." },
      { tiempo: 140, nombre: "Segundo Vertido de Balance", instruccion: "Vierte lentamente hasta completar los 250g totales manteniendo el lecho plano." },
      { tiempo: 180, nombre: "Drenado Final y Servido", instruccion: "Deja drenar por completo. Retira el portafiltro, agita la jarra para oxigenar y sirve en taza precalentada." }
    ]
  },
  chemex: {
    nombre: "Chemex - Pureza y Claridad",
    ratio: "1:16 (Cuerpo limpio y luminoso)",
    molienda: "Media-Gruesa (Textura sal gruesa kosher)",
    temperatura: "93°C",
    tiempoTotal: 240, // segundos (4:00)
    descripcion: "Su filtro triple de papel grueso retiene todos los aceites pesados, produciendo una taza cristalina que resalta la dulzura a miel y panela.",
    fases: [
      { tiempo: 45, nombre: "Bloom Inicial", instruccion: "Humedece los 30g de café con 80g de agua. Observa la floración aromática." },
      { tiempo: 120, nombre: "Vertido Central", instruccion: "Vierte con flujo continuo y lento hasta los 250g de agua evitando tocar las paredes del filtro." },
      { tiempo: 180, nombre: "Vertido Final", instruccion: "Completa hasta 480g de agua en espirales concéntricas suaves." },
      { tiempo: 240, nombre: "Filtrado y Oxigenación", instruccion: "Retira el filtro de papel, remueve la jarra Chemex para homogeneizar los estratos de extracción." }
    ]
  },
  aeropress: {
    nombre: "Aeropress - Método Invertido",
    ratio: "1:12 (Intensidad y notas densas)",
    molienda: "Media (Azúcar morena)",
    temperatura: "90°C",
    tiempoTotal: 120, // segundos (2:00)
    descripcion: "Extracción por inmersión y presión suave que exalta las notas chocolatadas, caramelo denso y cuerpo licoroso del café de El Salvador.",
    fases: [
      { tiempo: 30, nombre: "Inmersión Rápida", instruccion: "En posición invertida, vierte 100g de agua sobre 18g de café y remueve 5 veces con la paleta." },
      { tiempo: 75, nombre: "Vertido Total y Tapa", instruccion: "Vierte agua hasta llegar a 200g. Coloca el portafiltro con papel enjuagado y asegura bien la rosca." },
      { tiempo: 95, nombre: "Giro Cuidadoso", instruccion: "Con firmeza, voltea el Aeropress sobre tu taza o jarra receptora." },
      { tiempo: 120, nombre: "Prensado Suave y Constante", instruccion: "Presiona el émbolo con peso constante durante 25 segundos hasta escuchar el primer silbido de aire." }
    ]
  },
  frenchpress: {
    nombre: "Prensa Francesa - Riqueza Volcánica",
    ratio: "1:14 (Textura aterciopelada y aceites naturales)",
    molienda: "Gruesa (Sal marina gruesa)",
    temperatura: "94°C",
    tiempoTotal: 270, // segundos (4:30)
    descripcion: "Inmersión total que conserva los aceites y micropartículas esenciales, brindando la máxima sensación de cuerpo y postgusto prolongado.",
    fases: [
      { tiempo: 60, nombre: "Infusión Inicial", instruccion: "Coloca 20g de café y vierte 100g de agua. Deja reposar 1 minuto." },
      { tiempo: 90, nombre: "Rompimiento de Costra", instruccion: "Vierte los 180g restantes y con una cuchara rompe suavemente la costra superficial." },
      { tiempo: 240, nombre: "Reposo de Asentamiento", instruccion: "Coloca la tapa con el émbolo arriba sin empujar. Permite que las partículas finas decanten al fondo." },
      { tiempo: 270, nombre: "Prensado Lento", instruccion: "Baja el émbolo con delicadeza sin comprimir los sedimentos y sirve inmediatamente." }
    ]
  }
};
