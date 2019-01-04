class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }
 
    registerChild(name, grade, budget) {
        if (this.kids[grade] === undefined) {
            this.kids[grade] = [];
        }
 
        if (budget < this.budget) {
            if (this.kids[grade].length === 0) {
                delete this.kids[grade];
            }
 
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
       }
 
       for (const kid of this.kids[grade]) {
           if (kid.split('-')[0] === name) {
               return `${name} is already in the list for this ${this.destination} vacation.`;
           }
       }
 
       this.kids[grade].push(`${name}-${budget}`);
 
       return this.kids[grade];
   }
 
   removeChild(name, grade) {
       let kids = [];
       let removed = '';
       if (this.kids[grade] === undefined) {
           return `We couldn't find ${name} in ${grade} grade.`;
        }
 
        for (let i = 0; i < this.kids[grade].length; i++) {
            if (this.kids[grade][i].indexOf(name) < 0) {
                kids.push(this.kids[grade][i]);
 
            } else {
                removed = name;
            }
        }
 
        if (removed === '') {
            return `We couldn't find ${name} in ${grade} grade.`;
       }
 
       this.kids[grade] = kids;
 
       return this.kids[grade];
   }
 
   toString() {
       if (Object.keys(this.kids).length === 0) {
           return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
       }
 
       const unordered = this.kids;
       const ordered = {};
       Object.keys(unordered).sort().forEach(function(key) {
           ordered[key] = unordered[key];
       });
 
       let result = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;
       for (const gradeIndex in ordered) {
           if (ordered[gradeIndex].length === 0) {
               continue;
           }
 
           result += `Grade: ${gradeIndex}\n`;
 
           let kidIndex = 1;
           for (const kid of ordered[gradeIndex]) {
               result += `${kidIndex++}. ${kid}\n`;
           }
       }
 
       return result;
   }
 
   get numberOfChildren() {
       let children = 0;
       for (const grade in this.kids) {
           children += this.kids[grade].length;
       }
 
       return children;
   }
}
 
module.exports = Vacation;
