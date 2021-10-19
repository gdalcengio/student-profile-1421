// import { render, screen } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";

let container;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("sets state of student data from api", async () => {
  const sample = {
    students: [
      {
        city: "Fushë-Muhurr",
        company: "Yadel",
        email: "iorton0@imdb.com",
        firstName: "Ingaberg",
        grades: ["78", "100", "92", "86", "89", "88", "91", "87"],
        id: "1",
        lastName: "Orton",
        pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
        skill: "Oracle",
      },
    ],
  };

  //mocking fetch
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(sample) })
    );

  //use asynchronous act to replicate app
  await act(async () => {
    render(<App />, container);
  });

  //test name
  expect(container.querySelector("#name1").textContent).toBe(
    sample.students[0].firstName + " " + sample.students[0].lastName
  );

  //test email
  expect(container.querySelector("#email1").textContent).toBe(
    "Email: " + sample.students[0].email
  );

  //test company
  expect(container.querySelector("#company1").textContent).toBe(
    "Company: " + sample.students[0].company
  );

  //test skill
  expect(container.querySelector("#skill1").textContent).toBe(
    "Skill: " + sample.students[0].skill
  );

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
