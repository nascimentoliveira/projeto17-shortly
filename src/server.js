import { app } from "./app.js";

const port = process.env.PORT || 4000;

app.listen(port, function (err) {
  if (err) {
    /* eslint-disable-next-line no-console */
    console.log("Failed to start the server -", err);
  }
  /* eslint-disable-next-line no-console */
  console.log("Server listening on port", port);
});
//
