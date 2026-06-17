# Prompt 3 — Error de versiones de dependencias

## Conversación

**Fecha:** 16/06/2026  
**Objetivo:** Resolver conflictos de versiones entre Expo, React Native y las librerías de navegación al intentar instalar las dependencias por primera vez.

---

## Prompt utilizado

> Al correr `npm install` me tira errores de versiones, no puedo instalar las dependencias

---

## Error encontrado

Al ejecutar `npm install` tras la generación inicial del proyecto, npm rechazó la instalación por conflictos de peer dependencies entre los paquetes:

```
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: newsapp@1.0.0
npm error Found: react@18.2.0
npm error node_modules/react
npm error   react@"18.2.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer react@"^17.0.0" from @testing-library/react-native@12.4.3
```

El conflicto principal era entre:

| Paquete                    | Versión instalada | Peer esperado                            |
| -------------------------- | ----------------- | ---------------------------------------- |
| `react`                    | 18.2.0            | `^17.0.0` (esperado por Testing Library) |
| `@react-navigation/native` | 6.1.17            | conflicto con `react-native-screens`     |
| `react-native-paper`       | 5.12.3            | conflicto menor con `react-native` 0.74  |

---

## Solución aplicada

**Paso 1** — Agregar `.npmrc` en la raíz del proyecto con la flag `legacy-peer-deps`:

```
legacy-peer-deps=true
```

Esto le indica a npm que resuelva las dependencias usando el algoritmo de npm v6, que es más permisivo con conflictos de peer dependencies.

**Paso 2** — Volver a correr la instalación:

```bash
npm install --legacy-peer-deps
```

---

## Archivos modificados

| Archivo          | Cambio                                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| `.npmrc` (nuevo) | Agregado con `legacy-peer-deps=true` para que todos los `npm install` futuros usen esta configuración automáticamente |

---

## Resultado

Las dependencias se instalaron correctamente. El proyecto quedó listo para correr con `npx expo start`.
