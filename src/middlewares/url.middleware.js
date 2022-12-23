import { urlSchema } from '../models/url.model.js';
import { MESSAGES } from '../constants.js';
import { urlRepository } from '../repositories/url.repository.js';

export function urlSchemaValid(req, res, next) {

  const url = req.body;

  const { error } = urlSchema.validate(url, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ message: MESSAGES.FORMAT_ERROR, errors: errors });
    return;
  }

  res.locals.url = url;

  next();
}

export async function urlRegistered(req, res, next) {

  const { url } = res.locals.url;

  try {
    await urlRepository.insertUrl(url);

    const [urlId] = (await urlRepository.getIdUrl(url)).rows;

    res.locals.urlId = { urlId: urlId.id };

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export async function urlValid(req, res, next) {

  const { id } = res.locals.user;
  const { url } = res.locals.url;

  try {
    const [urlUser] = (await urlRepository.matchUserUrl(id, url)).rows;

    if (urlUser) {
      res.status(409).send({ message: 'Este link já foi encurtado por você!' });
      return;
    }

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export async function shortIdValid(req, res, next) {

  const { id } = req.params;

  try {
    const [link] = (await urlRepository.getLinkById(id)).rows;

    if (!link) {
      res.status(404).send({ message: 'Link não cadastrado!' });
      return;
    }

    res.locals.link = link;

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export async function shortUrlValid(req, res, next) {

  const { shortUrl } = req.params;

  try {
    const [link] = (await urlRepository.getLinkByShortUrl(shortUrl)).rows;

    if (!link) {
      res.status(404).send({ message: 'Link não cadastrado!' });
      return;
    }

    res.locals.link = link;

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export function urlUserValid(req, res, next) {

  const { userId } = req.res.locals.link;
  const { id } = res.locals.user;

  if (userId !== id) {
    res.status(401).send({ message: 'Operação não permitida!' });
    return;
  }

  next();
}