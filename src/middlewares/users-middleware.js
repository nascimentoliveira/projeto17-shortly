import userRepository from "../repositories/users-repository.js";
import httpStatus from "http-status";

async function userIsValid(req, res, next) {
  const { email } = req.body;
  try {
    const [user] = (await userRepository.getUserByEmail(email)).rows;
    if (user) {
      res.status(httpStatus.CONFLICT).send({
        error: "E-mail já cadastrado!",
      });
      return;
    }
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    });
    return;
  }
  next();
}

const usersMiddleware = {
  userIsValid,
}

export default usersMiddleware;
//
