//JS module for rememembering user data between sessions/levels
import chica from '../sprites/chica/chica.js';

const system = {
    
    /**
     * Initialize storage object
     * Checks to see if the game is already storing data.
     * If so, it loads the old data, if not, it creates a new object
     * @param null
     * @return null
    **/
    initialize() {
        this.version = '1.1';
        
        if(!window.localStorage){
            alert('Please update to a modern browser, such as the most recent builds of Chrome, Firefox, Safari, or Edge');
            throw new Error('LocalStorage not supported');
        }
        
        //Load data if it exists
        if(window.localStorage.userData){
            this.userData = JSON.parse(window.localStorage.userData);
        }
        
        //Replace user data if it's out of date
        if ( (window.localStorage.userData && this.userData.version !== this.version) || (!window.localStorage.userData) ) {
            console.log('Creating new userData');
            this.userData = {
                version: this.version,
                currentLevel: "Intro",
                actions: [{
                    name: "Attack",
                    children: [{
                        name: "Tail Whap",
                        dealsDamage: 17,
                        reducesDamage: 0,
                        restoresHealth: 0
                    }, ]
                }, {
                    name: "Defend",
                    children: [{
                        name: "Defend",
                        dealsDamage: 0,
                        reducesDamage: 9,
                        restoresHealth: 0,
                    }, ]
                }, {
                    name: "Special",
                    children: [{
                        name: "Cuteness",
                        dealsDamage: 8,
                        reducesDamage: 0,
                        restoresHealth: 7,
                    }, ]
                }, {
                    name: "Items",
                    children: [{
                        name: 'Doggie Treat',
                        dealsDamage: 0,
                        reducesDamage: 0,
                        restoresHealth: 15,
                        supply: 1,
                        useItem:function(){ this.supply-- },
                    }]
                }, ],
                
            };
        }
        
        //JSON doesn't support functions
        this.userData.actions[3].children.forEach(child => child.useItem = function(){ child.supply-- });
        
        //Add reset button TODO remove for final build
        const button = document.createElement('BUTTON');
        button.innerHTML = "RESET";
        button.onclick = () => {
            console.log(this);
            this.userData = {};
            this.save();
            window.location = window.location;
        };
        document.getElementById('body').appendChild(button);
        
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