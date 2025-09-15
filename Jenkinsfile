pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_REPO = 'ibrahimmintal'
        IMAGE_TAG = "v${BUILD_NUMBER}"   // each build: v1, v2, v3...
    }

    triggers {
    pollSCM('H/2 * * * *')  // check every 2 minutes
     }


    stages {
// --------------------- Checkout Repo ---------------------
        stage('Checkout') {
            steps {
                cleanWs()
                git branch: 'main',
                    url: 'https://github.com/ibrahim-mintal/Jenkins-pipeline-3-teir-Web-App.git',
                    credentialsId: 'github'
            }
        }
// --------------------- Build Images ---------------------
        stage('Build Images') {
            steps {
                sh '''
                docker build -t $DOCKERHUB_REPO/frontend:$IMAGE_TAG ./frontend
                docker build -t $DOCKERHUB_REPO/backend:$IMAGE_TAG ./backend
                '''
            }
        }
// --------------------- Push Images to DockerHub ---------------------
        stage('Push Images') {
            steps {
                sh '''
                echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                docker push $DOCKERHUB_REPO/frontend:$IMAGE_TAG
                docker push $DOCKERHUB_REPO/backend:$IMAGE_TAG
                docker logout
                '''
            }
        }
// --------------------- Deploy Application ---------------------
        stage('Deploy') {
            steps {
                sh '''

                ansible-playbook -i inventory.ini playbook.yml

                '''
            }
        }
    }
// --------------------- Post Actions ---------------------
    
    post {
        success { echo " Successfully built & pushed images with tag $IMAGE_TAG" }
        failure { echo " Pipeline failed at build $BUILD_NUMBER" }
        always { cleanWs() }
    }
}

