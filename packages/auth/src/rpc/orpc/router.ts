import {
  getNumberOfUsers,
  getSession,
  getUserId,
  getUserIdFromMail,
  isAuthenticated,
  isUserAdmin,
} from "./procedures";

export const authRouter = {
  isAuthenticated,
  getUserId,
  getUserIdFromMail,
  getSession,
  isUserAdmin,
  getNumberOfUsers,
};
