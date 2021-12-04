import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TestModel, { TestDocument } from "../models/test.model";
import QuestionModel, { QuestionDocument } from "../models/question.model";
import ExamineeModel, { ExamineeDocument } from "../models/examinee.model";
import ResultModel, { ResultDocument } from "../models/result.model";
import { headers } from '../utils/headers';
import csv from "csvtojson";
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

