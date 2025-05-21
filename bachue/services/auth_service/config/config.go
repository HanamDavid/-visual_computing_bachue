// services/auth_service/config/config.go
package config

import (
	"log"
	"os"
	"github.com/joho/godotenv"
)

// Config representa la configuración del servicio de autenticación.
type Config struct {
	ServicePort string
	JWTSecret   string
	// Aquí se pueden añadir configuraciones de base de datos, etc.
}

// LoadConfig carga la configuración desde las variables de entorno.
func LoadConfig() *Config {
	// Carga el archivo .env si existe (útil para desarrollo local)
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, relying on environment variables.")
	}

	servicePort := os.Getenv("AUTH_SERVICE_PORT")
	if servicePort == "" {
		servicePort = "8081" // Puerto por defecto si no se especifica
	}

	jwtSecret := os.Getenv("JWT_SECRET_KEY")
	if jwtSecret == "" {
		log.Fatal("JWT_SECRET_KEY environment variable is not set. This is critical for security.")
	}

	return &Config{
		ServicePort: servicePort,
		JWTSecret:   jwtSecret,
	}
}
