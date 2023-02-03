# Employee-Tracker

## Technology Used

- Git  [https://git-scm.com/](https://git-scm.com/)
- JavaScript[https://www.w3schools.com/js/default.asp]
(https://www.w3schools.com/js/default.asp)
- Node.JS [https://nodejs.org/en/](https://nodejs.org/en/)
- Inquirer [https://www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer)
- MySql [https://www.mysql.com/](https://www.mysql.com/)
- MySql2 [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)
- console.table [https://www.npmjs.com/package/console.table](https://www.npmjs.com/package/console.table)

## Description

This app can allow new business owners to organize, structure, and add new and existing employees. 

## Usage Instruction

First run in your terminal

`npm install`

to install all the dependencies needed to properly run the app. Then run 

`node index.js`

to start the application and you will be presented with questions of what you would like to do. When you are finish adjusting your company you can close the app and everything will be saved.

Below is a link to a video of how the app runs:

https://www.youtube.com/watch?v=WFqOpwQTTso

## Learning Points

This assignment allowed me to debug situations thats were mind boggling. At one point I ran into a situation where I had an infinite loop. I realized that I was calling on the start point not at the end of each function, but at the end of the startApp() causing an infinite loop and a Promise Hell, eventually crashing the app. When I moved the callback to the start of startApp to the end of each functions, I no longer ran into the same issue. I also ran into a data leakage somehow and only solved the issue by reverting my saved file.

## Author Info

Milton Ly

Github https://github.com/MiltonLy