package handlers

import (
    "encoding/json"
    "net/http"
)

// Define response structure
type ApiResponse struct {
    Message string `json:"message"`
}

// Struct definitions for storing data
type UserInfo struct {
    UserEmail          string          `json:"user_email"`
    Password           string          `json:"password"`
    CompanyName        string          `json:"company_name"`
    CompanyDescription string          `json:"company_description"`
    EmployeeInfoList   []EmployeeInfo  `json:"employeeInfo"`
    ProjectInfoList    []ProjectInfo   `json:"projectInfo"`
}

type EmployeeInfo struct {
    ID      string `json:"id"`
    Name    string `json:"name"`
    Email   string `json:"email"`
    Skill   string `json:"skill"`
    History string `json:"history"`
}

type ProjectInfo struct {
    ProjectName string `json:"project_name"`
    Description string `json:"description"`
    TechStack   string `json:"tech_stack"`
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

// Utility function to send JSON responses
func jsonResponse(w http.ResponseWriter, data interface{}) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(data)
}

// Route registration function
func AddRoutes(router *http.ServeMux) {
    router.HandleFunc("/api/createUser", CreateUser)
	router.HandleFunc("/api/authenticateLogin",AuthenticateUser)
    router.HandleFunc("/api/addEmployee", AddEmployee)
    router.HandleFunc("/api/addProject", AddProject)
    router.HandleFunc("/api/fetchEmployeesByUserEmail", FetchEmployeesByUserEmail)
    router.HandleFunc("/api/fetchProjectsByUserEmail", FetchProjectsByUserEmail)
}
