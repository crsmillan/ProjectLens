# ProjectLens: Premium Agile Management 🚀
### Challenge Técnico - Edición Full Stack

ProjectLens es una plataforma de gestión de proyectos al estilo Jira, diseñada con una estética premium (**Stitch Design**) y una arquitectura moderna basada en **NestJS** y **Next.js**.

---

## 🏛️ El Relato Técnico: La Transición a MongoDB

Uno de los pilares de este proyecto fue la implementación de **MongoDB** como motor de persistencia. Esta decisión se tomó para aprovechar la flexibilidad de los esquemas de documentos en un entorno ágil donde los requerimientos de las tareas (*Issues*) pueden evolucionar rápidamente.

### Pruebas de Validación y Migración:
Para asegurar la integridad del sistema, realizamos una serie de pruebas críticas:
1.  **Schema Enforcement**: Validamos que Mongoose aplicara correctamente las reglas de negocio (ej. tareas obligatorias asociadas a un proyecto).
2.  **Integridad de Métricas (Local E2E)**: Ejecutamos pruebas de integración locales (`app-db.e2e-spec.ts`) para verificar que el cálculo de progreso fuera preciso. *Nota: Estos tests se omiten deliberadamente en el pipeline de CI/CD para optimizar la velocidad del despliegue, delegando la validación de base de datos a entornos locales o de staging.*
3.  **Day Zero Seeding**: Implementamos un servicio de seeding automatizado que garantiza datos frescos para la demo desde el primer arranque.

---

## 🚀 Guía de Inicio Rápido (Docker First)

La forma más sencilla de probar ProjectLens es utilizando Docker, lo que garantiza que todos los servicios se levanten con la configuración correcta.

### Levantamiento con Docker Compose:
Desde la raíz del proyecto, ejecuta:
```bash
docker-compose up --build
```
> [!NOTE]
> Se ha incluido un servicio efímero llamado `seed` en el `docker-compose.yml`. Este contenedor se encargará de limpiar y poblar la base de datos automáticamente al arrancar y luego se detendrá.

### Acceso a los Servicios:
*   **Frontend (Next.js)**: [http://localhost:3000](http://localhost:3000)
*   **Backend API (NestJS)**: [http://localhost:4000](http://localhost:4000)
*   **Swagger Docs**: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)
*   **MongoDB**: `localhost:27017`

---

## 🛠️ Stack Tecnológico y Decisiones

*   **Backend**: NestJS siguiendo el patrón **Controller-Service-Repository**. Se utilizó `@nestjs/config` para una gestión de variables de entorno limpia y orientada a contenedores.
*   **Frontend**: Next.js 14 con **App Router**. Usamos un enfoque híbrido de SSR para la estructura y CSR (Client-Side Rendering) con **Zustand** para la interactividad fluida del tablero de tareas.
*   **CI/CD**: Contamos con un pipeline en **GitHub Actions** (`.github/workflows/ci-cd.yml`) que automatiza el Linting, los Tests y el Build en cada push.

---

### 🧪 Ejecución de Tests
*   **Tests Unitarios**: Integrados en el pipeline CI/CD de GitHub Actions.
*   **Tests E2E (Base de Datos)**: Se cuenta con un set de pruebas de integración para validar la conectividad y métricas en MongoDB (validados localmente). Se omiten del CI/CD principal por criterios de velocidad de despliegue.

Si deseas ejecutar los tests fuera de Docker:

1.  **Backend**:
    ```bash
    cd backend
    npm install
    npm run test
    ```
2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run build
    ```

---

## 🌐 Estrategia de Despliegue y Ciclo de Vida

Para llevar **ProjectLens** a un entorno de producción real, planteamos la siguiente arquitectura de despliegue:

### 1. Despliegue de Aplicaciones Web
*   **Contenerización Uniforme**: Utilizaríamos exactamente el **mismo contenedor Docker** desarrollado localmente tanto en **Railway** como en **Vercel** (vía soporte de Docker). Esto garantiza el principio de "funciona en mi máquina, funciona en la nube".
*   **Escalabilidad**: El backend se escala horizontalmente según la demanda, mientras que el frontend aprovecha el Edge Runtime de Vercel/Railway.

### 2. Despliegue Móvil (Implementacion con React Native)
*   **Integración**: La plataforma permite la integración nativa con **React Native** para extender la gestión de tareas a dispositivos iOS y Android.
*   **Builds & Stores**: El pipeline automatizado generaría los binarios (**APK** para Android y **Builds** para iOS) y los envía directamente a sus respectivas tiendas (Google Play y App Store) tras pasar las validaciones de UI automáticas.

### 3. Manejo de Ambientes y Seguridad
Implementamos una separación estricta mediante variables de entorno:
*   **Desarrollo y Staging**: Configurados mediante archivos **.env** locales y de nube manejados por el equipo de desarrollo.
*   **Producción**: Este ambiente está **totalmente aislado del alcance del desarrollador**. Las llaves y secretos de producción son inyectados únicamente por el servidor de CI/CD o el administrador de infraestructura, garantizando la seguridad de la data real.

### 4. Rollback y Aseguramiento de Calidad (QA)
*   **Ambiente de QA Obligatorio**: Antes de llegar a Producción, cualquier cambio debe ser aprobado en un ambiente de **QA (Quality Assurance)**. Ningún despliegue a Prod se libera sin el "visto bueno" de QA para evitar errores críticos.
*   **Estrategia de Rollback**: En caso de un incidente imprevisto, utilizamos las herramientas nativas de **Vercel o Railway** para realizar un "Instant Rollback" a la versión estable anterior en segundos, minimizando el impacto al usuario final.

---
*Desarrollado como parte del proceso técnico para Ubicalo.*
