pipeline {
    agent any

    environment {
        
        DOCKER_IMAGE = "angelakolikj959/my-app"
        
        
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        GITHUB_CREDENTIALS_ID = "github-credentials"
        
        
        GITHUB_REPO = "https://github.com/kolicangela/my-app.git"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    
                    git credentialsId: GITHUB_CREDENTIALS_ID, url: GITHUB_REPO, branch: 'master'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image with the latest tag
                    sh 'docker build -t my-app:latest .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    
                    sh """
                        docker tag my-app:latest $DOCKER_IMAGE:latest
                        docker push $DOCKER_IMAGE:latest
                    """
                }
            }
        }
    }
}
