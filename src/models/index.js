// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Employee, Schedule, Question, EmployeeQuestion, TestTypes, AppSetting } = initSchema(schema);

export {
  Employee,
  Schedule,
  Question,
  EmployeeQuestion,
  TestTypes,
  AppSetting
};