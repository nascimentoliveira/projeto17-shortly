import { nanoid } from 'nanoid';

import { urlRepository } from '../repositories/url.repository.js';
import { MESSAGES } from '../constants.js';

export async function shorten(req, res) {

  const { id } = res.locals.user;
  const { urlId } = res.locals.urlId;
  const shortUrl = nanoid(8);

  try {
    await urlRepository.createShortUrl(id, urlId, shortUrl);

    res.status(201).send({ shortUrl: shortUrl, message: 'Seu link agora é menor!' });

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}

export async function getLinkById(req, res) {

  delete res.locals.link.userId;

  res.status(200).send(res.locals.link);
  return;
}

export async function redirectToLink(req, res) {

  const { id, bigUrl, visitCount } = res.locals.link;

  try {
    await urlRepository.updateVisitsCount(id, visitCount);

    res.redirect(bigUrl);

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}

export async function deleteLink(req, res) {

  const { id } = res.locals.link;

  try {
    await urlRepository.deleteShortURl(id);

    res.sendStatus(204);

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}