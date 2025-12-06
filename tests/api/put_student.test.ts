import { expect, test } from "@playwright/test"

test("Update student", async ({request}) => {

    const headers =  {API_KEY: "HELLOME"}
    const url = "https://test-379574553568.us-central1.run.app/student";

    const student = {
    name: "Mohamad",
    age: 42,
    grade: "A",
  };

    //Create student
    const response = await request.post(url, {headers: headers , data:student})
    console.log(await response.json())

    //Get the student ID from creation
    const createdStudent = await response.json();
    const studentId = createdStudent.student_id;


    //Put student
    student.name = "Moe"
    const responseUpdated = await request.put(`${url}/${studentId}`, {headers: headers , data:student})
    const responseJson = await responseUpdated.json()
    console.log(responseJson)

    expect(responseJson.status).toBe('OK')
})