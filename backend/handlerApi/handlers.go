package handlers

import (
	"bytes"
	"encoding/json"
	// "fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"

	"github.com/joho/godotenv"
)

// Define response structure
type ApiResponse struct {
	Message string `json:"message"`
}

// Struct definitions for storing data
type UserInfo struct {
	UserEmail          string         `json:"user_email"`
	Password           string         `json:"password"`
	CompanyName        string         `json:"company_name"`
	CompanyDescription string         `json:"company_description"`
	EmployeeInfoList   []EmployeeInfo `json:"employeeInfo"`
	ProjectInfoList    []ProjectInfo  `json:"projectInfo"`
}

type EmployeeInfo struct {
	ID      string   `json:"id"`
	Name    string   `json:"name"`
	Email   string   `json:"email"`
	Skill   []string `json:"skill"`
	History string   `json:"history"`
}

type ProjectInfo struct {
	ProjectName string `json:"project_name"`
	Description string `json:"description"`
}

// Global in-memory storage
var userStore []UserInfo

// Handler to create a new user
func CreateUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var user UserInfo
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	userStore = append(userStore, user)
	response := ApiResponse{Message: "User created successfully"}
	jsonResponse(w, response)
}

// Handler to authenticate login
func AuthenticateUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var credentials struct {
		UserEmail string `json:"user_email"`
		Password  string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Check if the credentials match a stored user
	for _, user := range userStore {
		if user.UserEmail == credentials.UserEmail && user.Password == credentials.Password {
			response := ApiResponse{Message: "Authentication successful"}
			jsonResponse(w, response)
			return
		}
	}

	http.Error(w, "Invalid email or password", http.StatusUnauthorized)
}

// Helper function to find user by email
func findUserByEmail(email string) *UserInfo {
	for i := range userStore {
		if userStore[i].UserEmail == email {
			return &userStore[i]
		}
	}
	return nil
}

// Handler to add an employee based on user email
func AddEmployee(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		UserEmail    string       `json:"user_email"`
		EmployeeInfo EmployeeInfo `json:"employeeInfo"`
	}
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	user := findUserByEmail(requestData.UserEmail)
	if user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	user.EmployeeInfoList = append(user.EmployeeInfoList, requestData.EmployeeInfo)
	jsonResponse(w, ApiResponse{Message: "Employee added successfully"})
}

// Handler to add a project based on user email
func AddProject(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		UserEmail   string      `json:"user_email"`
		ProjectInfo ProjectInfo `json:"projectInfo"`
	}
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	user := findUserByEmail(requestData.UserEmail)
	if user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	user.ProjectInfoList = append(user.ProjectInfoList, requestData.ProjectInfo)
	jsonResponse(w, ApiResponse{Message: "Project added successfully"})
}

// Handler to fetch all employees for a user based on email
func FetchEmployeesByUserEmail(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		UserEmail string `json:"user_email"`
	}
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	user := findUserByEmail(requestData.UserEmail)
	if user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	jsonResponse(w, user.EmployeeInfoList)
}

// Handler to fetch all projects for a user based on email
func FetchProjectsByUserEmail(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		UserEmail string `json:"user_email"`
	}
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	user := findUserByEmail(requestData.UserEmail)
	if user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	jsonResponse(w, user.ProjectInfoList)
}

func sendEmail(email string, taskName string, taskDescription string) {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	from := os.Getenv("EMAIL")
	password := os.Getenv("EMAIL_PASSWORD")

	to := []string{email}
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	message := []byte("Subject: New Task Assigned\n\n" +
		"Task Name: " + taskName + "\n" +
		"Task Description: " + taskDescription + "\n")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err = smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		log.Printf("Failed to send email to %s: %v", email, err)
		return
	}
	// d := gomail.NewDialer("smtp.example.com", 587, from,)
	// d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	log.Printf("Email sent successfully to %s", email)
}

func empMappingTotask(employees []EmployeeInfo, promptRes map[string]interface{}) {
	// Verify if promptRes has expected structure
	tasksData, ok := promptRes["data"].(map[string]interface{})
	if !ok {
		log.Fatalf("Invalid data structure in promptRes")
		return
	}

	tasks, ok := tasksData["tasks"].([]interface{})
	if !ok {
		log.Fatalf("Tasks not found or invalid format")
		return
	}

	// Loop through each employee and each task
	for _, employee := range employees {
		for _, task := range tasks {
			taskDetails, ok := task.(map[string]interface{})
			if !ok {
				continue
			}

			taskName, _ := taskDetails["task_name"].(string)
			taskDescription, _ := taskDetails["task_description"].(string)

			// Required skills for this task
			requiredSkills, ok := taskDetails["required_skills"].([]interface{})
			if !ok {
				continue
			}

			// Check if the employee has any required skills
			skillMatched := false
			for _, skill := range requiredSkills {
				for _, empSkill := range employee.Skill {
					if skill == empSkill {
						skillMatched = true
						break
					}
				}
				if skillMatched {
					break
				}
			}

			// Send email if there's a skill match
			if skillMatched {
				sendEmail(employee.Email, taskName, taskDescription)
			}
		}
	}
}

func prompter(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		UserEmail          string `json:"user_email"`
		ProjectDescription string `json:"project_description"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Create proper JSON payload
	payload, err := json.Marshal(map[string]string{
		"project_description": requestData.ProjectDescription,
	})
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	response, err := http.Post("http://localhost:8000", "application/json", bytes.NewBuffer(payload))
	if err != nil {
		http.Error(w, "Failed to send request", http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()

	var result map[string]interface{}
	if err := json.NewDecoder(response.Body).Decode(&result); err != nil {
		http.Error(w, "Failed to decode response", http.StatusInternalServerError)
		return
	}

	empMappingTotask(findUserByEmail(requestData.UserEmail).EmployeeInfoList, result)

	jsonResponse(w, result)
}

// Utility function to send JSON responses
func jsonResponse(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

// Route registration function
func AddRoutes(router *http.ServeMux) {
	router.HandleFunc("/api/createUser", CreateUser)
	router.HandleFunc("/api/authenticateLogin", AuthenticateUser)
	router.HandleFunc("/api/addEmployee", AddEmployee)
	router.HandleFunc("/api/addProject", AddProject)
	router.HandleFunc("/api/fetchEmployeesByUserEmail", FetchEmployeesByUserEmail)
	router.HandleFunc("/api/prompter", prompter)
	router.HandleFunc("/api/fetchProjectsByUserEmail", FetchProjectsByUserEmail)
}
