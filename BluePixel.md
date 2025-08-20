## 🧪 Prueba Técnica React Native

📋 Enunciado:
Crea una pequeña aplicación en **React Native** que permita al usuario:

1. Ver una lista de tareas (To-Do list).
2. Agregar una nueva tarea.
3. Marcar una tarea como completada o no completada.
4. Eliminar una tarea.
5. (Bonus) Guardar las tareas en almacenamiento local para que persistan si se cierra la app.

### 📌 Requisitos funcionales:

- La pantalla principal debe mostrar una lista de tareas.
- Cada tarea debe tener:
    - Un título
    - Un checkbox (o switch) para marcarla como completada
    - Un botón para eliminarla
- Un campo de texto y un botón para agregar nuevas tareas
- (Opcional) Un filtro para ver: Todas, Completadas, o Pendientes

### 🎯 Objetivos de evaluación:

- Dominio de **componentes funcionales y hooks** ( useState , useEffect )
- Buenas prácticas de **estructura del código y organización de componentes**
- Uso adecuado de **estilos** (puede ser StyleSheet o Material UI)
- (Bonus) Uso de **AsyncStorage** para persistencia local
- (Bonus) Manejo básico de estados derivados (filtros, tareas completadas)

### 🧰 Requisitos técnicos:

- React Native (puede ser con Expo o CLI, a elección)
- No se requiere backend ni librerías externas (salvo para persistencia si se quiere usar @react-native-async-storage/async-storage )
