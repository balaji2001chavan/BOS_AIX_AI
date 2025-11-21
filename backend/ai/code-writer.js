import fs from "fs";

export function writeToFile(path, content) {
  try {
    fs.writeFileSync(path, content);
    return { status: "success", path };
  } catch (err) {
    return { status: "error", error: err.toString() };
  }
}

export function appendToFile(path, content) {
  try {
    fs.appendFileSync(path, content);
    return { status: "success", path };
  } catch (err) {
    return { status: "error", error: err.toString() };
  }
}
