import { render, unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Tags from "./Tags";

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

//will not happen as it is checked in Student but best add redundancy
it("should display nothing with empty list", () => {
  //arrange
  const tags = [];

  act(() => {
    render(<Tags tags={tags} />, container);
  });

  expect(container.querySelector(".tag-list")).toBeNull();
});

it("should contain 1 element", () => {
  //arrange
  const tags = ["test"];

  act(() => {
    render(<Tags tags={tags} />, container);
  });

  const amount = container.querySelectorAll(".tag");
  expect(amount.length).toBe(1);
});

it("should contain 5 elements", () => {
  //arrange
  const tags = ["test", "another test", "testing 3", "4th tag", "5th"];

  act(() => {
    render(<Tags tags={tags} />, container);
  });

  const amount = container.querySelectorAll(".tag");
  expect(amount.length).toBe(5);
});

it("should contain the tag 'warning'", () => {
  //arrange
  const tags = ["test", "another test", "warning", "4th tag", "5th"];

  act(() => {
    render(<Tags tags={tags} />, container);
  });

  const amount = container.querySelectorAll(".tag");
  expect(amount[2].textContent).toMatch(/warning/);
  expect(amount[2].textContent).not.toMatch(/waing/);
});
