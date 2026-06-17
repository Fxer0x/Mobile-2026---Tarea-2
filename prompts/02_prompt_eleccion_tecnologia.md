# Prompt 2 — Elección de tecnología: Expo vs Kotlin

## Conversación

**Fecha:** 16/06/2026  
**Objetivo:** Definir el stack tecnológico antes de comenzar el desarrollo.

---

## Contexto

Este intercambio ocurrió **dentro del mismo prompt inicial**, antes de que Claude generara cualquier archivo. Al analizar el PDF, Claude identificó que el enunciado no especificaba un framework obligatorio, por lo que consultó al estudiante antes de proceder.

---

## Pregunta de Claude

> ¿Querés usar **Expo** (React Native) o **Kotlin nativo** para Android?

---

## Respuesta del estudiante

> **Expo**

---

## Decisiones derivadas de esta elección

| Decisión               | Detalle                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Framework**          | React Native 0.74 + Expo SDK 51                                       |
| **Lenguaje**           | JavaScript (JSX)                                                      |
| **Gestor de paquetes** | npm con `--legacy-peer-deps`                                          |
| **UI Library**         | React Native Paper (Material Design 3) en lugar de Jetpack Compose    |
| **Navegación**         | React Navigation v6 en lugar de Jetpack Navigation Component          |
| **Persistencia**       | AsyncStorage en lugar de Room/SQLite                                  |
| **Background Service** | `expo-background-fetch` + `expo-task-manager` en lugar de WorkManager |
| **BroadcastReceiver**  | `expo-network` hook en lugar de `ConnectivityManager`                 |
| **Intents**            | `Share.share()` + `Linking.openURL()` en lugar de `Intent` de Android |
| **Tests**              | Jest + jest-expo en lugar de JUnit/Espresso                           |

---

## Justificación técnica registrada

Expo permite:

- Desarrollo multiplataforma (iOS + Android) desde un único codebase.
- Iteración más rápida con Expo Go sin necesidad de compilar APK para pruebas.
- SDK oficial para todos los componentes Android requeridos por el enunciado.
- Compatibilidad directa con Fastlane para el pipeline CI/CD.

---

## Segunda pregunta de Claude

> ¿Tenés algo comenzado o arrancamos de cero?

---

## Respuesta del estudiante

> **De cero**, no tengo nada hecho.

---

## Impacto en la generación

Al confirmar que no había código previo, Claude generó **todos los archivos del proyecto desde cero** en el prompt siguiente, sin necesidad de adaptar ni migrar código existente.
