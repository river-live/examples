import React from "react";
import { shallow } from "enzyme";
import CommentForm from "../components/CommentForm.js";

describe("comment form", () => {
  it("state of author changes when input is changed", () => {
    const wrapper = shallow(<CommentForm />);
    const inputElement = wrapper.find("[name='author']");

    inputElement.simulate("change", {
      target: { name: "author", value: "Zac" },
    });

    expect(wrapper.state().author).toEqual("Zac");
  });

  it("calls onSubmit when form is submitted", () => {
    const func = jest.fn();
    const wrapper = shallow(<CommentForm onSubmit={func} />);

    const inputAuthor = wrapper.find("[name='author']");
    const inputBody = wrapper.find("[name='body']");

    inputAuthor.simulate("change", {
      target: { name: "author", value: "Zac" },
    });

    inputBody.simulate("change", {
      target: { name: "body", value: "Zac" },
    });

    let comment = {
      author: wrapper.state().author,
      body: wrapper.state().body,
    };

    wrapper.simulate("submit", { preventDefault: () => {} });

    expect(func.mock.calls[0][0]).toEqual(comment);
  });
});
