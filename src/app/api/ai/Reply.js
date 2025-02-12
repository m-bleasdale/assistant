class Reply {
    constructor(response) {
        this.status = undefined;
        this.text = undefined;
        this.actions = undefined;
        this.error = undefined;

        this.InterpretResponse(response);

        this.date = new Date().toLocaleString();
    }

    InterpretResponse(content) {
        try {

            let text = content;
    
            const ActionsRegex = /<Actions>(.*?)<\/Actions>/s;
            const ActionsContent = text.match(ActionsRegex);
            const actions = ActionsContent ? ActionsContent[1] : null; //0 is whole string incl tags, 1 is just the stuff inside (return null if 1 undef)
    
            this.status = "success";
            this.error = null;
            this.text = text;
            this.actions = JSON.parse(actions);
            return;

        }
        catch (error){
            this.status = "failed";
            this.error = error;
            return;
        }
    }

}

export default Reply;