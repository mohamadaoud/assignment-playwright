import test from "@playwright/test"

test("Create and Get student", async ({request}) => {

    const headers =  {API_KEY: "HELLOME"}

    const student = {
        name: "Mohamad",
        age: 20,
        grade: "A"
    }
    const response = await request.post("https://test-379574553568.us-central1.run.app/student", {headers: headers, data:student})
    console.log(await response.json())
    const createdStudent = await response.json()
    const studentId = createdStudent.student_id

    console.log(studentId)

    const responseStudent = await request.get(`https://test-379574553568.us-central1.run.app/student/${studentId}`, {headers: headers})

    console.log(await responseStudent.json())
})