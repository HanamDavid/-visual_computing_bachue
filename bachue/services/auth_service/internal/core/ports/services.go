// services/auth_service/internal/core/ports/services.go
package ports

import "bachue/auth_service/internal/core/domain"

// AuthService representa el puerto para la lógica de autenticación y autorización.
// Es la interfaz principal que la capa de aplicación expone a los adaptadores externos (ej. HTTP).
type AuthService interface {
	Register(email, password string) (*domain.User, error)
	Login(email, password string) (string, error) //retorna JWT
	ValidateToken(token string) (*domain.UserClaims, error)
}
