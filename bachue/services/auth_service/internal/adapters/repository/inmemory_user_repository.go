// services/auth_service/internal/adapters/repository/inmemory_user_repository.go
package repository

import (
	"bachue/auth_service/internal/core/domain"
	"errors"
	"sync"
	"time"
	"github.com/google/uuid" // Usaremos esto para generar IDs únicos
)

// InMemoryUserRepo es una implementación en memoria de UserStorage para propósitos de desarrollo/pruebas.
type InMemoryUserRepo struct {
	users map[string]*domain.User // Mapea email a usuario
	mu    sync.RWMutex            // Para concurrencia segura
}

// NewInMemoryUserRepo crea una nueva instancia de InMemoryUserRepo.
func NewInMemoryUserRepo() *InMemoryUserRepo {
	return &InMemoryUserRepo{
		users: make(map[string]*domain.User),
	}
}

// GetUserByEmail implementa la interfaz UserStorage para obtener un usuario por email.
func (r *InMemoryUserRepo) GetUserByEmail(email string) (*domain.User, error) {
	r.mu.RLock() // Bloqueo de lectura
	defer r.mu.RUnlock()

	user, ok := r.users[email]
	if !ok {
		return nil, errors.New("user not found")
	}
	return user, nil
}

// CreateUser implementa la interfaz UserStorage para crear un nuevo usuario.
func (r *InMemoryUserRepo) CreateUser(user *domain.User) error {
	r.mu.Lock() // Bloqueo de escritura
	defer r.mu.Unlock()

	if _, ok := r.users[user.Email]; ok {
		return errors.New("user with this email already exists")
	}

	user.ID = uuid.New().String() // Generar un ID único
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	r.users[user.Email] = user
	return nil
}
