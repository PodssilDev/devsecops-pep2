pipeline{
    agent any
    tools{
        maven "maven"
        nodejs "node"
    }
    stages{
        stage("Build Backend JAR File"){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/PodssilDev/devsecops-pep2']])
                dir("backend"){
                    sh "mvn clean install"
                }
            }
        }
        stage("Install Packages Frontend"){
            steps{
                dir("frontend"){
                    bat "npm install"
                }
            }
        }
        stage("Test Backend"){
            steps{
                dir("backend"){
                    sh "mvn test"
                }
            }
        }
        stage("SonarQube Analysis Backend"){
            steps{
                dir("backend"){
                    sh "mvn clean verify sonar:sonar -Dsonar.projectKey=backend -Dsonar.host.url=http://localhost:9000 -Dsonar.login=sqp_1797f0b3a22b49be57e43bf3d07a82caf5c0f6b1"
                }
            }
        }
        stage("SonarQube Analysis Frontend"){
            steps{
                dir("frontend"){
                    sh "node sonarscan.js"
                }
            }
        }
        stage("Build Docker Image Backend"){
            steps{
                dir("backend"){
                    sh "docker build -t johnserrano159/atento-backend-devsecops ."
                }
            }
        }
        stage("Build Docker Image Frontend"){
            steps{
                dir("frontend"){
                    sh "docker build -t johnserrano159/atento-frontend-devsecops ."
                }
            }
        }
        stage("Push Docker Image Backend"){
            steps{
                dir("backend"){
                    withCredentials([string(credentialsId: 'dckrhubpassword', variable: 'dckpass')]){
                        sh "docker login -u johnserrano159 -p ${dckpass}"
                    }
                    sh "docker push johnserrano159/atento-backend-devsecops"
                    
                }
                
            }
        }
        stage("Push Docker Image Frontend"){
            steps{
                dir("frontend"){
                    withCredentials([string(credentialsId: 'dckrhubpassword', variable: 'dckpass')]){
                        sh "docker login -u johnserrano159 -p ${dckpass}"
                    }
                    sh "docker push johnserrano159/atento-frontend-devsecops"
                    
                }
                
            }
        }
    }
    post{
        always{
            dir("backend"){
                sh "docker logout"
            }
        }
    }
}