// services/auth_service/cmd/main.go
package main

import (
	"fmt"
	"log"
	"net/http"
	"bachue/auth_service/config"
	authHttp "bachue/auth_service/internal/adapters/http" // Alias para evitar conflicto
	"bachue/auth_service/internal/adapters/repository"
	"bachue/auth_service/internal/adapters/security"
	"bachue/auth_service/internal/application"
)

func main() {
	// 1. Cargar configuración
	cfg := config.LoadConfig()

	// 2. Inicializar adaptadores de infraestructura
	userRepo := repository.NewInMemoryUserRepo() // ¡Cambiar por un repositorio de BD real en producción!
	hasher := security.NewBcryptPasswordHasher()
	jwtMan := security.NewJWTManager(cfg.JWTSecret)

	// 3. Inicializar la capa de aplicación (inyección de dependencias)
	authService := application.NewAuthService(userRepo, hasher, jwtMan)

	// 4. Inicializar el adaptador HTTP (controladores)
	authHandler := authHttp.NewAuthHandler(authService)

	// 5. Configurar el router HTTP
	mux := http.NewServeMux()
	mux.HandleFunc("POST /register", authHandler.Register)      // Para registrar nuevos usuarios
	mux.HandleFunc("POST /login", authHandler.Login)            // Para iniciar sesión y obtener JWT
	mux.HandleFunc("POST /validate-token", authHandler.ValidateToken) // Para que la API Gateway valide tokens

	// 6. Iniciar el servidor HTTP
	port := fmt.Sprintf(":%s", cfg.ServicePort)
	log.Printf("Auth Service starting on port %s", port)
	if err := http.ListenAndServe(port, mux); err != nil {
		log.Fatalf("Failed to start Auth Service: %v", err)
	}
}
