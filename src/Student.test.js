import { render, unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
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

it("calculates and displays average", () => {
  // render single student
  act(() => {
    render(<Student student={sample} />, container);
  });

  // test
  expect(container.querySelector(".student-average").textContent).toBe(
    "Average: 88.875%"
  );
});

it("should initially hide grade list", () => {
  act(() => {
    render(<Student student={sample} />, container);
  });

  const grades = container.querySelector(".grades");

  expect(grades).toBe(null);
});

it("should toggle grades list on button click", () => {
  act(() => {
    render(<Student student={sample} />, container);
  });

  const button = container.querySelector(".grades-button");
  let grades = container.querySelector(".grades");

  //should be hidden
  expect(grades).toBe(null);

  //should show
  fireEvent.click(button);
  grades = container.querySelector(".grades");

  expect(grades).not.toBe(null);

  //should be hidden again
  fireEvent.click(button);
  grades = container.querySelector(".grades");
  expect(grades).toBe(null);
});
