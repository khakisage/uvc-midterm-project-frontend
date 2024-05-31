pipeline {
    agent any

    environment {
        SLACK_CHANNEL = '#프로젝트'
        AWS_REGION = 'ap-northeast-2'
        COMMIT_MESSAGE = '⚡[Modify] 코드 수정'
        BLUE_GREEN_STATE_FILE = 'blue_green_state.txt'
        GITHUB_TOKEN = credentials('github-tokens')
        SLACK_BOT_TOKEN = credentials('slack-credentials')
        GITHUB_CREDENTIALS = credentials('github-credentials')
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: "*/${env.BRANCH_NAME}"]],
                        doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [],
                        userRemoteConfigs: [[url: 'https://github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git',
                        credentialsId: GITHUB_CREDENTIALS]]])

                    def blueGreenState = sh(script: "git show origin/flag:${env.BLUE_GREEN_STATE_FILE}", returnStdout: true).trim()
                    echo blueGreenState
                    if (blueGreenState.isEmpty()) {
                        blueGreenState = ''
                    }
                    env.BLUE_GREEN_STATE = blueGreenState
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build('whitewalls/frontend:latest', '.')
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        sh "docker login -u ${env.DOCKER_HUB_USERNAME} -p ${env.DOCKER_HUB_PASSWORD} https://registry.hub.docker.com"
                        sh "docker push whitewalls/frontend:latest"
                    }
                }
            }
        }

        stage('Deploy to Next Environment') {
            steps {
                script {
                    def currentEnv = env.BLUE_GREEN_STATE
                    def nextEnv = currentEnv == 'blue' ? 'green' : 'blue'
                    def nextPort = nextEnv == 'blue' ? 81 : 82

                    def stopAndRemoveCommand = "docker stop frontend-${nextEnv} && " +
                                               "docker container prune -f"

                    def deployCommand = "docker system prune -af && docker pull whitewalls/frontend:latest && " +
                                        "docker run -d --name frontend-${nextEnv} -p ${nextPort}:80 whitewalls/frontend:latest"

                    def commandId = sh(script: """
                    aws ssm send-command --document-name "AWS-RunShellScript" \\
                        --targets '[{"Key":"tag:Name","Values":["deploy-server"]}]' \\
                        --parameters '{"commands":["${deployCommand} && ${stopAndRemoveCommand}"]}' \\
                        --region "${AWS_REGION}" \\
                        --output text --query 'Command.CommandId'
                    """, returnStdout: true).trim()

                    waitForSSMCommandCompletion(commandId)
                }
            }
        }

        stage('Update Blue-Green State') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
                        sh """
                        git config user.name "${GITHUB_USERNAME}"
                        git config user.email "whitewalls@naver.com"
                        git fetch origin
                         git checkout flag || git checkout -b flag origin/flag
                        git pull --rebase origin flag
                        """

                        def prevEnv = env.BLUE_GREEN_STATE
                        def currentEnv = prevEnv == 'blue' ? 'green' : 'blue'

                        writeFile file: env.BLUE_GREEN_STATE_FILE, text: currentEnv
                        echo currentEnv

                        sh """
                        git add ${env.BLUE_GREEN_STATE_FILE}
                        git commit -m "${env.COMMIT_MESSAGE}"
                        git push --force https://${env.GITHUB_USERNAME}:${env.GITHUB_TOKEN}@github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git flag
                        """
                    }
                }
            }
        }

        stage('Switch to Next Environment') {
            steps {
                script {
                    def currentEnv = env.BLUE_GREEN_STATE
                    def nextEnv = currentEnv == 'blue' ? 'green' : 'blue'
                    def activePort = 80
                    def stopCurrentCommand

                    if (currentEnv != '') {
                        stopCurrentCommand = "docker stop frontend-${currentEnv} && " +
                                             "docker container prune -f &&" +
                                             "docker image prune -a -f"  
                    } else {
                        stopCurrentCommand = "docker container prune -f"
                    }

                    def startNextCommand = "docker run -d --name frontend-${nextEnv} -p ${activePort}:80 whitewalls/frontend:latest"

                    def switchCommand = stopCurrentCommand + " && " + startNextCommand

                    def commandId = sh(script: """
                    aws ssm send-command --document-name "AWS-RunShellScript" \\
                        --targets '[{"Key":"tag:Name","Values":["deploy-server"]}]' \\
                        --parameters '{"commands":["${switchCommand}"]}' \\
                        --region "${AWS_REGION}" \\
                        --output text --query 'Command.CommandId'
                    """, returnStdout: true).trim()

                    waitForSSMCommandCompletion(commandId)
                }
            }
        }
    }

    post {
        success {
            script {
                def message = "⭐😋${env.BRANCH_NAME}브랜치에서 ${env.BUILD_NUMBER}번째 프론트엔드 빌드가 성공하였습니다!! PR을 승인해주세요!!😋⭐"
                slackSend(channel: env.SLACK_CHANNEL, tokenCredentialId: 'slack-credentials', message: message)
            }
        }

        failure {
            script {
                if (currentBuild.result == 'ABORTED') {
                    node {
                        withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
                            sh """
                            git config user.name "${GITHUB_USERNAME}"
                            git config user.email "whitewalls@naver.com"
                            git fetch origin
                            git checkout flag || git checkout -b flag origin/flag
                            git pull --rebase origin flag
                            """

                            def prevEnv = env.BLUE_GREEN_STATE

                            writeFile file: env.BLUE_GREEN_STATE_FILE, text: prevEnv
                            echo prevEnv

                            sh """
                            git add ${env.BLUE_GREEN_STATE_FILE}
                            git commit -m "${env.COMMIT_MESSAGE}"
                            git push --force https://${env.GITHUB_USERNAME}:${env.GITHUB_TOKEN}@github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git flag
                            """
                        }

                        def message = "🏃‍♂️🚫${env.BUILD_NUMBER}번째 프론트엔드 빌드가 취소되었습니다!! 취소된 빌드를 확인해주세요!!🚫🏃‍♂️"
                        slackSend(channel: env.SLACK_CHANNEL, tokenCredentialId: 'slack-credentials', message: message)
                    }
                } else {
                    node {
                        def currentEnv = env.BLUE_GREEN_STATE
                        def activeEnv = currentEnv == 'blue' ? 'green' : 'blue'

                        def cleanupCommand = "docker stop frontend-${activeEnv} && " + 
                                             "docker rm frontend-${activeEnv}"

                        def commandId = sh(script: """
                        aws ssm send-command \\
                            --document-name "AWS-RunShellScript" \\
                            --targets '[{"Key":"tag:Name","Values":["deploy-server"]}]' \\
                            --parameters '{"commands":["${cleanupCommand}"]}' \\
                            --region "${AWS_REGION}" \\
                            --output text --query 'Command.CommandId'
                        """, returnStdout: true).trim()

                        waitForSSMCommandCompletion(commandId)

                        withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
                            sh """
                            git config user.name "${GITHUB_USERNAME}"
                            git config user.email "whitewalls@naver.com"
                            git fetch origin
                            git checkout flag || git checkout -b flag origin/flag
                            git pull --rebase origin flag
                            """

                            def prevEnv = env.BLUE_GREEN_STATE

                            writeFile file: env.BLUE_GREEN_STATE_FILE, text: prevEnv
                            echo prevEnv

                            sh """
                            git add ${env.BLUE_GREEN_STATE_FILE}
                            git commit -m "${env.COMMIT_MESSAGE}"
                            git push --force https://${env.GITHUB_USERNAME}:${env.GITHUB_TOKEN}@github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git flag
                            """

                            def message = "☔🙀${env.BRANCH_NAME}브랜치에서 ${env.BUILD_NUMBER}번째 프론트엔드 빌드가 실패하였습니다!! 로그를 확인해주세요!!🙀☔"
                            slackSend(channel: env.SLACK_CHANNEL, tokenCredentialId: 'slack-credentials', message: message)
                        }
                    }
                }
            }
        }
    }
}


def waitForSSMCommandCompletion(commandId) {
    while (true) {
        def status = sh(script: """
        aws ssm list-command-invocations \\
            --command-id ${commandId} \\
            --details \\
            --region ${env.AWS_REGION} \\
            --output text \\
            --query 'CommandInvocations[0].Status'
        """, returnStdout: true).trim()

        if (status == "Success") {
            echo "SSM command ${commandId} completed successfully."
            break
        } else if (status == "Failed" || status == "Cancelled" || status == "TimedOut") {
            def errorDetails = sh(script: """
            aws ssm list-command-invocations \\
                --command-id ${commandId} \\
                --details \\
                --region ${env.AWS_REGION} \\
                --output text \\
                --query 'CommandInvocations[0].CommandPlugins[0].Output'
            """, returnStdout: true).trim()

            echo "Error Detail Message: ${errorDetails}"

            error "SSM command ${commandId} failed with status: ${status}"
        } else {
            echo "Waiting for SSM command ${commandId} to complete. Current status: ${status}"
            sleep(5)
        }
    }
}
