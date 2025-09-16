# Automated CI/CD Pipeline for a Multi-Container Movie Review App

This project demonstrates how to build and deploy a **microservices-style web application** using modern DevOps tools. The app consists of a frontend, backend, and database, all containerized with Docker, deployed with Ansible, and automated through Jenkins CI/CD pipelines.

---

## 🔧 Tools Involved

- **Docker**: Containerize frontend, backend, and database services.
- **Docker Compose**: Manage and run the multi-container app locally.
- **Jenkins**: Automate the build, test, and deployment pipeline.
- **Ansible**: Deploy Docker containers to multiple servers (staging and production).

---

## 🛠️ Project Workflow

### 1. Application Setup
- Build a **frontend** using React or simple HTML served by NGINX.
- Develop a **backend** using Flask, Node.js, or Spring Boot.
- Use a **database** like Postgres or MySQL for data storage.

### 2. Dockerization
- Write `Dockerfile`s for the frontend and backend services.
- Use an official Docker image for the database (Postgres/MySQL).
- Create a `docker-compose.yml` file to run the entire app locally with all containers.

### 3. Jenkins CI Pipeline
- Jenkins pulls the latest code from GitHub.
- Builds Docker images for the frontend and backend.
- Runs unit tests to ensure code quality.
- Pushes the built Docker images to Docker Hub for easy access.

### 4. Ansible Deployment (Continuous Deployment)
- Use Ansible playbooks to:
  - Install Docker on target servers if not already installed.
  - Pull the latest Docker images from Docker Hub.
  - Start containers with proper networking and environment configurations.
- Deploy the app to two environments: **staging** and **production**.

### 5. Final Flow
- Developer pushes code changes to GitHub.
- Jenkins automatically triggers the pipeline to build, test, and push images.
- Jenkins then triggers Ansible to deploy the updated containers to the target servers.
- The app updates automatically on the staging and production servers without manual intervention.

---

## 🚀 Building and Deployment Steps

Follow these step-by-step guides to build and deploy the application.

### Building the Application Locally

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd movie-review
   ```

2. **Build and Run with Docker Compose**:
   - Ensure Docker and Docker Compose are installed.
   - Run the following command to build and start all services:
     ```
     docker-compose up --build
     ```
   - This will build the frontend and backend images, start the database, and run the app locally.
   - Access the frontend at `http://localhost:3000` and backend at `http://localhost:5000`.

3. **Stop the Application**:
   ```
   docker-compose down
   ```

### Deploying with Ansible

1. **Prepare Ansible Inventory**:
   - Edit `inventory.ini` to list your target servers (e.g., staging and production IPs).
   - Example:
     ```
     [staging]
     server1 ansible_host=192.168.1.10 ansible_user=ubuntu

     [production]
     server2 ansible_host=192.168.1.20 ansible_user=ubuntu
     ```

2. **Run Ansible Playbook**:
   - Ensure Ansible is installed and SSH keys are set up for passwordless access.
   - Run the playbook to deploy:
     ```
     ansible-playbook -i inventory.ini playbook.yml
     ```
   - This installs Docker on servers, pulls images from Docker Hub, and starts containers.

### Jenkins Automation

1. **Set Up Jenkins Pipeline**:
   - Install Jenkins and required plugins (Docker, Ansible).
   - Create a new pipeline job and point it to the `Jenkinsfile` in the repo.
   - Configure webhooks in GitHub to trigger on push.

2. **Run the Pipeline**:
   - On code push, Jenkins will:
     - Pull code.
     - Build Docker images.
     - Run tests.
     - Push images to Docker Hub.
     - Trigger Ansible deployment via `Jenkinsfile-Deploy`.

---

## 🌐 Accessing the Application

- **Local Development**:
  - Frontend: [http://localhost:3000](http://localhost:3000)
  - Backend: [http://localhost:5000](http://localhost:5000)

- **Deployed Environments** (after Ansible deployment):
  - Staging Frontend: [http://192.168.24.129:3000](http://192.168.24.129:3000)
  - Staging Backend: [http://192.168.24.129:5000/admin](http://192.168.24.129:5000/admin)
  - Production Frontend: [http://192.168.24.130:3000](http://192.168.24.130:3000)
  - Production Backend: [http://192.168.24.130:5000/admin](http://192.168.24.130:5000/admin)

---

## 📁 Results

Here are screenshots from the build and deployment process:

- **Ansible Deployment Result**:
  ![Ansible Result](results/Ansible%20Result.png)

- **Movie Review Frontend**:
  ![Movie Review Frontend](results/Movie%20Review%20Frontend.png)

- **Movie Review Backend**:
  ![Movie Review Backend](results/Movie%20Review%20Backend.png)

- **Server 1 Frontend**:
  ![Server 1 Frontend](results/server1-frontend.png)

- **Server 1 Backend**:
  ![Server 1 Backend](results/server1-backend.png)

- **Server 2 Frontend**:
  ![Server 2 Frontend](results/server2-frontend.png)

- **Server 2 Backend**:
  ![Server 2 Backend](results/server2-backend.png)

---

This setup provides a robust, automated pipeline for developing, testing, and deploying a multi-container movie review application with minimal manual effort.
