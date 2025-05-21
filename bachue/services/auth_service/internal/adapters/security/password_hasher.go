// services/auth_service/internal/adapters/security/password_hasher.go
package security

import "golang.org/x/crypto/bcrypt"

// PasswordHasher define la interfaz para el hashing de contraseñas.
type PasswordHasher interface {
	HashPassword(password string) (string, error)
	CheckPasswordHash(password, hash string) bool
}

// bcryptHasher implementa PasswordHasher usando bcrypt.
type bcryptHasher struct{}

// NewBcryptPasswordHasher crea una nueva instancia de bcryptHasher.
func NewBcryptPasswordHasher() PasswordHasher {
	return &bcryptHasher{}
}

// HashPassword hashea una contraseña usando bcrypt.
func (b *bcryptHasher) HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPasswordHash compara una contraseña en texto plano con su hash.
func (b *bcryptHasher) CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
