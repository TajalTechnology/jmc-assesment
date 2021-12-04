//   // let wrongList:string = []
  //   let wrongList: string[] =[];

  //   for (let [key, value] of Object.entries(objests)) {
  //     console.log(key, value);
  //     wrongList.push(key);
  // }

  // console.log(wrongList);

    // let answer = Object.entries(req.body.answers);
    // let score = 0;
    // let correctAnswer = []
    // Object.assign({}, ['a','b','c']); 

    // for (let i = 0; i < answer.length; i++) {

    //   let _id = answer[i][0];
    //   let givenAnswer = answer[i][1];

    //   let question = await QuestionModel.findOne({ _id: _id });

    //   if (!question) continue;

    //   if (question.answer === givenAnswer) {
    //     // let rightAnswer = { _id, givenAnswer };
    //     correctAnswer.push({ _id, givenAnswer })



    //     // var m = Object.assign(correctAnswer, newObj);

    //     // correctAnswer = { ...correctAnswer, ...newObj };

    //     score = score + 1;
    //     continue;
    //   } else {
    //     // wrongAnswer = { _id, givenAnswer, ...wrongAnswer };
    //   }
    // };
    // let correctAnswerObj = Object.assign({}, correctAnswer);
    // const m = correctAnswerObj.map((item, key)=>{
    //   console.log(item);
    // })
    // let m = { ...correctAnswer }

    // const preferenceRank = {}
    // for (const [key, { rank:string }] of Object.entries(m)) {
    //   preferenceRank[rank] = key
    // }

    // console.log(preferenceRank)

    // console.log(m['0'])