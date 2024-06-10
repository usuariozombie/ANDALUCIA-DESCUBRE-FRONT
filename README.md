# Andalucía Descubre Frontend - EDUARDO PIMENTEL 2º DAM

Este proyecto es la implementación del frontend de la aplicación Andalucía Descubre, una plataforma diseñada para promover los lugares más emblemáticos de Andalucía. El proyecto está construido con Angular y cuenta con varias funcionalidades y componentes que permiten a los usuarios explorar y gestionar información sobre localidades, eventos, platos y monumentos.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes Principales](#componentes-principales)
  - [Componentes Reutilizables](#componentes-reutilizables)
  - [Componentes de Funcionalidad](#componentes-de-funcionalidad)
  - [Otros Componentes](#otros-componentes)
- [Servicios](#servicios)
- [Páginas](#páginas)
- [Modelos](#modelos)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Instalación

Para instalar y ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuariozombie/ANDALUCIA-DESCUBRE-FRONT.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd ANDALUCIA-DESCUBRE-FRONT
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura la URL de la API en el archivo de configuración.
5. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```
6. Abre tu navegador y navega a `http://localhost:4200`.

## Estructura del Proyecto

El proyecto está organizado en los siguientes directorios y archivos principales:

- `src/app`: Contiene todos los componentes, servicios, modelos y rutas del proyecto.
  - `components`: Directorio que contiene los componentes reutilizables de la aplicación.
  - `services`: Directorio que contiene los servicios que manejan la lógica de negocio y las comunicaciones HTTP.
  - `models`: Directorio que contiene los modelos de datos utilizados en la aplicación.
  - `pages`: Directorio que contiene las páginas principales de la aplicación.
  - `app-routing.module.ts`: Archivo que define las rutas de la aplicación.
  - `app.module.ts`: Archivo principal del módulo de la aplicación.

## Componentes Principales

### Componentes Reutilizables

- **HeaderComponent**: Componente que representa la cabecera de la aplicación, incluye el menú de navegación principal.
- **FooterComponent**: Componente que representa el pie de página de la aplicación.
- **SidebarComponent**: Componente que representa la barra lateral utilizada en el panel de administrador.
- **CardComponent**: Componente que se utiliza para mostrar información en formato de tarjeta.

### Componentes de Funcionalidad

- **EventFormComponent**: Componente para la creación y edición de eventos.
- **DishFormComponent**: Componente para la creación y edición de platos típicos.
- **MonumentFormComponent**: Componente para la creación y edición de monumentos.
- **MapEditorComponent**: Componente para la edición del mapa de la localidad.

### Otros Componentes

- **AboutUsComponent**: Componente que proporciona información sobre la aplicación.
- **AdminComponent**: Componente que gestiona el panel de administración.
- **CarouselComponent**: Componente para mostrar un carrusel de imágenes o información destacada.
- **ConfirmationDialogComponent**: Componente para mostrar cuadros de diálogo de confirmación.
- **DiscoverComponent**: Componente para la página de descubrimiento de localidades.
- **FeaturesComponent**: Componente que resalta las características principales de la aplicación.
- **HomeComponent**: Componente para la página de inicio.
- **LoginPageComponent**: Componente para la página de inicio de sesión.
- **LogsComponent**: Componente para la gestión de logs en el panel de administración.
- **NavbarComponent**: Componente que representa la barra de navegación principal.
- **RegisterPageComponent**: Componente para la página de registro de usuarios.
- **TownComponent**: Componente para la visualización y gestión de información de las localidades.
- **VideoHeaderComponent**: Componente para mostrar un video en la cabecera de la página.
- **WebFooterComponent**: Componente para el pie de página en la versión web.

## Servicios

Los servicios en Angular proporcionan una forma de compartir datos y funcionalidades entre diferentes componentes. Los servicios de este proyecto incluyen:

- **DishService**: Servicio que maneja la lógica de negocio y las comunicaciones HTTP relacionadas con los platos típicos.
  - `dish.service.ts`: Implementación del servicio de platos.
  - `dish.service.spec.ts`: Pruebas unitarias para el servicio de platos.

- **EventService**: Servicio que maneja la lógica de negocio y las comunicaciones HTTP relacionadas con los eventos.
  - `event.service.ts`: Implementación del servicio de eventos.
  - `event.service.spec.ts`: Pruebas unitarias para el servicio de eventos.

- **LogService**: Servicio que maneja la lógica de negocio y las comunicaciones HTTP relacionadas con los logs.
  - `log.service.ts`: Implementación del servicio de logs.
  - `log.service.spec.ts`: Pruebas unitarias para el servicio de logs.

- **MonumentService**: Servicio que maneja la lógica de negocio y las comunicaciones HTTP relacionadas con los monumentos.
  - `monument.service.ts`: Implementación del servicio de monumentos.
  - `monument.service.spec.ts`: Pruebas unitarias para el servicio de monumentos.

- **TownService**: Servicio que maneja la lógica de negocio y las comunicaciones HTTP relacionadas con las localidades.
  - `town.service.ts`: Implementación del servicio de localidades.
  - `town.service.spec.ts`: Pruebas unitarias para el servicio de localidades.

- **UserService**: Servicio que maneja la lógica de negocio y las comunicaciones HTTP relacionadas con los usuarios.
  - `user.service.ts`: Implementación del servicio de usuarios.
  - `user.service.spec.ts`: Pruebas unitarias para el servicio de usuarios.

## Páginas

- **HomePage**: Página de inicio de la aplicación que muestra una visión general de los contenidos destacados.
- **EventsPage**: Página que muestra la lista de eventos disponibles.
- **DishesPage**: Página que muestra la lista de platos típicos.
- **MonumentsPage**: Página que muestra la lista de monumentos.
- **AdminDashboardPage**: Página principal del panel de administrador, desde donde se puede gestionar toda la información de la localidad.

## Modelos

- **EventModel**: Modelo de datos para los eventos.
- **DishModel**: Modelo de datos para los platos típicos.
- **MonumentModel**: Modelo de datos para los monumentos.
- **MapModel**: Modelo de datos para los mapas de las localidades.
- **UserModel**: Modelo de datos para los usuarios.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request con tus mejoras y correcciones.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.


Para más información visita [Documentación de Andalucía Descubre](https://usuariozombie.github.io/ANDALUCIA-DESCUBRE-DOCS)
