const app = require('express')();
const { v4: uuidv4 } = require('uuid');

const jobs = {
  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': 'pending',
  'u65675654654-bbfd-4b2d-9b5d-ab8dfbbd4bed': 'done',
};

app.post('/submit', (req, res) => {
  const jobId = `job:${uuidv4()}`;
  jobs[jobId] = 'pending';
  setTimeout(() => updateJob(jobId), 10000);
  res.json({ jobId });
});

app.get('/status', (req, res) => {
  console.log(jobs[req.query.jobId]);
  res.end('\n\nJobStatus: ' + jobs[req.query.jobId] + '%\n\n');
});

app.listen(9001, () => console.log('listening on 9001'));

function updateJob(jobId, prg) {
  jobs[jobId] = 'done';
}
