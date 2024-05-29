import {faker, fakerTH} from "@faker-js/faker";
import { count } from "console";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const dataSchema = require('./sitest.json');


  const populateData = (node) => {
    const agencies = [];
    if (Array.isArray(node)) 
    {
        node.forEach(child => populateData(child));
    } 
    else if (typeof node === 'object' && node !== null) 
    {
        if (node.name && node.name !== '-') 
        {
            
        }
        for (const key in node) {
            
            if (node.hasOwnProperty(key)) 
            {
                if(key === 'agency') //14 rows
                    {
                        //agencies pushed
                        
                        /*
                        console.log("/////////////KEY///");
                        //console.log(node);
                        //console.log(key);
                        console.log(node[key].name.value);
                        console.log(typeof(node[key]));
                        console.log("++++++++++++END2+++");
                        */
                        
                        if (Array.isArray(node)) 
                        {
                            var a= node.forEach(child => populateData(child));
                            console.log(a);
                            console.log("+++++");
                        }
                        else
                        {
                            console.log(typeof(node[key]));
                            //
                            populateData(node[key]);
                        }    

                    }
                populateData(node[key]);
            }  
        }
    }
  };
  

  populateData(dataSchema);

  