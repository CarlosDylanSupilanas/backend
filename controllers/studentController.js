import * as studentService from '../services/studentService.js'

export const fetchAllStudents = async (request, response) => {
    const student = await studentService.fetchAllStudents();
    response.status(200).json(student);
}


export const createStudent = async (req, res) =>{
    const {name, srcode, program} = req.body;
    const student = {name, srcode, program};

    try {
        const studentId = await studentService.createStudent(student);
        res.status(200).json({
            success: true,
            messages: studentId
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:"Internal Server Error"
        });
    }
}


// new
export const editstudent = async (req, res) =>{
    const {name, srcode, program } = req.body;
    const{ id } = req.params;
    const student = {id: parseInt(id), name, srcode, program};

    try {
        const updatedStudent = await studentService.updateStudent(student);
        res.status(200).json({
            success: true,
            messages: updatedStudent
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:"Internal Server Error"
        });
    }
}

//delete
export const deleteStudent = async (req, res) =>{
    const{ id } = req.params;
 
    try {
        const deletedStudent = await studentService.deleteStudent(parseInt(id));
        res.status(200).json({
            success: true,
            messages: deletedStudent
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:"Internal Server Error"
        });
    }
}