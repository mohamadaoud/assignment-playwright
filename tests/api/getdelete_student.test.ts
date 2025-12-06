import { test, expect } from "@playwright/test";

test("Delete created student", async ({ request }) => {
  const headers = { API_KEY: "HELLOME" };
  const url = "https://test-379574553568.us-central1.run.app/student";

  const student = {
    name: "Mohamad",
    age: 20,
    grade: "A",
  };

  // Create student
  const createResponse = await request.post(url, { headers, data: student });
  expect(createResponse.ok()).toBeTruthy();

  const createdStudent = await createResponse.json();
  console.log(createdStudent);

  const studentId = createdStudent.student_id;
  console.log(studentId);

  // Delete student
  const deleteResponse = await request.delete(`${url}/${studentId}`, { headers });
  expect(deleteResponse.ok()).toBeTruthy();

  const deleteResult = await deleteResponse.json();
  console.log(deleteResult);
});