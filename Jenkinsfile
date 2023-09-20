pipeline {
    agent any

    environment {
        HUB_ORG = credentials('HUB_ORG_DH')
        SFDC_HOST = credentials('SFDC_HOST_DH')
        JWT_CRED_ID = credentials('JWT_CRED_ID_DH')
        CONNECTED_APP_CONSUMER_KEY = credentials('CONNECTED_APP_CONSUMER_KEY_DH')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to Salesforce') {
            steps {
                sh """
                sfdx force:auth:jwt:grant \
                    --clientid ${CONNECTED_APP_CONSUMER_KEY} \
                    --jwtkeyfile path/to/your/jwt/keyfile.key \
                    --username ${SFDC_HOST} \
                    --setdefaultdevhubusername \
                    --instanceurl ${HUB_ORG}
                sfdx force:source:deploy -p force-app/main/default -u ${SFDC_HOST}
                """
            }
        }
    }
}
