pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo "Building project ..."
            }
        }
        stage('Test') {
            steps {
                echo "Running tests..."
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose down -v'
                sh 'docker-compose up -d --build'
            }
        }
    }
}
    