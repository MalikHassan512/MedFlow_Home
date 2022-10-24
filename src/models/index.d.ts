import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type EmployeeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ScheduleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type QuestionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EmployeeQuestionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TestTypesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AppSettingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Employee {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly dob?: string | null;
  readonly schrID?: string | null;
  readonly street?: string | null;
  readonly street2?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zip?: string | null;
  readonly phoneNumber?: string | null;
  readonly sex?: string | null;
  readonly email?: string | null;
  readonly isVaccinated?: boolean | null;
  readonly subID?: string | null;
  readonly idNumber?: string | null;
  readonly department?: string | null;
  readonly isNew?: boolean | null;
  readonly groupType?: number | null;
  readonly groupName?: string | null;
  readonly qaDone?: boolean | null;
  readonly testDone?: boolean | null;
  readonly checkIn?: string | null;
  readonly questionID?: string | null;
  readonly questionGroup?: string | null;
  readonly scheduleID?: string | null;
  readonly isSchedule?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Employee, EmployeeMetaData>);
  static copyOf(source: Employee, mutator: (draft: MutableModel<Employee, EmployeeMetaData>) => MutableModel<Employee, EmployeeMetaData> | void): Employee;
}

export declare class Schedule {
  readonly id: string;
  readonly scheduleName?: string | null;
  readonly scheduleType?: string | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
  readonly days?: string | null;
  readonly employees?: (Employee | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Schedule, ScheduleMetaData>);
  static copyOf(source: Schedule, mutator: (draft: MutableModel<Schedule, ScheduleMetaData>) => MutableModel<Schedule, ScheduleMetaData> | void): Schedule;
}

export declare class Question {
  readonly id: string;
  readonly groupName?: string | null;
  readonly question?: string | null;
  readonly answer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Question, QuestionMetaData>);
  static copyOf(source: Question, mutator: (draft: MutableModel<Question, QuestionMetaData>) => MutableModel<Question, QuestionMetaData> | void): Question;
}

export declare class EmployeeQuestion {
  readonly id: string;
  readonly employeeID: string;
  readonly question?: string | null;
  readonly answer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<EmployeeQuestion, EmployeeQuestionMetaData>);
  static copyOf(source: EmployeeQuestion, mutator: (draft: MutableModel<EmployeeQuestion, EmployeeQuestionMetaData>) => MutableModel<EmployeeQuestion, EmployeeQuestionMetaData> | void): EmployeeQuestion;
}

export declare class TestTypes {
  readonly id: string;
  readonly name?: string | null;
  readonly totalTime?: string | null;
  readonly firstAlert?: string | null;
  readonly secondAlert?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TestTypes, TestTypesMetaData>);
  static copyOf(source: TestTypes, mutator: (draft: MutableModel<TestTypes, TestTypesMetaData>) => MutableModel<TestTypes, TestTypesMetaData> | void): TestTypes;
}

export declare class AppSetting {
  readonly id: string;
  readonly isStart?: boolean | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<AppSetting, AppSettingMetaData>);
  static copyOf(source: AppSetting, mutator: (draft: MutableModel<AppSetting, AppSettingMetaData>) => MutableModel<AppSetting, AppSettingMetaData> | void): AppSetting;
}