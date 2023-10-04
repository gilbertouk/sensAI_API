require("openai/shims/node");
const OpenAI = require("openai");

require("dotenv").config({
  path: `${__dirname}/../.env.OPENAI_API_KEY`,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

exports.getAIRes = async (req, res, next) => {
  const { content } = req.body;
  try {
    if (content === null) {
      return Promise.reject({
        status: 400,
        msg: "Bad request",
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content,
        },
      ],
      temperature: 0,
    });

    const completion = response.choices[0].message.content;

    res.status(201).send({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
};
