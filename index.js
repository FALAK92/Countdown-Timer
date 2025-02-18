#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
const response = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Please enter the amount of second.",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter valid number";
        }
        else if (input > 60) {
            return "Seconds must be in 60";
        }
        else {
            return true;
        }
    }
});
let input = response.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime, currentTime);
        if (timeDifference <= 0) {
            console.log("Timer has expired!");
            process.exit();
        }
        const minute = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const second = Math.floor(timeDifference % 60);
        console.log(`${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
