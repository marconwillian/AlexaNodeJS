<?php

  class AlexaSkills
    {
        private $_appId;

        public function __construct() {
            // Remplacer ici par votre app ID
            $this->_appId = 'amzn1.ask.skill.6d8f7b19-f58d-4349-898a-ff14ccc15eb3';
         }

        /**
         * Check if the request is from Amazon Ip
         */
        public function isRequestFromAmazon()
        {
            $amazon_ip = array("72.21.217.","54.240.197.");
            foreach($amazon_ip as $ip) {
                if (stristr($_SERVER['REMOTE_ADDR'], $ip)) {
                    return true;
                }
            }
            return false;

        }

        public function base($usuario) {
            $mongodb = new MongoClient('mongodb://'._USERDB.':'._PASSDB.'@'._SERVERDB);
            $database = _DATABASEDB;
            $mongodb = $mongodb->$database;
            $userd = $mongodb->user->find(array('id_alexa' => $usuario));

            return $userd;

         }

        public function validate($requete)
        {

            // //check if the request come from amazon
            // $isAmazonIp = $this->isRequestFromAmazon();
            // if ( !$isAmazonIp) {
            //     logapp("1", "error_etapa");
            //     die(json_encode(['version' => '1.0', 'response' => [ 'outputSpeech' => ['type' => 'PlainText', 'text' => error("400", 'Forbidden, your App ID is not allowed to make this request!'), "locale"=> "pt-BR", 'ssml' => null ], 'shouldEndSession' => false ]]));
            // }

            // //check my Amazon IP
            // if (strtolower($requete->session->application->applicationId) != strtolower($this->_appId)) {
            //     logapp("2", "error_etapa");
            //     die(json_encode(['version' => '1.0', 'response' => [ 'outputSpeech' => ['type' => 'PlainText', 'text' => error("400", 'Forbidden, your App ID is not allowed to make this request!'), "locale"=> "pt-BR", 'ssml' => null ], 'shouldEndSession' => false ]]));
            // }

            // Check SSL signature
            if (preg_match("/https:\/\/s3.amazonaws.com(\:443)?\/echo.api\/*/i", $_SERVER['HTTP_SIGNATURECERTCHAINURL']) == false) {
                logapp("3", "error_etapa");
                die(json_encode(['version' => '1.0', 'response' => [ 'outputSpeech' => ['type' => 'PlainText', 'text' => error("400", 'Forbidden, your App ID is not allowed to make this request!'), "locale"=> "pt-BR", 'ssml' => null ], 'shouldEndSession' => false ]]));
            }

            $pem_file = 'tmp/' . hash("sha256", $_SERVER['HTTP_SIGNATURECERTCHAINURL']) . ".pem";
            if (!file_exists($pem_file)) {
                file_put_contents($pem_file, file_get_contents($_SERVER['HTTP_SIGNATURECERTCHAINURL']));
            }
            $pem = file_get_contents($pem_file);
            $json = file_get_contents('php://input');

            logapp($pem_file, "pem_file");
            logapp($_SERVER['HTTP_SIGNATURECERTCHAINURL'], "HTTPSIG");

            if (openssl_verify($json, base64_decode($_SERVER['HTTP_SIGNATURE']) , $pem) !== 1){
                logapp("4", "error_etapa");
                die(json_encode(['version' => '1.0', 'response' => [ 'outputSpeech' => ['type' => 'PlainText', 'text' => error("400", 'Forbidden, your App ID is not allowed to make this request!'), "locale"=> "pt-BR", 'ssml' => null ], 'shouldEndSession' => false ]]));
            }
            // check we can parse the pem content
            $cert = openssl_x509_parse($pem);
            if (empty($cert)) {
                logapp("5", "error_etapa");
                die(json_encode(['version' => '1.0', 'response' => [ 'outputSpeech' => ['type' => 'PlainText', 'text' => error("400", 'Forbidden, your App ID is not allowed to make this request!'), "locale"=> "pt-BR", 'ssml' => null ], 'shouldEndSession' => false ]]));
            }
            // Check subjectAltName
            if (stristr($cert['extensions']['subjectAltName'], 'echo-api.amazon.com') != true) {
                logapp("6", "error_etapa");
                die(json_encode(['version' => '1.0', 'response' => [ 'outputSpeech' => ['type' => 'PlainText', 'text' => error("400", 'Forbidden, your App ID is not allowed to make this request!'), "locale"=> "pt-BR", 'ssml' => null ], 'shouldEndSession' => false ]]));
            }

            // check expiration date of the certificate
            if ($cert['validTo_time_t'] < time()){
                logapp("7", "error_etapa");
                //header($_SERVER["SERVER_PROTOCOL"].' 400 '."Forbidden, your App ID is not allowed to make this request!");
                //die("Forbidden, your App ID is not allowed to make this request!");
                if (file_exists($pem_file)){
                    unlink($pem_file);
                }
            }
            if (time() - strtotime($requete->request->timestamp) > 60) {
                logapp("8", "error_etapa");
                die(json_encode(['version' => '1.0', 'response' => [ 'outputSpeech' => ['type' => 'PlainText', 'text' => error("400", 'Forbidden, your App ID is not allowed to make this request!'), "locale"=> "pt-BR", 'ssml' => null ], 'shouldEndSession' => false ]]));
            }
        }
    }
