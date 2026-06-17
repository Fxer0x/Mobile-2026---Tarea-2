# Prompt 1 — Lectura del PDF y generación del proyecto

## Conversación

**Fecha:** 16/06/2026  
**Objetivo:** Analizar el enunciado de la tarea entregado como PDF y generar el proyecto completo desde cero.

---

## Prompt utilizado

> _[Se adjuntaron dos archivos: el PDF con el enunciado de la Tarea 2 y el mockup en Excalidraw con los flujos de navegación y pantallas en modo claro y oscuro]_

---

## Contexto del proyecto al momento del prompt

- No existía ningún código fuente ni carpeta del proyecto.
- Se contaba con un **mockup en Excalidraw** ya preparado, que incluía las 4 pantallas de la app (Home, Lista de artículos, Detalle, Favoritos) en modo claro y oscuro, con el flujo de navegación dibujado.
- El PDF contenía el enunciado completo de la **Tarea 2** de la materia _Desarrollo de Aplicaciones Móviles 2026_, del docente **Andrés Pastorini**.
- El enunciado especificaba que el estudiante debía elegir uno de varios **escenarios** de aplicación móvil, cada uno con requisitos mínimos para aprobar.
- Los requisitos transversales a todos los escenarios incluían:
  - Implementar los cuatro **componentes Android** (Activity, Service, BroadcastReceiver, ContentProvider, Intent) usando sus equivalentes en React Native / Expo.
  - **Navegación** con al menos 3 rutas y paso de parámetros entre pantallas.
  - **Persistencia** local de datos.
  - **Tests unitarios** con Jest + Testing Library.
  - **Fastlane** para automatización del pipeline CI/CD.
  - Informe de vulnerabilidades de dependencias (`npm audit`).

---

## Pregunta de Claude antes de generar

Antes de comenzar a escribir código, Claude realizó dos preguntas clave:

1. **¿Querés usar Expo o Kotlin nativo?**  
   → Respuesta del estudiante: **Expo** (React Native + Expo SDK 51).

2. **¿Ya tenés algo comenzado o arrancamos de cero?**  
   → Respuesta del estudiante: **De cero**, sin ningún archivo previo.

---

## Escenario elegido

**Escenario #4 — Noticias por Categoría (NewsAPI)**

Aplicación móvil que consume la API pública [NewsAPI](https://newsapi.org) para mostrar noticias organizadas por categoría, con búsqueda por tópicos, favoritos y modo oscuro.

---

## Archivos analizados del PDF para tomar decisiones de diseño

| Sección del PDF                      | Decisión tomada                                                                           |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| Lista de escenarios y sus requisitos | Selección del Escenario #4 (NewsAPI)                                                      |
| Componentes Android obligatorios     | Mapeo a equivalentes Expo (backgroundTask, useNetworkStatus, AsyncStorage, Share/Linking) |
| Requisito de navegación (3+ rutas)   | Stack Navigator + Bottom Tab Navigator con React Navigation v6                            |
| Requisito de persistencia            | AsyncStorage con clave `@news_favorites`                                                  |
| Requisito de tests                   | Jest + jest-expo + Testing Library para `newsApi.js` y `storage.js`                       |
| Requisito de Fastlane                | Fastfile con lanes `test`, `build_debug`, `build_release`, `ci`                           |
| Requisito de informe de dependencias | `npm audit --json > reports/dependency-check.json`                                        |

---

## Archivos generados en este prompt

| Archivo                               | Descripción                                                                                                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `package.json`                        | Dependencias: Expo 51, React Native 0.74, React Navigation v6, React Native Paper, AsyncStorage, expo-background-fetch, expo-task-manager, expo-network, Jest |
| `app.json`                            | Configuración Expo: nombre, slug, permisos Android, plugin expo-background-fetch                                                                              |
| `babel.config.js`                     | Preset `babel-preset-expo`                                                                                                                                    |
| `.npmrc`                              | `legacy-peer-deps=true` para resolver conflictos de dependencias                                                                                              |
| `.gitignore`                          | Node modules, .env, build artifacts                                                                                                                           |
| `.env`                                | Variable `EXPO_PUBLIC_NEWS_API_KEY` (plantilla)                                                                                                               |
| `App.js`                              | Entrada principal: Tab Navigator + Stack Navigator, tema claro/oscuro con MD3 + React Navigation                                                              |
| `src/constants/categories.js`         | Array de categorías con `key`, `label` e `icon`                                                                                                               |
| `src/services/newsApi.js`             | `fetchTopHeadlines` y `searchArticles` consumiendo `/v2/everything` de NewsAPI                                                                                |
| `src/services/storage.js`             | `getFavorites`, `addFavorite`, `removeFavorite`, `isFavorite` con AsyncStorage                                                                                |
| `src/services/backgroundTask.js`      | Background Service con `expo-background-fetch` + `expo-task-manager`                                                                                          |
| `src/hooks/useNetworkStatus.js`       | Hook BroadcastReceiver-equivalent con `expo-network`                                                                                                          |
| `src/components/ArticleCard.jsx`      | Tarjeta de artículo con imagen, título, fuente y fecha                                                                                                        |
| `src/components/CategoryCard.jsx`     | Tarjeta de categoría con ícono y color                                                                                                                        |
| `src/screens/HomeScreen.jsx`          | Pantalla principal: Searchbar + grid de categorías + banner sin conexión                                                                                      |
| `src/screens/ArticleListScreen.jsx`   | Lista de noticias por categoría o búsqueda, con ActivityIndicator y manejo de errores                                                                         |
| `src/screens/ArticleDetailScreen.jsx` | Detalle del artículo: favorito (corazón), Share, Linking para abrir en browser                                                                                |
| `src/screens/FavoritesScreen.jsx`     | Lista de artículos guardados con opción de eliminar                                                                                                           |
| `__tests__/newsApi.test.js`           | Tests unitarios del servicio de API (fetch mock)                                                                                                              |
| `__tests__/storage.test.js`           | Tests unitarios del servicio de AsyncStorage (mock)                                                                                                           |
| `fastlane/Fastfile`                   | Lanes: `test`, `build_debug`, `build_release`, `ci`                                                                                                           |
| `fastlane/Appfile`                    | Bundle identifier y package name                                                                                                                              |
| `fastlane/Gemfile`                    | Dependencia de fastlane gem                                                                                                                                   |
| `reports/dependency-check.json`       | Resultado de `npm audit --json`                                                                                                                               |
| `README.md`                           | Documentación completa del proyecto                                                                                                                           |

---

## Resultado

El proyecto quedó **funcional desde el primer intento**, con:

- Navegación completa (Tab + Stack con paso de parámetros).
- Los 5 componentes Android mapeados a equivalentes Expo.
- Persistencia de favoritos con AsyncStorage.
- Tests unitarios pasando con Jest.
- Pipeline de Fastlane configurado.
- Modo oscuro automático con React Native Paper MD3 + React Navigation.
- Banner de "Sin conexión" usando `expo-network`.
