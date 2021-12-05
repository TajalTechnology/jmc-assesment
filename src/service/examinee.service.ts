import ExamineeModel from "../models/examinee.model";
import ResultModel from "../models/result.model";
import ip from "ip";


export async function testScores() {

  const myDetails = await ExamineeModel.findOne({ where: { ip: ip.address() } });
  let myTests = await ResultModel.find({ examineeId: myDetails._id });
  if (myTests.length < 1) return myTests = [];

  for (let i = 0; i < myTests.length; i++) {
    let rank2 = 1 + await ResultModel.count({ "score": { "$gt": myTests[i].score } });
    myTests[i].rank = rank2;
  }

  return myTests;
};

