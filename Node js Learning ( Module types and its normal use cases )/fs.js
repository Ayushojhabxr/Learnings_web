const fs = require('fs');

const math = require ("./Localmodule.js")
const moment = require('moment');
const math2 = require('./TryingotherwayforLOcalmodule.js')

//  fs module

// fs too create and read files
fs.writeFileSync('js.txt', 'Hello, this is Ayush and this is my file content i am writing using fs module.');
const fileContent = fs.readFileSync('js.txt', 'utf8');
console.log(fileContent);



// local module use 
console.log("Addition: " + math.Add(5, 3));
console.log("Subtraction: " + math.subtract(5, 3));
console.log("Multiplication: " + math.multiply(5, 3));
console.log("Division: " + math.divide(5, 3));



// date formating using moments
// Public holidays
const holidays = [
  '2025-01-26',
  '2025-08-15',
  '2025-10-02'
];

function getNextWorkingDays(count) {
    let days = [];
    let current = moment();

    while (days.length < count) {
        const isWeekend = current.day() === 0 || current.day() === 6;
        const isHoliday = holidays.includes(current.format('YYYY-MM-DD'));

       
        if(!isWeekend && !isHoliday){
            days.push(current.format('YYYY-MM-DD'));
        }
        current.add(1, 'days');
    }

    return days;
}

console.log(getNextWorkingDays(10)); // Get next 10 working days




// using second way jha global object bnake andr function define krke fir global obj ko export kra liya 

console.log("Addition using second way: " + math2.Add(5, 3));
console.log("Subtraction using second way: " + math2.Subtract(5, 3));
console.log("Multiplication using second way: " + math2.Multiply(5, 3));
console.log("Division using second way: " + math2.Divide(5, 3));





fs.writeFileSync('js.pdf', 'Hello, this is Ayush and this is my file content i am writing using fs module.');
const fileContents = fs.readFileSync('js.pdf', 'utf8'); // without utf if we try to read it will give Buffer rather than text so formating use utf-8
console.log(fileContents);