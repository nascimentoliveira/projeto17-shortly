import { nanoid } from "nanoid";
import httpStatus from "http-status";

import urlsRepository from "../repositories/urls-repository.js";

export async function createShortURL(req, res) {
  const { id } = res.locals.user;
  const bigURLId = res.locals.bigURL.id;
  const shortURL = nanoid(8);
  try {
    await urlsRepository.createShortURL(id, bigURLId, shortURL);
    res.status(httpStatus.CREATED).send({
      shortURL: shortURL,
      message: "Seu link agora é menor!",
    });
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    });
  }
}

export async function deleteShortURL(req, res) {
  const shortURLId = res.locals.shortURL.id;
  try {
    await urlsRepository.deleteShortURL(shortURLId);
    res.status(httpStatus.OK).send({
      message: "Link excluído!",
    });
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    });
  }
}

export async function getUserShortenedURLs(req, res) {
  const userId = res.locals.user.id;
  try {
    const [userShortenedURLs] = (await urlsRepository.getShortURLsByUserId(userId)).rows;
    res.status(httpStatus.OK).send(userShortenedURLs);
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    });
  }
}

export async function redirectToBigURL(req, res) {
  const { id, bigURL, visitCount } = res.locals.bigURL;
  try {
    await urlsRepository.updateVisitsCount(id, visitCount);
    res.redirect(bigURL);
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    });
  }
}

const urlsController = {
  createShortURL,
  deleteShortURL,
  getUserShortenedURLs,
  redirectToBigURL,
};

export default urlsController;
//
