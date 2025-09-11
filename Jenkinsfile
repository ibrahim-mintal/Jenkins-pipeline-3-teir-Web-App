pipeline {
    agent any
    triggers {
        pollSCM('H/2 * * * *')   // Poll every 2 minutes
    }
    stages {
        stage('Build') {
            steps {
                echo "Building project..."
            }
        }
        stage('Test') {
            steps {
                echo "Running tests..."
            }
        }
    }
}

    