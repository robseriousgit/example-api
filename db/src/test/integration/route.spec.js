import { expect } from 'chai';
import request from 'supertest';
import server from '../../../lib/index'

describe('Health check route', () => {
  it('returns ok', () => {
    request(server).get('/__health').end((err, res) => {
      expect(res.statusCode).to.eql(200);
      expect(res.body).to.eql('OK');
    });
  });
});

describe('locationSearch route fail', () => {
  it('returns error if Integer lat/lng values are not provided', () => {
    request(server).get('/locationSearch/cheese/toastie').end((err, res) => {
      expect(res.statusCode).to.equal(500);
    });
  });
});

describe('locationSearch route success', () => {
  it('returns JSON if lat/lng values are provided', () => {
    request(server).get('/locationSearch/123/23').end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.instanceof(Array);
    })
  });
})