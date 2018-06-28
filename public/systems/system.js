//JS module for rememembering user data between sessions/levels

const system = {
    
    /**
     * Initialize storage object
     * Checks to see if the game is already storing data.
     * If so, it loads the old data, if not, it creates a new object
     * @param null
     * @return null
    **/
    initialize() {
        if(!window.localStorage){
            alert('Please update to a modern browser, such as the most recent builds of Chrome, Firefox, Safari, or Edge');
            throw new Error('LocalStorage not supported');
        }
        
        if(window.localStorage.userData){
            this.userData = JSON.parse(window.localStorage.userData);
        }else{
            this.userData = {
                testing:true,
                currentLevel: "Intro",
            };
        }
        
        window.onbeforeunload = this.save();
    },
    
    /**
     * Saves the session data to localStorage
     * Called on page close and with every level change
     * @param null
     * @return null
     **/
    save() {
        window.localStorage.userData = JSON.stringify(this.userData);
    },
    
    /**
     * Dynamically add modules to the global scope
     * @param urlArray-an array of URLs to dynamically import
     * @return null
    **/
    async addModules(urlArray){
        let importArray = await Promise.all(urlArray.map(url => {
            return import(url);
        }));
                
        //Add the modules to the global scope
        importArray.forEach(i => {
            let module;
            module = i.default;
            
            if(!window[i.default.name]){
                console.log('Added', i.default.name);
                window[i.default.name] = module;
            }
        });
    }
};

export default system;