import React from "react";
import { shallow } from "enzyme";
import ParentComment from "../components/ParentComment.js";

describe("Parent Comment", () => {
  const comment = {
    id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
    author: "Reed Fisher",
    body: "Sint in in sunt amet.",
    postedAt: 1550488214207,
    replies_count: 3,
    replies: [
      {
        id: "116dbd01-d5f3-4dfb-afeb-f822a9264a5e",
        comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
        author: "Kathleen Nikolaus",
        body:
          "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
        postedAt: 1550419941546,
      },
      {
        id: "1d549a1b-4db1-4c10-9941-60c3a0c111cb",
        comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
        author: "Sean Bechtelar",
        body:
          "Quam ea est provident enim necessitatibus. Sint veniam sed iusto omnis eaque dolores voluptas omnis ipsa. Vero cupiditate corrupti amet.",
        postedAt: 1550434979501,
      },
      // {
      //   id: "1ea28899-c449-41da-9403-d22f1c71055c",
      //   comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
      //   author: "Norberto Sauer",
      //   body: "Minus vero hic asperiores.",
      //   postedAt: 1550419112520,
      // },
    ],
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ParentComment comment={comment} />);
  });

  it("has a class parent-comment", () => {
    expect(wrapper.find(".parent-comment").length).toEqual(1);
  });

  it("renders replies", () => {
    expect(wrapper.find(".replies Comment").length).toEqual(
      comment.replies.length
    );
  });

  it("calls onShowMoreReplies when button is clicked", () => {
    const func = jest.fn();
    const wrapper = shallow(
      <ParentComment comment={comment} onShowMoreReplies={func} />
    );

    wrapper.find(".show_more").simulate("click", { preventDefault: () => {} });

    expect(func.mock.calls.length).toEqual(1);
  });

  it("calls onShowMoreReplies with id as argument", () => {
    const func = jest.fn();
    const wrapper = shallow(
      <ParentComment comment={comment} onShowMoreReplies={func} />
    );

    wrapper.find(".show_more").simulate("click", { preventDefault: () => {} });

    expect(func.mock.calls[0][0]).toEqual(comment.id);
  });
});
