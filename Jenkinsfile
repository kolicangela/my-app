pipeline {
    agent any

    tools {
        // Reference to Docker tool configured in Jenkins
        dockerTool 'docker'  // Ensure 'docker' matches the name you've set in Jenkins Global Tool Configuration
    }

    environment {
        // Replace with your Docker Hub image name
        DOCKER_IMAGE = "angelakolikj959/my-app"
        
        // Jenkins credentials IDs for Docker and GitHub
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        GITHUB_CREDENTIALS_ID = "github-credentials"
        
        // Replace with your GitHub repository URL
        GITHUB_REPO = "https://github.com/kolicangela/my-app.git"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout code from GitHub repository
                    git credentialsId: GITHUB_CREDENTIALS_ID, url: GITHUB_REPO, branch: 'master'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image with the latest tag
                    sh '/usr/bin/docker build -t my-app:latest .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    // Use stored credentials to login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Tag the Docker image and push it to Docker Hub
                    sh """
                        docker tag my-app:latest $DOCKER_IMAGE:latest
                        docker push $DOCKER_IMAGE:latest
                    """
                }
            }
        }
    }
}
