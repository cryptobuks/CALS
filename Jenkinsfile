#!/usr/bin/env groovy

DOCKER_GROUP = 'cwds'
DOCKER_IMAGE = 'cals'

def notify(String status)
{
    def colorCode = status == 'SUCCESS' ? '11AB1B' : '#FF0000'
    slackSend(
        color: colorCode,
        message: "${env.JOB_NAME} #${env.BUILD_NUMBER} - *${currentBuild.currentResult}* after ${currentBuild.durationString} (Details at ${env.BUILD_URL})"
    )
}
def reports()
{
    try {
            stage ('Reports') {
                // step([$class: 'JUnitResultArchiver', testResults: '**/reports/*.xml'])

                publishHTML (target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'reports/coverage/karma',
                    reportFiles: 'index.html',
                    reportName: 'JS Code Coverage'
                ])

                publishHTML (target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'reports/coverage/rspec',
                    reportFiles: 'index.html',
                    reportName: 'Ruby Code Coverage'
                ])
            }
        }
        catch(e) {
            pipelineStatus = 'FAILED'
            currentBuild.result = 'FAILURE'
        }
}
def pushToDocker()
{
    // stage('Publish') {
    //     curStage = 'Publish'
    //     sh "make tag latest \$(git rev-parse --short HEAD)"
    //     withEnv(["DOCKER_USER=${DOCKER_USER}",
    //              "DOCKER_PASSWORD=${DOCKER_PASSWORD}"]) {
    //         sh "make login"
    //         sh "make publish"
    //     }
    // }
}

node {
    checkout scm
    env.DISABLE_SPRING = 1
    def branch = env.BRANCH_NAME ?: 'development'
    def curStage = 'Start'
    def emailList = 'ratnesh.raval@osi.ca.gov'
    def pipelineStatus = 'SUCCESS'
    def pipelineStatusMessage = ''
    def successColor = '11AB1B'
    def failureColor = '#FF0000'

    try {
        emailList = EMAIL_NOTIFICATION_LIST
    } catch (e) {
        // Okay not to perform assignment if EMAIL_NOTIFICATION_LIST is not defined
    }

    try {
        stage('Install Dependencies') {
            curStage = 'dependencies'
            echo 'which ruby'
            sh 'which ruby'
            echo 'which bundler'
            sh 'which bundler'
            echo 'which bundle'
            sh 'which bundle'
            sh 'bundle install'
            sh 'yarn install'
        }
         stage('Lint') {
            curStage = 'lint'
            sh 'yarn run lint'
        }
        stage('Compile Assets') {
            curStage = 'assets'
            sh 'bundle exec rails assets:precompile RAILS_ENV=test'
        }

        stage('Test - Jasmine') {
            curStage = 'karma'
            sh 'yarn run karma-ci'
        }
        stage('Test - Rspec') {
            curStage = 'rspec'
            withEnv([
                'CALS_API_URL=https://calsapi.preint.cwds.io',
                'GEO_SERVICE_URL=https://geo.preint.cwds.io',
                'BASE_SEARCH_API_URL=https://dora.preint.cwds.io',
                'AUTHENTICATION_API_BASE_URL=https://web.preint.cwds.io/perry'
                ]) {
                sh 'yarn run spec-ci'
            }
        }

        if (branch == 'development') {
            // push to docker
            pushToDocker()
        }
    }
    catch (e) {
        pipelineStatus = 'FAILED'
        throw e
    }
    finally {
        reports()
        notify(pipelineStatus)
        // cleanWs()
    }
}
