# Budget Manager

## Project Overview
Budget Manager is a full-stack application designed to help users manage their finances effectively. The project consists of a **frontend**, a **backend**, and **Kubernetes containers** for deployment.

## Contents
- **Frontend**: A React-based web application for user interaction.
- **Backend**: A Node.js/Express API for handling business logic and database operations.
- **Kubernetes**: Configuration files for container orchestration and deployment.

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Docker
- Kubernetes (Minikube or any Kubernetes cluster)
- kubectl CLI
- A package manager (npm or yarn)

---

### Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables:
    - Create a `.env` file in the `backend` directory.
    - Add the following variables:
      ```
      PORT=5000
      DATABASE_URL=<your-database-url>
      JWT_SECRET=<your-secret-key>
      ```
4. Start the backend server:
    ```bash
    npm start
    ```

---

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables:
    - Create a `.env` file in the `frontend` directory.
    - Add the following variables:
      ```
      REACT_APP_API_URL=http://localhost:5000
      ```
4. Start the development server:
    ```bash
    npm start
    ```

---

### Kubernetes Setup
1. Build Docker images for the frontend and backend:
    ```bash
    docker build -t budget-manager-backend ./backend
    docker build -t budget-manager-frontend ./frontend
    ```
2. Push the images to a container registry (e.g., Docker Hub):
    ```bash
    docker tag budget-manager-backend <your-dockerhub-username>/budget-manager-backend
    docker tag budget-manager-frontend <your-dockerhub-username>/budget-manager-frontend
    docker push <your-dockerhub-username>/budget-manager-backend
    docker push <your-dockerhub-username>/budget-manager-frontend
    ```
3. Apply Kubernetes configurations:
    ```bash
    kubectl apply -f kubernetes/
    ```
4. Verify the deployment:
    ```bash
    kubectl get pods
    kubectl get services
    ```

---

## Additional Notes
- Ensure your Kubernetes cluster has access to the container registry.
- Update the Kubernetes YAML files in the `kubernetes/` directory with the correct image paths and environment variables.

