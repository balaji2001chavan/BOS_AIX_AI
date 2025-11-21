import { execSync } from "child_process";

export function autoCommit(message = "BOSS AiX Auto Code Update") {
  try {
    execSync("git add .");
    execSync(`git commit -m "${message}"`);
    execSync("git push");
    return { status: "success", message: "Changes pushed to GitHub" };
  } catch (err) {
    return {
      status: "error",
      error: err.toString()
    };
  }
}
