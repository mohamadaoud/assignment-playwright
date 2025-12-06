import { test } from "@playwright/test"

test("Get student", async ({request}) => {

    const headers =  {API_KEY: "HELLOME"}

    const response = await request.get("https://test-379574553568.us-central1.run.app/student", {headers: headers})
    console.log(await response.json())
})