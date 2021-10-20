import { fireEvent, queryByPlaceholderText } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Search from "./Search";

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
  students: [
    {
      firstName: "Ingaberg",
      id: "1",
      lastName: "Orton",
    },
    {
      firstName: "Clarke",
      id: "2",
      lastName: "Boards",
    },
    {
      firstName: "Laurens",
      id: "3",
      lastName: "Romanet",
    },
  ],
};

it("updates on change", () => {
  const setStudents = (students) => {
    return students;
  };

  act(() => {
    render(
      <Search students={sample.students} setStudents={setStudents} />,
      container
    );
  });

  const searchInput = container.querySelector(".search-bar");
  fireEvent.change(searchInput, { target: { value: "test" } });

  expect(searchInput.value).toBe("test");
});

it("returns empty", () => {
  let list = [];
  const setStudents = (students) => {
    list = students;
  };

  act(() => {
    render(
      <Search students={sample.students} setStudents={setStudents} />,
      container
    );
  });

  const searchInput = container.querySelector(".search-bar");
  fireEvent.change(searchInput, { target: { value: "test" } });
  expect(list.length).toBe(0);
});

it("returns 1 result", () => {
  let list = [];
  const setStudents = (students) => {
    list = students;
  };

  act(() => {
    render(
      <Search students={sample.students} setStudents={setStudents} />,
      container
    );
  });

  const searchInput = container.querySelector(".search-bar");
  fireEvent.change(searchInput, { target: { value: "iNg" } });
  expect(list.length).toBe(1);
  expect(list[0].firstName).toBe("Ingaberg");

  fireEvent.change(searchInput, { target: { value: "Clarke boards" } });
  expect(list.length).toBe(1);

  fireEvent.change(searchInput, { target: { value: "roman" } });
  expect(list.length).toBe(1);
});

it("returns all results", () => {
  let list = [];
  const setStudents = (students) => {
    list = students;
  };

  act(() => {
    render(
      <Search students={sample.students} setStudents={setStudents} />,
      container
    );
  });

  const searchInput = container.querySelector(".search-bar");
  fireEvent.change(searchInput, { target: { value: "a" } });
  expect(list.length).toBe(3);

  fireEvent.change(searchInput, { target: { value: "E" } });
  expect(list.length).toBe(3);
});
