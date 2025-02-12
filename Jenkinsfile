pipeline {
    agent any

    tools {
        dockerTool 'Docker-27.4.0'  // Use the tool configured in Jenkins
    }

    stages {
        stage('Checkout Git Repository') {
            steps {
                // Checkout the repository (optional, for standard pipelines)
                git url: 'https://github.com/kolicangela/my-app.git', branch: 'master'
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
                    // Use withCredentials to securely handle your credentials
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    sh 'docker push my-app:latest'
                }
            }
        }
    }
}
