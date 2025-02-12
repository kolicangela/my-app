pipeline {
    agent any
   
    stages {
      
        stage("build") {
            steps {
                script {
                    echo 'building the app'
                }
            }
        }
        stage("test") {
            steps {
               echo 'testing the app'
            }
        }
        stage("deploy") {
            steps {
               echo 'deploying the app'
            }
        }
    }   
}
