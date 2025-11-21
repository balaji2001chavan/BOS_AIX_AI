import fs from "fs";

export function writeFile(path, content) {
  try {
    fs.writeFileSync(path, content);
    return { status: "success", message: "File created", path };
  } catch (err) {
    return { status: "error", error: err.toString() };
  }
}

export function appendFile(path, content) {
  try {
    fs.appendFileSync(path, content);
    return { status: "success", message: "Content appended", path };
  } catch (err) {
    return { status: "error", error: err.toString() };
  }
}
