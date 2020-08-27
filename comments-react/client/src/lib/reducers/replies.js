export const replies = (state = [], action) => {
  switch (action.type) {
    case "COMMENTS_FETCHED":
      const replies = action.payload.comments.reduce((acc, comment) => {
        const { replies } = comment;
        return acc.concat(replies);
      }, []);
      return state.concat(replies);

    case "REPLIES_FETCHED":
      console.log(state);
      return state.concat(action.payload.replies);

    default:
      return state;
  }
};
