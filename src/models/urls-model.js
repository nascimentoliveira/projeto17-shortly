import joi from "joi";

const urlsSchema = joi.object({
  bigURL: joi.string().uri().trim().required(),
});

export default urlsSchema;
//
