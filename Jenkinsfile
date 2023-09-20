#!groovy
import groovy.json.JsonSlurperClassic

node {

    def BUILD_NUMBER = env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR = "tests/${BUILD_NUMBER}"
    def SFDC_USERNAME

    def HUB_ORG = env.HUB_ORG_DH
    def SFDC_HOST = env.SFDC_HOST_DH
    def JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
    def CONNECTED_APP_CONSUMER_KEY = env.CONNECTED_APP_CONSUMER_KEY_DH

    def toolbelt = tool 'toolbelt'

    stage('checkout source') {
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Deploy Code') {
            script {
                if (isUnix()) {
                    // On Unix-like systems (including macOS), use zsh as the shell
                    rc = sh returnStatus: true, script: """
                        ${toolbelt} force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile ${jwt_key_file} --setdefaultdevhubusername --instanceurl ${SFDC_HOST}
                    """
                } else {
                    // On Windows, use bat
                    rc = bat returnStatus: true, script: """
                        "${toolbelt}" force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile "${jwt_key_file}" --setdefaultdevhubusername --instanceurl ${SFDC_HOST}
                    """
                }

                if (rc != 0) { error 'hub org authorization failed' }

                // Print the return code
                println "Return code: ${rc}"
                
                // Need to pull out assigned username
                if (isUnix()) {
                    rmsg = sh returnStdout: true, script: """
                        ${toolbelt} force:mdapi:deploy -d manifest/. -u ${HUB_ORG}
                    """
                } else {
                    rmsg = bat returnStdout: true, script: """
                        "${toolbelt}" force:mdapi:deploy -d manifest/. -u ${HUB_ORG}
                    """
                }
                
                // Print the deployment message
                println(rmsg)
            }
        }
    }
}
