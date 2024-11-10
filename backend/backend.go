package main    

import (
    "fmt"
    "log"
    "net/http"
    "antFlow/handlerApi" // Replace with the actual path to the handlers package
)

func main() {
    // Create a new ServeMux router
    router := http.NewServeMux()

    // Register routes using AddRoutes function
    handlers.AddRoutes(router)

    // Start the server
    port := ":8080"
    fmt.Printf("Server is running on port %s\n", port)
    log.Fatal(http.ListenAndServe(port, router))
}
