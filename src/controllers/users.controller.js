import { urlRepository } from '../repositories/url.repository.js';
import { MESSAGES } from '../constants.js';

export async function getUserShortenedUrls(req, res) {

  const { id } = res.locals.user;

  try {
    const [userShortenedUrls] = (await urlRepository.getShortUrlsByUserId(id)).rows;

    res.status(200).send(userShortenedUrls);

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}