# Examen Técnico Práctico

Duración Estimada: 4 a 6 horas (realizado en tu propio entorno con ayuda de IA, Google, etc)   
Formato de Entrega: Repositorio Git o archivo comprimido con el proyecto  
Puedes usar cualquier herramienta que consideres adecuada siempre que cumplas con los requisitos indicados.

# Parte A – Backend (Node.js \+ Arquitectura)

**Objetivo**: Diseñar e implementar un pequeño servicio backend en Node.js que permita gestionar proyectos y tareas.  
Funcionalidades requeridas

El sistema debe permitir:

* Crear proyectos.  
* Registrar tareas asociadas a un proyecto.  
* Marcar tareas como completadas.  
* Obtener métricas agregadas del proyecto, incluyendo:  
  * Porcentaje de avance del proyecto.  
  * Tiempo promedio de finalización de tareas.

*Base de datos*  
    Puedes utilizar cualquiera de las siguientes opciones:  
      MariaDB y/o MongoDB  
      Se espera que justifiques brevemente tu elección en el README.

*Requisitos técnicos obligatorios*  
      El backend debe incluir:

* Node.js (puedes usar Express o sin framework)  
* Separación clara por capas:  Controller, Service, Repository  
* Manejo adecuado de errores  
* Validación de datos de entrada  
* Logging estructurado  
* Dockerfile funcional  
* Tests básicos (unitarios o de integración)

*Qué evaluaremos:*

* Modelado de datos  
* Calidad y claridad del código  
* Patrones de diseño utilizados  
* Manejo de async/await  
* Organización del proyecto  
* Manejo de casos límite (edge cases)  
* Justificación de decisiones técnicas

#  Parte B – Frontend (React / NextJS) 

**Objetivo**: Construir una interfaz sencilla que consuma el backend desarrollado.  
Funcionalidades  
*La aplicación debe permitir:*

* Listar proyectos  
* Ver las tareas asociadas a un proyecto  
* Crear nuevas tareas  
* Mostrar el progreso del proyecto con una barra visual  
* Manejar estados de carga y error

*Requisitos técnicos:*

* Uso adecuado de React Hooks  
* Separación clara de componentes  
* Manejo de estado (Context API, Zustand u otro)  
* Buen manejo de re-renderizados  
* Si utilizas NextJS, explica en el README si usas SSR o CSR y por qué.

*Qué evaluaremos:*

* Organización del código  
* Performance básica  
* Claridad y limpieza del código  
* Experiencia de usuario (UX) básica

# Parte C – DevOps y Ciclo de Vida 

El proyecto debe incluir un archivo README con la siguiente información:

* Documentación requerida  
* Cómo levantar el proyecto localmente  
* Cómo ejecutar los tests  
* Cómo construir y ejecutar el proyecto con Docker  
* Decisiones técnicas relevantes  
* Pipeline CI/CD

Incluye un ejemplo de pipeline CI/CD básico (puede ser pseudo YAML) que contemple:

* Instalación de dependencias  
* Ejecución de tests  
* Construcción de la aplicación  
* Despliegue, puedes usar como referencias herramientas como Github Actions, GitLabCI u otra que prefieras.

***Estrategia de despliegue:***

*Describe brevemente cómo plantearías:*

* Despliegue de la aplicación web  
* Despliegue hacia tiendas móviles (iOS y Android)  
* Manejo de ambientes (desarrollo, staging, producción)  
* Estrategia de rollback

#  ***Entrega*** 

*Puedes entregar el ejercicio mediante:*

* Un repositorio Git (GitHub, GitLab, etc.)  
* Un archivo comprimido con el proyecto  
* Incluye en la entrega:Código fuente completo,README con instrucciones,Dockerfile funcional

