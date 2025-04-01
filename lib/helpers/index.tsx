import { handlePasswordReset } from "./authHelpers";
import { signUpWithEmail } from "./authHelpers";
import { signInWithEmail } from "./authHelpers";
import { getRemainingDaysInWeek } from "./getRemainingDaysOfWeek";
import { signInWithGitHub } from "./authHelpers";
import { fetchTasks, addTask, deleteTask } from "./tasksHelpers";

export {
 handlePasswordReset,
 signInWithEmail,
 signUpWithEmail,
 getRemainingDaysInWeek,
 signInWithGitHub,
 fetchTasks,
 addTask,
 deleteTask,
};
