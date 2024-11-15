const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8081;

const dataDir = path.join(__dirname, 'data');

// Read as JSON format
app.use((req, res, next) => {
    res.json = (body) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(body, null, 2)); 
    };
    next();
});

// Read student data from a file
const readStudentData = (filePath) => {
    return fs.readFileSync(filePath, 'utf8')
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
            const [lastName, firstName, id, email] = line.split(/\s+/);
            return { 
                firstName, 
                lastName: lastName.replace(',', ''), 
                id, 
                email 
            }; 
        });
};

// Get list of student information
app.get('/:classId/:semester', (req, res) => {
    const { classId, semester } = req.params;
    const filePath = path.join(dataDir, classId, `${semester}.text`);

    if (fs.existsSync(filePath)) {
        const students = readStudentData(filePath);
        res.json(students);
    } else {
        res.status(404).send('File not found');
    }
});

// Search for a student by ID, name, or email
app.get('/search', (req, res) => {
    const { id, name, email } = req.query;
    const directories = fs.readdirSync(dataDir).filter(file => fs.statSync(path.join(dataDir, file)).isDirectory());
    let foundStudents = [];

    directories.forEach(classId => {
        const classPath = path.join(dataDir, classId);
        const files = fs.readdirSync(classPath).filter(file => file.endsWith('.text'));

        files.forEach(file => {
            const filePath = path.join(classPath, file);
            const students = readStudentData(filePath);

            students.forEach(student => {
                if (
                    (id && student.id === id) ||
                    (name && (student.lastName.toLowerCase().includes(name.toLowerCase()) || student.firstName.toLowerCase().includes(name.toLowerCase()))) ||
                    (email && student.email.toLowerCase() === email.toLowerCase())
                ) {
                    foundStudents.push({ ...student, classId, semester: file.replace('.text', '') });
                }
            });
        });
    });

    if (foundStudents.length > 0) {
        res.json(foundStudents);
    } else {
        res.status(404).send('Not found');
    }
});

// Get class IDs
app.get('/', (req, res) => {
    const directories = fs.readdirSync(dataDir).filter(file => fs.statSync(path.join(dataDir, file)).isDirectory());
    res.json(directories);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Get list of semester/year files for a class ID
app.get('/:classId', (req, res) => {
    const classId = req.params.classId;
    const classPath = path.join(dataDir, classId);

    if (fs.existsSync(classPath)) {
        const files = fs.readdirSync(classPath).filter(file => file.endsWith('.text'));
        res.json(files);
    } else {
        res.status(404).send('Class not found');
    }
});
