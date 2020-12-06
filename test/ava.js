const test = require('ava');
const request = require('supertest');
const app = require('./../core/app.js');
// todo : Istanbul.js for visual tests reports

test('status', async t => {
    const response = await request(app)
    .get('/status');
    t.is(response.status, 200);
    t.deepEqual(response.body, {
    status : 'Ok'
    });
});

test('capture no url', async t => {
  const response = await request(app)
    .get('/capture');

    t.is(response.status, 400);
    t.is(response.body.message, `not url provided`);
});

test('capture invalid url', async t => {
  const url = 'not-a-valid-url.com'
  const response = await request(app)
    .get('/capture')
    .query({q:url});

    t.is(response.status, 400);
    t.is(response.body.message, `not a valid url`);
});

test('capture ✔️', async t => {
  const url = 'https://www.valiu.com/'
  const response = await request(app)
    .get('/capture')
    .query({q:url});

    t.is(response.status, 200);
    t.is(response.header['content-type'], `image/jpeg`);
});