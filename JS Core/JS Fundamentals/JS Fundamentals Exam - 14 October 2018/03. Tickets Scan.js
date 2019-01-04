function solve(input, command) {
    
let twoNamesRegex =/\s([A-Z]+[A-Za-z]*-[A-Z]+[A-Za-z]*)\s/gm;
let threeNamesRegex =/\s([A-Z]+[A-Za-z]*-[A-Z]+[A-Za-z]*\.-[A-Z][A-Za-z]*)\s/gm;
let fromToRegex =/\s([A-Z]{3}\/[A-Z]{3})/gm;
let companyRegex =/-\s([A-Z][a-zA-Z]*\*[A-Z][a-zA-Z]*)/gm;
let flightRegex =/\s([A-Z]{1,3}[\d]{1,5})\s/gm;
let name;
    if (input.match(fromToRegex) && input.match(flightRegex)) {

        let twoNamesGroups = twoNamesRegex.exec(input);
        let threeNamesGroups = threeNamesRegex.exec(input);
        
            if (input.match(twoNamesRegex)) {
                name = twoNamesGroups[1].replace(/-/g, ' ');
                
            } else {
                name = threeNamesGroups[1].replace(/-/g, ' ');
            }

        let fromToGroups = fromToRegex.exec(input)
        let fromTo = fromToGroups[1];
        let from = fromTo.substring(0, fromTo.indexOf('/'));
        let to = fromTo.substring(fromTo.indexOf('/') + 1);
        
        let flightGroups = flightRegex.exec(input)
        let flight = flightGroups[1];

        let companyGroups = companyRegex.exec(input)
        let company = companyGroups[1].replace(/\*/, " ");
            
        if (command === 'all') {
            console.log(`Mr/Ms, ${name}, your flight number ${flight} is from ${from} to ${to}. Have a nice flight with ${company}.`);
        } else if (command === 'flight') {
            console.log(`Your flight number ${flight} is from ${from} to ${to}.`);
            
        } else if (command === 'company') {
            console.log(`Have a nice flight with ${company}.`);
        } else if (command === 'name') {
            console.log(`Mr/Ms, ${name}, have a nice flight!`);
        }
    }

}
