// services/auth_service/internal/application/auth_service.go
package application

import (
	"bachue/auth_service/internal/core/domain"
	"bachue/auth_service/internal/core/ports"
	"bachue/auth_service/internal/adapters/security"
	"errors"
)

// authService es la implementación de la interfaz ports.AuthService.
type authService struct {
	userRepo ports.UserStorage
	hasher   security.PasswordHasher
	jwtMan   security.JWTManager
}

// NewAuthService crea una nueva instancia del servicio de autenticación.
func NewAuthService(
	repo ports.UserStorage,
	hasher security.PasswordHasher,
	jwtMan security.JWTManager,
) ports.AuthService {
	return &authService{userRepo: repo, hasher: hasher, jwtMan: jwtMan}
}

// Register registra un nuevo usuario.
func (s *authService) Register(email, password string) (*domain.User, error) {
	// 1. Validar que el email y la contraseña no estén vacíos.
	if email == "" || password == "" {
		return nil, errors.New("email and password cannot be empty")
	}

	// 2. Verificar si el usuario ya existe
	existingUser, err := s.userRepo.GetUserByEmail(email)
	if err == nil && existingUser != nil {
		return nil, errors.New("user with this email already exists")
	}
	// Si el error no es "user not found", es un error de BD.
	if err != nil && err.Error() != "user not found" {
		return nil, errors.New("database error during user check") // Mensaje más genérico
	}

	// 3. Hashear la contraseña
	hashedPassword, err := s.hasher.HashPassword(password)
	if err != nil {
		return nil, errors.New("failed to hash password")
	}

	// 4. Crear nuevo usuario en el dominio
	newUser := &domain.User{
		Email:        email,
		PasswordHash: hashedPassword,
	}

	// 5. Guardar usuario en la BD a través del repositorio
	if err := s.userRepo.CreateUser(newUser); err != nil {
		return nil, errors.New("failed to create user in database")
	}
	return newUser, nil
}

// Login autentica a un usuario y genera un JWT.
func (s *authService) Login(email, password string) (string, error) {
	// 1. Obtener usuario por email
	user, err := s.userRepo.GetUserByEmail(email)
	if err != nil {
		if err.Error() == "user not found" {
			return "", errors.New("invalid credentials")
		}
		return "", errors.New("database error during login")
	}

	// 2. Comparar contraseña hasheada
	if !s.hasher.CheckPasswordHash(password, user.PasswordHash) {
		return "", errors.New("invalid credentials")
	}

	// 3. Generar JWT
	token, err := s.jwtMan.GenerateToken(user.ID, user.Email)
	if err != nil {
		return "", errors.New("failed to generate authentication token")
	}
	return token, nil
}

// ValidateToken valida un JWT y retorna los claims del usuario.
func (s *authService) ValidateToken(tokenString string) (*domain.UserClaims, error) {
	claims, err := s.jwtMan.ValidateToken(tokenString)
	if err != nil {
		return nil, err
	}
	return claims, nil
}
