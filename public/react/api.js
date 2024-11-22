let apiURL;

// if (process.env.NODE_ENV === "development") {
//   apiURL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
// } else {
//   apiURL = process.env.REACT_APP_API_URL || "https://git.heroku.com/protected-wildwood-47583.git";
// }

if (process.env.NODE_ENV === "development") {
  apiURL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
} else {
  apiURL = "/api";
}

export default apiURL;
