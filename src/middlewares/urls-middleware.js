
import httpStatus from "http-status";
import urlsRepository from "../repositories/urls-repository.js";

async function registerURL(req, res, next) {
  const { bigURL } = req.body;
  try {
    await urlsRepository.insertBigURL(bigURL);
    const [bigURLId] = (await urlsRepository.getBigURLId(bigURL)).rows;
    res.locals.bigURL = bigURLId;
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

async function checkIsShortened(req, res, next) {
  const userId = res.locals.user.id;
  const bigURLId = res.locals.bigURL.id;
  try {
    const [isShortened] = (await urlsRepository.checkIsShortened(userId, bigURLId)).rows;
    if (isShortened) {
      res.status(httpStatus.CONFLICT).send({
        error: "Este link já foi encurtado por você!",
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

async function shortURLIdValid(req, res, next) {
  const { shortURLId } = req.params;
  try {
    const [shortURL] = (await urlsRepository.getShortURLById(shortURLId)).rows;
    if (!shortURL) {
      res.status(httpStatus.NOT_FOUND).send({
        error: "Link não encontrado.",
      });
      return;
    }
    res.locals.shortURL = shortURL;
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

async function shortURLValid(req, res, next) {
  const { shortURL } = req.params;
  try {
    const [bigURL] = (await urlsRepository.getBigURLByShortURL(shortURL)).rows;
    if (!bigURL) {
      res.status(httpStatus.NOT_FOUND).send({
        error: "Link não encontrado.",
      });
      return;
    }
    res.locals.bigURL = bigURL;
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

function userIsOwner(req, res, next) {
  const { userId } = res.locals.shortURL;
  if (userId !== res.locals.user.id) {
    res.status(httpStatus.FORBIDDEN).send({
      error: "Operação não permitida! Você não é o proprietário deste link.",
    });
    return;
  }
  next();
}

const urlsMiddleware = {
  registerURL,
  checkIsShortened,
  shortURLIdValid,
  shortURLValid,
  userIsOwner,
}

export default urlsMiddleware;
//
