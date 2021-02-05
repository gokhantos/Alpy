class Session {
    constructor(socket){
        this._socket = socket;
        this._nextID = 0;
        this._type = '';
        this._completionHandlers = {};
        this.onMessage = this.onMessage.bind(this);
        this.dispose = this.dispose.bind(this);
        this._socket.addListener('message', this.onMessage);
    }

    dispose(){
        if(this._socket){
            this._socket.removeListener('message', this.onMessage);
            if(this._socket.readyState === this._socket.OPEN){
                this._socket.close();
            }
            this._socket = null;
            this._completionHandlers = null;
        }
    }

    getNextID(){
        return this._nextID++;
    }

    onMessage(message){
        //TODO
    }

    makeResponse(id, result, error){
        const response = {
            id,
            jsonrpc: '2.0'
        };

        if(error){
            response.error = error;
        }else{
            response.result = result;
        }

        return response;
    }

    sendResponseText()

    didRecieveMessage(message, sendResponseText){
        const json = JSON.parse(message);
        const sendResponseInternal = (result, error) => {
            const response = this.makeResponse(json.id, result, error);
            sendResponseText(JSON.stringify(response));
        }

        const sendResponse = (result, error) => {
            try{
                sendResponseInternal(result, error);
            }catch(firstError){
                try{
                    sendResponseInternal(null, "Could not encode response");
                }catch(secondError){
                    console.log(`Could not report response encoding failure: ${secondError}`);
                }
            }
        }

        try{
            if(json.jsonrpc !== '2.0'){
                throw new Error('unrecognized JSON-RPC version string');
            }
            if(json.method){
                //
            }
        }
    }

    didRecieveRequest(request, sendResult){
        const {method, params} = request;
        if(typeof method !== 'string'){
            throw new Error('method value missing or not a string');
        }
        this.didRecieveCall(method, params || {}, sendResult);
    }

    didRecieveCall(method, params, completion){
        switch(method){
            case 'pingMe':
                
        }
    }
}

module.exports = Session;