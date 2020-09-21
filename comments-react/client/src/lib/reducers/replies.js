export const replies = (state = [], action) => {
  switch (action.type) {
    case "COMMENTS_FETCHED":
      const replies = action.payload.comments.reduce((acc, comment) => {
        const { replies } = comment;
        return acc.concat(replies);
      }, []);
      return state.concat(replies);

    case "REPLIES_FETCHED":
      return state.concat(action.payload.replies);

    case "REPLY_ADDED":
      // if we are showing all the replies, we want to show the added replies
      // but if we are not showing all the replies, we merely want to update the number of replies
      // return state;
      return state.concat(action.payload.newReply);

    default:
      return state;
  }
};
