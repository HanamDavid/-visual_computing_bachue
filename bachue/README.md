# 🌿 Bachue: Sistema Inteligente para la Detección de Enfermedades en Cultivos 🌾

## 📄 Descripción General del Proyecto

Bienvenido al repositorio de Bachue, un sistema innovador diseñado para la detección temprana y precisa de enfermedades en cultivos utilizando inteligencia artificial y visión por computadora. Nuestro objetivo es empoderar a agricultores y entusiastas con una herramienta accesible y fácil de usar, permitiéndoles monitorear la salud de sus plantas mediante el análisis de imágenes tomadas con dispositivos móviles.

El sistema se enfoca en ofrecer una alta precisión, aprovechando un robusto pipeline de preprocesamiento de imágenes y la extracción de características esenciales. La infraestructura se aloja en la nube para garantizar una alta disponibilidad y un procesamiento rápido, con planes futuros para soluciones offline en diferentes tipos de hardware.

## ✨ Características Principales

* **Detección de Enfermedades por Imagen:** Utiliza modelos avanzados de Visión por Computadora (YOLO) para identificar enfermedades y el estado general de las plantas a partir de imágenes de hojas.
* **Preprocesamiento Inteligente de Imágenes:** Implementa técnicas de limpieza y mejora de imágenes para optimizar la precisión del modelo.
* **Análisis y Dashboard de Cultivos:** Proporciona un resumen visual del estado de salud del cultivo, con datos almacenados temporalmente para un monitoreo semanal.
* **Recomendaciones Inteligentes:** Ofrece sugerencias generales personalizadas para el cuidado de los cultivos, generadas por un Modelo de Lenguaje Grande (LLM).
* **Arquitectura de Microservicios:** Diseño modular para escalabilidad, mantenibilidad y flexibilidad tecnológica, con servicios especializados para autenticación, gestión de usuarios, modelo de IA y análisis de datos.
* **Acceso en la Nube:** Permite a los usuarios acceder al poder computacional de nuestros modelos sin depender del hardware local.

## 🚀 Arquitectura del Sistema

Bachue se construye sobre una arquitectura de microservicios robusta y desacoplada, orquestada dentro de un monorepo para facilitar la gestión del código. Cada servicio se rige por principios de Arquitectura Hexagonal para una clara separación de preocupaciones.

### Componentes Principales:

* **Frontend (React):** La interfaz de usuario intuitiva y rica, diseñada para una excelente experiencia de usuario en dispositivos móviles y web.
* **API Gateway (Go / Nginx / Kong):** Punto de entrada unificado para todas las solicitudes del frontend, responsable de la autenticación/autorización centralizada, el enrutamiento a los microservicios, y la seguridad.
* **Auth Service (Go):** Gestiona la autenticación y autorización de usuarios, asegurando un acceso seguro al sistema.
* **User Data Service (Go):** Encargado de almacenar y gestionar toda la información relacionada con el perfil del usuario, configuraciones y el historial de sus cultivos y análisis.
* **ML Service (FastAPI):** Aloja el modelo de IA (YOLO) para la detección de enfermedades, realiza el preprocesamiento de imágenes y ejecuta la inferencia.
* **Data Analysis Service (FastAPI):** Procesa los datos de los cultivos, genera el dashboard de salud y se comunica con el LLM para ofrecer recomendaciones personalizadas.

```mermaid
graph LR
    %% Bloque izquierdo
    Frontend --> Gateway
    Gateway --> Auth[Auth]
    Gateway --> UserData[User Data]
    Gateway --> DataAnalysis[Data Analysis]
    Gateway --> ModelService[Model Service]

    %% Bloque derecho
    ModelService -- "json\nGenera Datos" --> UserData
    UserData -- "json\nGuarda los datos" --> DataAnalysis
    DataAnalysis -- "json\nProcesa datos" --> UserData



