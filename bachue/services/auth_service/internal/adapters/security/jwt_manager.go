// services/auth_service/internal/adapters/security/jwt_manager.go
package security

import (
	"bachue/auth_service/internal/core/domain"
	"errors"
	"time"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
)

// JWTManager define la interfaz para la gestión de JWT.
type JWTManager interface {
	GenerateToken(userID, email string) (string, error)
	ValidateToken(tokenString string) (*domain.UserClaims, error)
}

// jwtManager implementa JWTManager.
type jwtManager struct {
	secretKey []byte
}

// NewJWTManager crea una nueva instancia de JWTManager.
func NewJWTManager(secret string) JWTManager {
	return &jwtManager{secretKey: []byte(secret)}
}

// GenerateToken genera un nuevo JWT para el usuario dado.
func (j *jwtManager) GenerateToken(userID, email string) (string, error) {
	claims := domain.UserClaims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)), // Token válido por 24 horas
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString(j.secretKey)
	if err != nil {
		return "", fmt.Errorf("failed to sign token: %w", err)
	}
	return signedToken, nil
}

// ValidateToken valida un JWT y retorna los claims si es válido.
func (j *jwtManager) ValidateToken(tokenString string) (*domain.UserClaims, error) {
	claims := &domain.UserClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return j.secretKey, nil
	})

	if err != nil {
		return nil, fmt.Errorf("token validation failed: %w", err)
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
