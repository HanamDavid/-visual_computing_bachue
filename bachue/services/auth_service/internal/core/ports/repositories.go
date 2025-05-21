// services/auth_service/internal/core/ports/repositories.go
package ports

import "bachue/auth_service/internal/core/domain"

// UserStorage representa el puerto para el almacenamiento de usuarios.
// Es una interfaz que cualquier implementación de repositorio de usuario debe satisfacer.
type UserStorage interface {
	GetUserByEmail(email string) (*domain.User, error)
	DeleteUser(email string) (bool, error)
	CreateUser(user *domain.User) error
	GetUserByID(id string) (*domain.User, error)
}
