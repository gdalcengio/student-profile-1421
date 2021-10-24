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
      tags: ["tag1", "tag2"],
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
      tags: ["tag1", "tag3"],
    },
  ],
};

it("should update on change", () => {
  const setStudents = (students) => {
    return students;
  };

  act(() => {
    render(
      <Search students={sample.students} setStudents={setStudents} />,
      container
    );
  });

  //name
  const searchInput = container.querySelector(".search-bar");
  fireEvent.change(searchInput, { target: { value: "test" } });

  expect(searchInput.value).toBe("test");

  //tag
  const tagInput = container.querySelector(".tag-bar");
  fireEvent.change(tagInput, { target: { value: "tag test" } });

  expect(tagInput.value).toBe("tag test");
});

it("should return empty", () => {
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

  //search
  const searchInput = container.querySelector(".search-bar");
  fireEvent.change(searchInput, { target: { value: "test" } });
  expect(list.length).toBe(0);

  const tagInput = container.querySelector(".tag-bar");
  fireEvent.change(searchInput, { target: { value: "" } });
  fireEvent.change(tagInput, { target: { value: "testing" } });
  expect(list.length).toBe(0);
});

it("should return 1 result on name search", () => {
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

it("should return proper results on tag search", () => {
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

  const tagInput = container.querySelector(".tag-bar");
  fireEvent.change(tagInput, { target: { value: "tag2" } });
  expect(list.length).toBe(1);
  expect(list[0].tags[0]).toBe("tag1");

  fireEvent.change(tagInput, { target: { value: "tag3" } });
  expect(list.length).toBe(1);

  fireEvent.change(tagInput, { target: { value: "tag1" } });
  expect(list.length).toBe(2);
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
  const tagInput = container.querySelector(".tag-bar");
  fireEvent.change(searchInput, { target: { value: "a" } });
  expect(list.length).toBe(3);

  fireEvent.change(searchInput, { target: { value: "E" } });
  expect(list.length).toBe(3);

  fireEvent.change(tagInput, { target: { value: "a" } });
  expect(list.length).toBe(2);
});
