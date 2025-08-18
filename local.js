import app, { PORT } from "./main.js";
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
