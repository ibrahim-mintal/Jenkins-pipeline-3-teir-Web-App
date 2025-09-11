pipeline {
    agent any
    stages {

        stage('Deploy') {
            steps {
                # I used jenkins credentials to securely store the .env file with ID 'env-file'#
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
    