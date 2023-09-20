#!groovy
import groovy.json.JsonSlurperClassic

pipeline {
    agent any

    environment {
        BUILD_NUMBER = env.BUILD_NUMBER
        RUN_ARTIFACT_DIR = "tests/${BUILD_NUMBER}"
        SFDC_USERNAME = null // Define SFDC_USERNAME here if needed
        HUB_ORG = env.HUB_ORG_DH
        SFDC_HOST = env.SFDC_HOST_DH
        JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
        CONNECTED_APP_CONSUMER_KEY = env.CONNECTED_APP_CONSUMER_KEY_DH
    }

    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Deploy Code') {
            steps {
                script {
                    def toolbelt = tool 'toolbelt'
                    
                    if (isUnix()) {
                        sh """
                        ${toolbelt} force:auth:jwt:grant \
                        --clientid ${CONNECTED_APP_CONSUMER_KEY} \
                        --username ${HUB_ORG} \
                        --jwtkeyfile ${JWT_KEY_CRED_ID} \
                        --setdefaultdevhubusername \
                        --instanceurl ${SFDC_HOST}
                        """
                    } else {
                        bat """
                        "${toolbelt}" force:auth:jwt:grant \
                        --clientid ${CONNECTED_APP_CONSUMER_KEY} \
                        --username ${HUB_ORG} \
                        --jwtkeyfile "${JWT_KEY_CRED_ID}" \
                        --setdefaultdevhubusername \
                        --instanceurl ${SFDC_HOST}
                        """
                    }
                }
            }
        }
    }
}
