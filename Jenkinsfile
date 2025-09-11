pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_REPO = 'ibrahimmintal'   // change to your DockerHub username
    }
        triggers {
        githubPush()   // Trigger build on GitHub push
    }

    stages {
// -------------- Checkout Code --------------
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ibrahim-mintal/Jenkins-pipeline-3-teir-Web-App.git',
                    credentialsId: 'github'
            }
        }
// -------------- Build Docker Images --------------
        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t $DOCKERHUB_REPO/frontend:latest ./frontend'
                    sh 'docker build -t $DOCKERHUB_REPO/backend:latest ./backend'
                }
            }
        }
// -------------- Push Docker Images --------------
        stage('Push Docker Images') {
            steps {
                script {
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    sh 'docker push $DOCKERHUB_REPO/frontend:latest'
                    sh 'docker push $DOCKERHUB_REPO/backend:latest'
                }   

            }
        }
    }


    post {
            always {
                sh 'docker logout'
            }
            success {
                echo "✅ Build and push completed successfully!"
            }
            failure {
                echo "❌ Build failed!"
            }
        }
}
    