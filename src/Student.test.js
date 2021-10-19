import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Student from "./Student";

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

it("calculates and displays average", () => {
  const sample = {
    city: "Fushë-Muhurr",
    company: "Yadel",
    email: "iorton0@imdb.com",
    firstName: "Ingaberg",
    grades: ["78", "100", "92", "86", "89", "88", "91", "87"],
    id: "1",
    lastName: "Orton",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
    skill: "Oracle",
  };

  // render single student
  act(() => {
    render(<Student student={sample} />, container);
  });

  // test
  expect(container.querySelector("#average1").textContent).toBe(
    "Average: 88.875%"
  );
});
