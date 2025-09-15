# Forecast Engine

A CRUD based backend API built with Node.js, Express, and MongoDB - creating, reading, updating, and deleting users. This project also demonstrates integration with a third-party service to fetch weather data for users based on their stored city.

The application uses the native MongoDB driver and enforces schema validation at the database level.

## Live API

-   **URL:** [https://forecast-engine-ez22.onrender.com](https://forecast-engine-ez22.onrender.com)
-   **Status:** The API is live and publicly accessible.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)


## Features

-   **CRUD Operations:** Full Create, Read, Update, and Delete functionality for users.
-   **MongoDB Native Driver:** Direct communication with the MongoDB database.
-   **Schema Validation:** Ensures data integrity for the `users` collection within MongoDB.
-   **External API Integration:** Connects to the OpenWeatherMap API to fetch real-time weather data.
-   **RESTful Endpoints:** A clear and structured API for interacting with user data.
-   **Environment-Based Configuration:** Securely manages sensitive keys and database URIs using a `.env` file.

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **Libraries:**
    -   `mongodb`: The official native Node.js driver for MongoDB.
    -   `express`: Web server framework.
    -   `dotenv`: For loading environment variables from a `.env` file.
    -   `cors`: For enabling Cross-Origin Resource Sharing.
    -   `body-parser`: Middleware to parse request bodies.
    -   `got`: A lightweight HTTP request library for the weather API call.

## Getting Started

### Prerequisites

-   Node.js (v20.x or later)
-   npm
-   A local or cloud-hosted MongoDB instance (e.g., from MongoDB Atlas).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ItsMeAK_GitH/Forecast-Engine.git
    cd Forecast-Engine
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGODB_URI="your_mongodb_connection_string"
    WEATHER_API_KEY="your_openweathermap_api_key"
    ```
    Replace the placeholder values with your actual MongoDB connection string and your OpenWeatherMap API key.

4.  **Run the application:**
    ```bash
    node server.js
    ```
    The API will be running on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint                | Description                                  |
| :---   | :---                    | :---                                         |
| `POST` | `/users`                | Creates a new user.                          |
| `GET`  | `/users`                | Retrieves all users.                         |
| `GET`  | `/users/:id`            | Retrieves a single user by their ID.         |
| `PUT`  | `/users/:id`            | Updates an existing user.                    |
| `DELETE`| `/users/:id`            | Deletes a user.                              |
| `GET`  | `/users/:id/weather`    | Retrieves current weather for the user's city.|
| `GET`  | `/users/query/:query`   | Searches for a user by name or email.        |

### Example Usage (cURL)

Replace `<USER_ID>` with an actual user ID from your database.

**Create a user:**
```bash
curl -X POST -H "Content-Type: application/json" -d '''{"name": "Jane Doe", "email": "jane@example.com", "city": "Paris"}''' https://forecast-engine-ez22.onrender.com/users
```

**Get all users:**
```bash
curl https://forecast-engine-ez22.onrender.com/users
```

**Get a single user by ID:**
```bash
curl https://forecast-engine-ez22.onrender.com/users/<USER_ID>
```

**Update a user's city:**
```bash
curl -X PUT -H "Content-Type: application/json" -d '''{"city": "Tokyo"}''' https://forecast-engine-ez22.onrender.com/users/<USER_ID>
```

**Delete a user:**
```bash
curl -X DELETE https://forecast-engine-ez22.onrender.com/users/<USER_ID>
```

**Get a user's weather:**
```bash
curl https://forecast-engine-ez22.onrender.com/users/<USER_ID>/weather
```

**Search for a user (by email):**
```bash
curl https://forecast-engine-ez22.onrender.com/users/query/jane@example.com
```

**Search for a user (by name with spaces):**
```bash
curl https://forecast-engine-ez22.onrender.com/users/query/Jane%20Doe
```

## Deployment

This application is ready to be deployed to any service that supports Node.js, such as Render, Heroku, or a VPS.

1.  **Database:** It's recommended to use a managed database service like **MongoDB Atlas**.
2.  **Application:** Services like **Render** provide a seamless deployment experience by connecting directly to your Git repository.

When deploying, ensure you configure the `MONGODB_URI` and `WEATHER_API_KEY` environment variables in your hosting provider's settings panel.

### Note on Supabase
This project is built specifically for MongoDB. Supabase uses a Postgres database, so a direct deployment is not possible without refactoring the database logic to use a Postgres client instead of the `mongodb` driver.
