const {
    selectLessonsByTeacherid
  } = require("../models/lessons.models.js");
  
const getLessonsByTeacherid = (req, res, next) => {
    console.log(req.params)
    // const { id } = req.params;
    // selectLessonsByTeacherid(id)
    //   .then((lesson) => {
    //     res.status(200).send({ lesson });
    //   })
    //   .catch((error) => {
    //     next(error);
    //   });
  };
  

  
  module.exports = { getLessonsByTeacherid };
  