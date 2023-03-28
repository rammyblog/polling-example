const app = require('express')();
const { v4: uuidv4 } = require('uuid');

const jobs = {};

app.post('/submit', (req, res) => {
  const jobId = `job:${uuidv4()}`;
  jobs[jobId] = 'pending';
  setTimeout(() => updateJob(jobId), 20000);
  res.json({ jobId, status: jobs[jobId] });
});

app.get('/status', async (req, res) => {
  const jobId = req.query.jobId;
  //long polling, don't respond until done
  while ((await checkJobComplete(req.query.jobId)) == false);
  res.json({ jobId, status: jobs[jobId] });
});

app.listen(9002, () => console.log('listening on 9002'));

async function checkJobComplete(jobId) {
  return new Promise((resolve, reject) => {
    if (jobs[jobId] !== 'done') this.setTimeout(() => resolve(false), 1000);
    else resolve(true);
  });
}

function updateJob(jobId) {
  jobs[jobId] = 'done';
}
