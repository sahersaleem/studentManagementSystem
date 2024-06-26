#! /usr/bin/env node
import inquirer from "inquirer";
class Person {
    name;
    age;
    constructor(name, age) {
        (this.name = name), (this.age = age);
    }
    getName(name) {
        return this.name;
    }
}
class Student extends Person {
    courses = [];
    contactinfo;
    gender;
    address;
    id;
    static count = 0;
    constructor(name, age, contactinfo, gender, address) {
        super(name, age);
        (this.address = address),
            (this.name = name),
            (this.age = age),
            (this.contactinfo = contactinfo),
            (this.gender = gender);
        this.id = ++Student.count;
    }
    registeredForCourses(course) {
        this.courses.push(course);
    }
}
class Instructor extends Person {
    gender;
    salary;
    static count = 0;
    courses = [];
    id;
    constructor(name, age, gender, salary) {
        super(name, age);
        (this.gender = gender),
            (this.salary = salary),
            (this.id = ++Instructor.count);
    }
    assignCourses(course) {
        this.courses.push(course);
    }
}
class Course {
    static count = 0;
    name;
    id;
    fees;
    student = [];
    instructor = [];
    timings;
    constructor(name, timings, fees) {
        this.fees = fees;
        this.id = ++Course.count;
        this.timings = timings;
        this.name = name;
    }
    addStudent(student) {
        this.student.push(student);
        student.registeredForCourses(this);
    }
    addInstructor(instructor) {
        this.instructor.push(instructor);
        instructor.assignCourses(this);
    }
}
let studentsArray = [];
let coursesArray = [];
let instructorArray = [];
do {
    const functionPerform = await inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Which operation you want to perform?",
            choices: [
                "Add Student",
                "Add Instructor",
                "Add Courses",
                "Edit",
                "Delete",
                "View",
            ],
        },
    ]);
    const { options } = functionPerform;
    if (options == "Add Courses") {
        const courseadd = await inquirer.prompt([
            {
                type: "string",
                name: "coursename",
                message: "Enter course name:",
            },
            {
                type: "input",
                name: "coursetimings",
                message: "Enter course timings:",
            },
            {
                type: "number",
                name: "coursefees",
                message: "Enter course fees:",
            },
        ]);
        const { coursename, coursetimings, coursefees } = courseadd;
        const course = new Course(coursename, coursetimings, coursefees);
        console.log(`Course added successfully`);
        coursesArray.push(course);
        console.table(course);
    }
    if (options == "Add Student") {
        const studentAdd = await inquirer.prompt([
            {
                type: "string",
                name: "studentName",
                message: "Enter student name : ",
            },
            {
                type: "number",
                name: "studentAge",
                message: "Enter student age :",
            },
            {
                type: "input",
                name: "studentAddress",
                message: "Enter student Address",
            },
            {
                type: "input",
                name: "studentcontactinfo",
                message: "Enter student contactinfo",
            },
            {
                type: "list",
                name: "studentgender",
                message: "Select gender : ",
                choices: ["male", "female"],
            },
        ]);
        const { studentName, studentAge, studentAddress, studentcontactinfo, studentgender, } = studentAdd;
        const student1 = new Student(studentName, studentAge, studentcontactinfo, studentgender, studentAddress);
        studentsArray.push(student1);
        console.log("Student added Successfully!");
        console.table(student1);
    }
    if (options == "Add Instructor") {
        const addInstructor = await inquirer.prompt([
            {
                type: "string",
                name: "instructorName",
                message: "Enter instructor name : ",
            },
            {
                type: "number",
                name: "instructorAge",
                message: "Enter instructor age : ",
            },
            {
                type: "number",
                name: "instructorSalary",
                message: "Enter instructor salary :",
            },
            {
                type: "list",
                name: "instructorGender",
                message: "Select instructor gender:",
                choices: ["male", "female"],
            },
        ]);
        const { instructorAge, instructorSalary, instructorGender, instructorName, } = addInstructor;
        const instructor = new Instructor(instructorName, instructorAge, instructorGender, instructorSalary);
        console.log("Instructor added successfully!");
        instructorArray.push(instructor);
        console.table(instructor);
    }
    if (options == "Edit") {
        const editOperation = await inquirer.prompt([
            {
                type: "list",
                name: "editOptions",
                message: "Which operation you want to perform",
                choices: ["Edit student", "Edit Instructor", "Edit Courses"],
            },
        ]);
        const { editOptions } = editOperation;
        if (editOptions == "Edit student") {
            console.table(studentsArray);
            const editStudent = await inquirer.prompt([
                {
                    type: "number",
                    name: "studentID",
                    message: "Enter the id you want to edit : ",
                },
            ]);
            const { studentID } = editStudent;
            const findStudentIndex = studentsArray.findIndex((student) => student.id == studentID);
            if (findStudentIndex !== -1) {
                const currentObj = studentsArray[findStudentIndex];
                const editStudent = await inquirer.prompt([
                    {
                        type: "string",
                        name: "name",
                        message: "Enter  name : ",
                        default: currentObj.name,
                    },
                    {
                        type: "number",
                        name: "age",
                        message: "Enter age :",
                        default: currentObj.age,
                    },
                    {
                        type: "input",
                        name: "contactInfo",
                        message: "Enter contact Info",
                        default: currentObj.contactinfo,
                    },
                    {
                        type: "input",
                        name: "address",
                        message: "Enter contact Info",
                        default: currentObj.address,
                    },
                    {
                        type: "list",
                        name: "gender",
                        message: "Select gender :",
                        choices: ["male", "female"],
                        default: currentObj.gender,
                    },
                ]);
                const { name, age, contactInfo, address, gender } = editStudent;
                studentsArray[findStudentIndex].name = name;
                studentsArray[findStudentIndex].gender = gender;
                studentsArray[findStudentIndex].contactinfo = contactInfo;
                studentsArray[findStudentIndex].address = address;
                console.log("Your updated students list :");
                console.table(studentsArray);
            }
        }
        if (editOptions == "Edit Instructor") {
            console.table(instructorArray);
            const editInstructorId = await inquirer.prompt([
                {
                    type: "number",
                    name: "instructorId",
                    message: "Enter instructor id you want to edit",
                },
            ]);
            const findInstructorIndex = instructorArray.findIndex((instructor) => instructor.id);
            console.log(findInstructorIndex);
            if (findInstructorIndex !== -1) {
                const currentObj2 = instructorArray[findInstructorIndex];
                const editInstructor = await inquirer.prompt([
                    {
                        type: "string",
                        name: "instructorName",
                        message: "Enter instructor name",
                        default: currentObj2.name,
                    },
                    {
                        type: "number",
                        name: "instructorAge",
                        message: "Enter instructor age ",
                        default: currentObj2.age,
                    },
                    {
                        type: "number",
                        name: "instructorAge",
                        message: "Enter instructor age ",
                        default: currentObj2.age,
                    },
                    {
                        type: "number",
                        name: "instructorSalary",
                        message: "Enter instructor salary ",
                        default: currentObj2.salary,
                    },
                    {
                        type: "list",
                        name: "instructorGender",
                        message: "Select instructor gender : ",
                        default: currentObj2.gender,
                        choices: ["male", "Female"],
                    },
                ]);
                const { instructorAge, instructorName, instructorSalary, instructorGender, } = editInstructor;
                instructorArray[findInstructorIndex].name = instructorName;
                instructorArray[findInstructorIndex].age = instructorAge;
                instructorArray[findInstructorIndex].salary = instructorSalary;
                instructorArray[findInstructorIndex].gender = instructorGender;
                console.log("Your updated instructor list");
                console.table(instructorArray);
            }
        }
        if (editOptions == "Edit Courses") {
            console.table(coursesArray);
            const courseEdit = await inquirer.prompt([
                {
                    type: "number",
                    name: "editCourseId",
                    message: "Enter the course Id you wants to edit ",
                },
            ]);
            const { editCourseId } = courseEdit;
            const indexOfEditCourse = coursesArray.findIndex((course) => course.id == editCourseId);
            if (indexOfEditCourse !== -1) {
                const currentObj3 = coursesArray[indexOfEditCourse];
                const editCourseAnswers = await inquirer.prompt([
                    {
                        type: "string",
                        name: "editCourseName",
                        message: "Enter Course Name : ",
                        default: currentObj3.name,
                    },
                    {
                        type: "string",
                        name: "editCourseTimings",
                        message: "Enter Course Timings: ",
                        default: currentObj3.timings,
                    },
                ]);
                const { editCourseName, editCourseTimings } = editCourseAnswers;
                coursesArray[indexOfEditCourse].name = editCourseName;
                coursesArray[indexOfEditCourse].timings = editCourseTimings;
                console.table(coursesArray);
            }
            else {
                console.log("Please Enter Some Courses");
            }
        }
    }
    if (options == "View") {
        const viewoptions = await inquirer.prompt([
            {
                type: "list",
                name: "viewOptionsList",
                message: "Which operation you want to perform ",
                choices: ["View Student", "View Instructor", "View Courses"],
            },
        ]);
        const { viewOptionsList } = viewoptions;
        //-------------------------------------------------------------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------------------------------------------------
        if (viewOptionsList == "View Student") {
            console.log("-----------------Available Student------------------");
            console.table(studentsArray);
            const viewstudent = await inquirer.prompt([
                {
                    type: "number",
                    name: "studentId2",
                    message: "Enter student id to enroll in Courses :",
                },
            ]);
            console.log("---------------Available Courses to enroll---------------------");
            console.table(coursesArray);
            const showStudentInCourses = await inquirer.prompt([
                {
                    type: "list",
                    name: "courseSelect",
                    message: "Select course in which you wants to enroll : ",
                    choices: coursesArray.map((course) => course.name),
                },
            ]);
            const { studentId2 } = viewstudent;
            const { courseSelect } = showStudentInCourses;
            const findStudentIndex2 = studentsArray.findIndex((student) => student.id == studentId2);
            if (findStudentIndex2 !== -1) {
                const findCoursesNameIndex = coursesArray.findIndex((course) => course.name == courseSelect);
                if (!studentsArray[findStudentIndex2].courses.includes(coursesArray[findCoursesNameIndex])) {
                    console.log("Course Information");
                    coursesArray[findCoursesNameIndex].addStudent(studentsArray[findStudentIndex2]);
                    console.table(coursesArray);
                    console.log("Student Enrolled Successfully");
                    console.table(studentsArray);
                }
                else {
                    console.log("Alreaady enrolled");
                }
            }
        }
        if (viewOptionsList == "View Instructor") {
            console.log("-----------------Available Instructor------------------");
            console.table(instructorArray);
            const instructorView = await inquirer.prompt([
                {
                    type: "number",
                    name: "viewInstructorId",
                    message: "Enter instructor Id to perform action : ",
                },
                {
                    type: "list",
                    name: "assignCourses",
                    message: "Select course to assign instructor :",
                    choices: coursesArray.map((course) => course.name),
                },
            ]);
            const { viewInstructorId, assignCourses } = instructorView;
            const findViewInstructorId = instructorArray.findIndex((instructor) => instructor.id == viewInstructorId);
            if (findViewInstructorId !== -1) {
                const findCourseName2 = coursesArray.findIndex((course) => course.name == assignCourses);
                if (!instructorArray[findViewInstructorId].courses.includes(coursesArray[findCourseName2])) {
                    console.log("Course information");
                    coursesArray[findCourseName2].addInstructor(instructorArray[findViewInstructorId]);
                    console.table(coursesArray[findCourseName2]);
                    console.log("Instructor added successfully!");
                    console.table(instructorArray);
                }
                else {
                    console.log("Course Already Assigned");
                }
            }
        }
        if (viewOptionsList == "View Courses") {
            console.log("-----------------Available Courses------------------");
            console.table(coursesArray);
            const addStudAndInstruc = await inquirer.prompt([
                {
                    type: "list",
                    name: "studentAndInstructor",
                    message: "Select operartion you want to perform",
                    choices: ["Add Student", "Add teacher"],
                },
            ]);
            const { studentAndInstructor } = addStudAndInstruc;
            if (studentAndInstructor == "Add Student") {
                console.table(coursesArray);
                const addStudentInCourses = await inquirer.prompt([
                    {
                        type: "number",
                        name: "courseId",
                        message: "Enter course Id : ",
                    },
                    {
                        type: "list",
                        name: "addstudentChoices",
                        message: "Select student to enroll in courses : ",
                        choices: studentsArray.map((student) => student.name),
                    },
                ]);
                const { courseId, addstudentChoices } = addStudentInCourses;
                const findIndexofCourse = coursesArray.findIndex((course) => course.id == courseId);
                if (findIndexofCourse !== -1) {
                    const findStudentName2 = studentsArray.findIndex((student) => student.name == addstudentChoices);
                    if (!coursesArray[findIndexofCourse].student.includes(studentsArray[findStudentName2])) {
                        coursesArray[findIndexofCourse].addStudent(studentsArray[findStudentName2]);
                        console.table(coursesArray);
                        console.log("Student added successfully!");
                        console.table(studentsArray);
                    }
                    else {
                        console.log("Student already added!");
                    }
                }
            }
            if (studentAndInstructor == "Add teacher") {
                console.table(coursesArray);
                const addTeacherInCourses = await inquirer.prompt([
                    {
                        type: "number",
                        name: "courseId",
                        message: "Enter course Id : ",
                    },
                    {
                        type: "list",
                        name: "addTeacherChoices",
                        message: "Select Teacher to add in courses : ",
                        choices: instructorArray.map((student) => student.name),
                    },
                ]);
                console.table(instructorArray);
                const { courseId, addTeacherChoices } = addTeacherInCourses;
                const findIndexofCourse = coursesArray.findIndex((course) => course.id == courseId);
                if (findIndexofCourse !== -1) {
                    const findTeacherName = instructorArray.findIndex((teacher) => teacher.name == addTeacherChoices);
                    if (!coursesArray[findIndexofCourse].instructor.includes(instructorArray[findTeacherName])) {
                        coursesArray[findIndexofCourse].addInstructor(instructorArray[findTeacherName]);
                        console.table(coursesArray);
                        console.log("Instructor added successfully");
                        console.table(instructorArray);
                    }
                    else {
                        console.log("Instructor added Already!");
                    }
                }
            }
        }
    }
    if (options == "Delete") {
        const deleteOptions = await inquirer.prompt([
            {
                type: "list",
                name: "optionsForDelete",
                message: "Select action to perform :",
                choices: ["Student", "Instructor", "Courses"],
            },
        ]);
        const { optionsForDelete } = deleteOptions;
        if (optionsForDelete == "Student") {
            console.table(studentsArray);
            const deleteStudent = await inquirer.prompt([
                {
                    type: "number",
                    name: "deleteStudentId",
                    message: "Enter Student Id to delete : ",
                },
            ]);
            const { deleteStudentId } = deleteStudent;
            const deleteStudentfromArray = studentsArray.findIndex((student) => student.id === deleteStudentId);
            console.log("Student deleted successfully!");
            studentsArray.splice(deleteStudentfromArray, 1);
            console.table(studentsArray);
        }
        if (optionsForDelete == "Instructor") {
            console.table(instructorArray);
            const deleteInstructor = await inquirer.prompt([
                {
                    type: "number",
                    name: "deleteInstructorId",
                    message: "Enter instructor Id to delete : ",
                },
            ]);
            const { deleteInstructorId } = deleteInstructor;
            const deleteInstructorfromArray = instructorArray.findIndex((instructor) => instructor.id === deleteInstructorId);
            console.log("Instructor deleted successfully!");
            instructorArray.splice(deleteInstructorfromArray, 1);
            console.table(instructorArray);
        }
        if (optionsForDelete == "Courses") {
            console.table(coursesArray);
            const deleteCourses = await inquirer.prompt([
                {
                    type: "number",
                    name: "deleteCoursesId",
                    message: "Enter Course Id to delete : ",
                },
            ]);
            const { deleteCoursesId } = deleteCourses;
            const deleteCoursesfromArray = coursesArray.findIndex((course) => course.id === deleteCoursesId);
            console.log("Course deleted successfully!");
            coursesArray.splice(deleteCoursesfromArray, 1);
            console.table(deleteCoursesfromArray);
        }
    }
    var restart = await inquirer.prompt([
        {
            type: "input",
            name: "again",
            message: "Do you want to continue",
            default: "y/n",
        },
    ]);
} while (restart.again == "y");
