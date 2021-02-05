async function  Session(socket) {
    this._socket = socket;
    this._NetworkProtocolVersion = "1.2";
    
    async function didRecieveCall(method) {
        switch(method){
            case "getVersion":
                await OfflineAudioCompletionEvent()
        }
    }
}