import httpStatus from "http-status";

export default function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
        error: "Não foi possível processar a requisição. Verifique os campos e tente novamente.",
        errors: errors,
      });
      return;
    }
    next();
  };
}
//
