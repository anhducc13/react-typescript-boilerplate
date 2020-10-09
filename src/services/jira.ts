// @ts-nocheck
import fetch from 'node-fetch';
import moment from 'moment';
import bird from 'bluebird';
import _ from 'lodash';

// Replace config below with your configs
const URL = 'https://jira.teko.vn'; // Teko's Jira url
const PROJECT_KEY = 'SCFW'; // Your project key on Jira (eg: SCFW)
const TOKEN = 'bGluaC52aDphYmNkMTIzNA=='; // Use the generateToken func below to get token

const shouldDeleteTest = false;

const getCurrentTime = () => {
  return moment().format('YYYY-MM-DDThh:mm:ss');
};

export default class JiraTestRunner {
  constructor() {
    this.url = URL + '/rest/atm/1.0';
    this.projectKey = PROJECT_KEY;
    this.authString = 'Basic ' + TOKEN;
  }

  // Generate Jira token (used for first time)
  generateToken = () => {
    const accessToken = Buffer.from('<jira_username>:<jira_password>').toString(
      'base64'
    );
    return accessToken;
  };

  // Get all test cases of a task
  async getTestsInIssue(issueKey) {
    const responseFetch = await fetch(
      this.url +
        `/testcase/search?query=projectKey = "${this.projectKey}" AND issueKeys IN (${issueKey})`,
      {
        method: 'GET',
        headers: { Authorization: this.authString },
      }
    ).then(res => res.json());

    return responseFetch.map(per => ({ name: per['name'], key: per['key'] }));
  }

  // Create test case on Jira
  async createTest(testName, issueKey) {
    const response = await fetch(this.url + '/testcase', {
      method: 'POST',
      body: JSON.stringify({
        name: testName,
        projectKey: this.projectKey,
        issueLinks: [issueKey],
        status: 'Approved',
      }),
      headers: {
        Authorization: this.authString,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());

    const testKey = response['key'];
    return testKey;
  }

  // Delete test case on Jira
  async deleteTest(testKey) {
    return fetch(this.url + '/testcase/' + testKey, {
      method: 'DELETE',
      headers: {
        Authorization: this.authString,
        'Content-Type': 'application/json',
      },
    });
  }

  // Create test cycle on Jira
  createTestCycle(name, issueKey, items) {
    return fetch(this.url + '/testrun', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        projectKey: this.projectKey,
        issueKey: issueKey,
        plannedStartDate: getCurrentTime(),
        plannedEndDate: getCurrentTime(),
        items: items,
      }),
      headers: {
        Authorization: this.authString,
        'Content-Type': 'application/json',
      },
    });
  }
}

const testCases = {};
export const itJira = (issueKey, name, fn, timeout?: number) => {
  testCases[issueKey] = testCases[issueKey] || [];
  const testCase = it(name, fn, timeout);
  testCases[issueKey].push(testCase);
};

const getMapNameToKey = async (
  jiraTestRunner,
  issueKey,
  testStringLocals,
  testsOnJira
) => {
  return bird.reduce(
    testStringLocals,
    async (acc, nameTest) => {
      const testOnJira = _.find(
        testsOnJira,
        testOnJira => nameTest === testOnJira.name
      );

      acc[nameTest] = testOnJira
        ? testOnJira.key
        : await jiraTestRunner.createTest(nameTest, issueKey);
      return await acc;
    },
    {}
  );
};

const deleteTestOnJira = (jiraTestRunner, mapNameToKey, testsOnJira) => {
  return bird.all(
    testsOnJira
      .filter(tJira => !mapNameToKey[tJira.name])
      .map(dJira => jiraTestRunner.deleteTest(dJira.key))
  );
};

// Get result test cases after submit test to Jira
const getResultTestCases = async (jiraTestRunner, issueKey) => {
  const testsOnJira = await jiraTestRunner.getTestsInIssue(issueKey);

  const mapNameToKey = await getMapNameToKey(
    jiraTestRunner,
    issueKey,
    _.map(testCases[issueKey], 'result.fullName'),
    testsOnJira
  );

  if (shouldDeleteTest)
    await deleteTestOnJira(jiraTestRunner, mapNameToKey, testsOnJira);

  const getItemsPromises = testCases[issueKey].map(async tc => {
    const name = tc.result.fullName;
    return {
      testCaseKey: mapNameToKey[name],
      status: tc.result.status === 'passed' ? 'Pass' : 'Fail',
    };
  });

  return Promise.all(getItemsPromises);
};

const submitAfterTest = (jiraTestRunner, issueKey) => {
  afterAll(async done => {
    try {
      const items = await getResultTestCases(jiraTestRunner, issueKey);
      await jiraTestRunner.createTestCycle(issueKey, issueKey, items);
    } catch (error) {
    } finally {
      done();
    }
  });
};

// Submit tests to Jira
export const submitTestJira = issueList => {
  if (issueList.length) {
    const jiraTestRunner = new JiraTestRunner();
    issueList.forEach(issueKey => {
      submitAfterTest(jiraTestRunner, issueKey);
    });
  }
};
