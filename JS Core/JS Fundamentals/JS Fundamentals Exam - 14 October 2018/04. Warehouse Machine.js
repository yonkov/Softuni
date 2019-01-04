function solve(input) {
    let warehouse = new Map();
    
    for (let item of input) {
        let inputParams = item.split(', ').filter(a => a !== '');
        let [command, brand, coffee, date, quantity] = inputParams;
        
        if (command=="IN") {
            if (!warehouse.has(brand)) {
                warehouse.set(brand, new Map());
            }
            
            if (!warehouse.get(brand).has(coffee)) {
                warehouse.get(brand).set(coffee, {date, quantity});
            }
            else{
                let oldDate =  warehouse.get(brand).get(coffee).date;
                if (date>oldDate) {
                    warehouse.get(brand).set(coffee, {date, quantity});
                }
                else if(date==oldDate){
                    let oldQuantity = +warehouse.get(brand).get(coffee).quantity;
                    let newQuantity = +quantity + oldQuantity
                    warehouse.get(brand).set(coffee, {date, quantity: newQuantity});
                    
                }
            }
        }
        else if(command==='OUT'){
            if (warehouse.has(brand) && warehouse.get(brand).has(coffee)) {
                let oldDate = warehouse.get(brand).get(coffee).date;
                let oldQuantity = warehouse.get(brand).get(coffee).quantity;
                if (oldDate>date &&oldQuantity>+quantity) {
                    warehouse.get(brand).get(coffee).quantity -=quantity;
                }
            }
        }
        else if (item==="REPORT") {
            let output=">>>>> REPORT! <<<<<\n";
            for (let [key, value] of [...warehouse]) {
                output+=`Brand: ${key}:\n`;
                for (let [k,v] of value) {
                    output+=`-> ${k} -> ${v.date} -> ${v.quantity}.\n`; 
                }
            }
            console.log(output);
        }
        else if (item==="INSPECTION") {
            let output=">>>>> INSPECTION! <<<<<\n";
            let sorted = [...warehouse].sort((a, b) => a > b);
            
            for (let [key, value] of [...sorted]) {
                output+=`Brand: ${key}:\n`;
                for (let [k,v] of [...value].sort((a, b) => b[1].quantity - a[1].quantity)) {
                     output+=`-> ${k} -> ${v.date} -> ${v.quantity}.\n`; 
                }
            }
            console.log(output);
        }
    }
}
