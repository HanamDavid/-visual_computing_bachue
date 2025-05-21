// services/auth_service/internal/adapters/http/auth_handler.go
package http

import (
	"bachue/auth_service/internal/core/ports"
	"encoding/json"
	"net/http"
	"strings"
)

// AuthHandler maneja las peticiones HTTP para el servicio de autenticación.
type AuthHandler struct {
	authService ports.AuthService
}

// NewAuthHandler crea una nueva instancia de AuthHandler.
func NewAuthHandler(service ports.AuthService) *AuthHandler {
	return &AuthHandler{authService: service}
}

// RegisterRequest representa la estructura de la solicitud de registro.
type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Register maneja la petición de registro de usuario.
func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	user, err := h.authService.Register(req.Email, req.Password)
	if err != nil {
		// Aquí se podría mapear errores específicos de dominio a códigos HTTP
		if strings.Contains(err.Error(), "already exists") {
			http.Error(w, "User with this email already exists", http.StatusConflict)
			return
		}
		if strings.Contains(err.Error(), "empty") {
			http.Error(w, "Email or password cannot be empty", http.StatusBadRequest)
			return
		}
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	// No se debería devolver el hash de la contraseña.
	json.NewEncoder(w).Encode(map[string]string{
		"message": "User registered successfully",
		"user_id": user.ID,
		"email": user.Email,
	})
}

// LoginRequest representa la estructura de la solicitud de inicio de sesión.
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Login maneja la petición de inicio de sesión de usuario.
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	token, err := h.authService.Login(req.Email, req.Password)
	if err != nil {
		if strings.Contains(err.Error(), "invalid credentials") {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}
		http.Error(w, "Failed to log in", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}

// ValidateTokenRequest representa la estructura de la solicitud de validación de token.
type ValidateTokenRequest struct {
	Token string `json:"token"`
}

// ValidateToken maneja la petición para validar un token JWT.
// Este endpoint sería consumido principalmente por la API Gateway.
func (h *AuthHandler) ValidateToken(w http.ResponseWriter, r *http.Request) {
	var req ValidateTokenRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	claims, err := h.authService.ValidateToken(req.Token)
	if err != nil {
		http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(claims) // Devolver los claims del token
}
