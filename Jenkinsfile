pipeline {
    agent any
    environment {
    OMDB_API_KEY = credentials('omdb-api-key')
}
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
                withCredentials([file(credentialsId: 'env-file', variable: 'ENV_FILE')]) {
                    sh '''
                    cp $ENV_FILE .env
                    docker-compose down -v
                    docker-compose up -d --build
                    rm -f .env   # cleanup for safety
                    '''
                }
            }
}
    }
}
    