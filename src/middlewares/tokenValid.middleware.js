import { userRepository } from '../repositories/user.repository.js';
import { MESSAGES, DAYS_TOKEN_EXPIRE } from '../constants.js';

export async function tokenValid(req, res, next) {

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).send({ message: 'Formato de cabeçalho inesperado! Campo "Authorization" não encontrado.' });
    return;
  }

  try {
    const [user] = (await userRepository.getUserByToken(token)).rows;

    if (!user) {
      res.status(404).send({ message: 'Usuário não encontrado!' });
      return;
    }

    if (user.sessionCreatedAt.setDate(
      user.sessionCreatedAt.getDate() + DAYS_TOKEN_EXPIRE) < new Date) {
      res.status(401).send({ message: 'Token expirado, entre novamente com sua conta!' });
      return;
    }

    res.locals.user = { id: user.id, name: user.name, email: user.email };

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}