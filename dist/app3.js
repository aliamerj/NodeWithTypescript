"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const javascript = {
    id: 1,
    name: "javascript",
    available: true
};
const node = {
    id: 2,
    name: "node",
    available: true
};
let allCourses = [node, javascript];
// -- command
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('hello world :) ');
});
app.get('/api/courses', (req, res) => res.send([1, 2, 3]));
app.get('/api/courses/:year/:month/:day', (req, res) => res.send(req.params));
// read query
app.get('/api/name/:year/:month/:day', (req, res) => res.send(req.query));
app.get('/api/c/:id', getCourse);
app.get('/api/c', (req, res) => res.send(allCourses));
//-----
app.post('/api/add/c', addCourse);
//-----
app.put('/api/update/c/:id', updateCourse);
// --- 
app.delete('/api/delete/:id', deleteCourse);
///--  functions
function getCourse(req, res) {
    const course = findCourse(req, res);
    if (typeof course == 'object')
        res.send(course);
}
function addCourse(req, res) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().strict().trim().min(3).max(10).required()
    });
    const isValid = schema.validate(req.body);
    if (isValid.error) {
        res.status(400).send(isValid.error.details[0].message);
        return;
    }
    const newCores = {
        id: allCourses.length + 1,
        name: req.body.name,
        available: false
    };
    allCourses.push(newCores);
    res.send(newCores);
}
function updateCourse(req, res) {
    const course = findCourse(req, res);
    if (typeof course == 'object') {
        addCourse(req, res);
        course.name = req.body.name;
        res.send(course);
    }
}
function deleteCourse(req, res) {
    const course = findCourse(req, res);
    if (typeof course == 'object') {
        const index = allCourses.indexOf(course);
        allCourses.splice(index, 1);
        res.send(course);
    }
}
function findCourse(req, res) {
    const course = allCourses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send(`the course with id ${req.params.id} is not found`);
    else
        return course;
}
app.listen(3000, () => console.log('list on port 3000....'));
