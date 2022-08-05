export default function breed(state = "", action) {
  switch (action.type) {
    case "CHANGE_BREED":
      return action.payload;
    case "CHNAGE_ANIMAL":
      return "";
    default:
      return state;
  }
}
