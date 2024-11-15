# B5-Backend-Server
This project implements a web server using Node.js and the Express framework to manage and serve student data for various classes organized by semester and year. The server's architecture is designed to access class information, providing users to retrieve and search for student details based on class ID, semester/year, or individual student information.
The server directory structure consists of class ID folders (e.g., DATA236), each containing files corresponding to different semesters/years (e.g., Winter2024.txt). Each file contains records for students enrolled in that class, including their names, student IDs, and email addresses.

Directory Hierarchy
'''plaintext
project-directory/
├── data/
└── DATA228/
│       ├── Winter2024.txt
│       └── Spring2025.txt
│   └── DATA236/
│       └── Spring2025.txt
├── server.js
├── package-lock.json
└── package.json
'''

Within the data directory contains each classID folders such as DATA228 and DATA236. Within each classID folder are the .txt files (e.g., Winter2024.txt) for each different semester. These files contain a student per row in the format: lastName, FirstName ID email. The server.js file contains all the functions for all the different features such as get the classID and Semesters and Searching function. Package.json file contains the list of dependencies and scripts. The package.lock.json specifies their respective versions to ensure consistent installations in different environments.

Technologies
JavaScript
NodeJS
Express

Getting Started
Prerequisites
Before you begin, ensure you have the following installed on your system:
A modern web browser (e.g., Chrome, Firefox, Safari).
A text editor (e.g., Visual Studio Code) to modify the code if needed.
Installation of NodeJS and Express
Running the Project
Instantiate the NodeJs Web Server by running node server.js in the terminal
Make sure that all the downloaded files from the directory hierarchy are in the current server directory.
Open up the webpage on the local host web server by entering localhost:8081 into the URL of the web browser. 
