const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
    const context = github.context;
    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    }

    const token = core.getInput('okami-token');
    const octokit = github.getOctokit(token);
    const prNumber = context.payload.pull_request.number;
    
    const picture = await getShibaPicture();
    console.log(`picture url - ${picture}`);

    const commentBody = `[shibe](${picture})`

    octokit.issues.createComment({
        ...context.repo,
        issue_number: prNumber,
        body: commentBody
    });
}

async function getShibaPicture() {
    var shibaUrl = ""
    try {
        const response = await axios.get("http://shibe.online/api/shibes")
        shibaUrl = response.data[0];
    } catch (error) {
        console.error(error);
    }

    return shibaUrl;
}


// /api/cats or birds at /api/birds
run();

/*
try {

};
} catch (error) {
  core.setFailed(error.message);
}
*/
