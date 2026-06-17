# NewsApp — Noticias por Categoría

**Curso:** Desarrollo de Aplicaciones Móviles 2026  
**Docente:** Andrés Pastorini  
**Escenario:** #4 — Noticias por Categoría (NewsAPI)  
**Framework:** React Native + Expo

---

## Descripción

Aplicación móvil que consume la API pública [NewsAPI](https://newsapi.org) para mostrar noticias organizadas por categoría, con búsqueda por tópicos, modo claro/oscuro automático y guardado de artículos favoritos.

---

## Arquitectura

```
NewsApp/
├── App.tsx                    # Entrada, navegación, temas
├── src/
│   ├── types/news.ts          # Interfaces TypeScript
│   ├── constants/categories.ts# Categorías de noticias
│   ├── services/
│   │   ├── newsApi.ts         # Consumo de NewsAPI
│   │   ├── storage.ts         # AsyncStorage (favoritos)
│   │   └── backgroundTask.ts  # Background Service (expo-background-fetch)
│   ├── hooks/
│   │   └── useNetworkStatus.ts# Monitoreo de red (BroadcastReceiver equiv.)
│   ├── components/
│   │   ├── ArticleCard.tsx    # Tarjeta de artículo
│   │   └── CategoryCard.tsx   # Tarjeta de categoría
│   └── screens/
│       ├── HomeScreen.tsx     # Pantalla principal con categorías y búsqueda
│       ├── ArticleListScreen.tsx # Lista de noticias por categoría/búsqueda
│       ├── ArticleDetailScreen.tsx # Detalle del artículo
│       └── FavoritesScreen.tsx  # Artículos guardados
├── __tests__/
│   ├── newsApi.test.ts        # Tests del servicio API
│   └── storage.test.ts        # Tests del servicio de almacenamiento
└── fastlane/
    ├── Fastfile               # Lanes: test, build_debug, build_release, ci
    └── Appfile                # Identificadores de la app
```

---

## Componentes Android implementados

| Componente Android | Implementación en React Native |
|---|---|
| **Activity** | Cada pantalla (`HomeScreen`, `ArticleListScreen`, `ArticleDetailScreen`, `FavoritesScreen`) actúa como una Activity independiente gestionada por React Navigation |
| **Service** | `backgroundTask.ts` usa `expo-background-fetch` + `expo-task-manager` para ejecutar sincronización de noticias en segundo plano |
| **BroadcastReceiver** | `useNetworkStatus.ts` usa `expo-network` para escuchar cambios de conectividad, equivalente a un receiver de `CONNECTIVITY_CHANGE` |
| **ContentProvider** | `storage.ts` con `AsyncStorage` expone una capa de datos local que abstrae el acceso a favoritos (equivalente a un ContentProvider local) |
| **Intent** | `Share.share()` en `ArticleDetailScreen` dispara el share intent nativo; `Linking.openURL()` dispara un `ACTION_VIEW` intent para abrir el navegador |

---

## Navegación (3+ rutas con paso de parámetros)

```
Tab Navigator
├── Inicio (HomeTab)
│   └── Stack Navigator
│       ├── HomeScreen              → categorías + búsqueda
│       ├── ArticleListScreen       ← recibe: { category?, categoryName, query? }
│       ├── ArticleDetailScreen     ← recibe: { article: Article }
│       └── FavoritesScreen
└── Favoritos (FavoritesTab)
    └── FavoritesScreen
```

---

## Persistencia

- **AsyncStorage** (`@react-native-async-storage/async-storage`)
- Clave: `@news_favorites` → array JSON de artículos guardados
- Operaciones: `getFavorites`, `addFavorite`, `removeFavorite`, `isFavorite`

---

## Pasos para compilar y ejecutar

### Requisitos previos

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Android Studio con emulador configurado (o dispositivo físico)

### 1. Clonar y configurar

```bash
git clone <url-del-repo>
cd NewsApp
npm install
```

### 2. Configurar la API key

Crear el archivo `.env` en la raíz del proyecto:

```bash
echo "EXPO_PUBLIC_NEWS_API_KEY=tu_api_key_aqui" > .env
```

Obtener la key gratis en: [https://newsapi.org/register](https://newsapi.org/register)

### 3. Ejecutar en emulador

```bash
# Android
npx expo start --android

# iOS
npx expo start --ios

# Expo Go (QR code)
npx expo start
```

### 4. Ejecutar tests

```bash
npm test
# Con coverage:
npm run test:coverage
```

### 5. Ejecutar con Fastlane

```bash
# Instalar fastlane (requiere Ruby)
gem install fastlane

# Ejecutar tests
fastlane android test

# Build debug
fastlane android build_debug

# Pipeline completo (tests + build)
fastlane android ci
```

---

## Manual de usuario

1. **Pantalla principal**: Al abrir la app se muestran 7 categorías de noticias.
2. **Ver noticias por categoría**: Tocar cualquier categoría para ver los titulares más recientes.
3. **Buscar noticias**: Escribir en la barra de búsqueda y presionar Enter para buscar por tópico.
4. **Ver detalle**: Tocar un artículo para ver el detalle completo.
5. **Guardar favorito**: En el detalle, tocar el ícono de corazón ❤️ para guardar.
6. **Ver favoritos**: Tocar la pestaña "Favoritos" en la barra inferior.
7. **Compartir**: En el detalle, tocar el botón "Compartir" para enviar el artículo.
8. **Leer completo**: Tocar "Leer artículo completo" para abrir en el navegador.
9. **Modo oscuro**: La app respeta la configuración del sistema.

---

## Herramientas de calidad

| Herramienta | Uso |
|---|---|
| **Jest** | Tests unitarios para servicios (`newsApi`, `storage`) |
| **TypeScript** | Tipado estático en todo el proyecto |
| **ESLint** | Análisis estático del código |

Para generar el reporte de `npm audit` (Dependency Check):

```bash
npm audit --json > reports/dependency-check.json
```

---

## API utilizada

- **NewsAPI** — [https://newsapi.org](https://newsapi.org)
- Endpoints: `/v2/top-headlines`, `/v2/everything`
- Plan gratuito: 100 requests/día, solo desarrollo local

---

## Tecnologías

- React Native 0.74 + Expo 51
- React Navigation v6 (Stack + Bottom Tabs)
- React Native Paper (Material Design 3)
- AsyncStorage
- TypeScript 5
- Jest + Testing Library
- Fastlane
