import { expect } from 'chai';
import request from 'supertest';
import nock from 'nock';

import server from '../../../lib/index'

import { dbResponse } from  '../fixtures/db_response'

describe('Health check route', () => {
  it('returns ok', () => {
    request(server).get('/__health').end((err, res) => {
      expect(res.statusCode).to.eql(200);
      expect(res.body).to.eql('OK');
    });
  });
});

describe('search route fail', () => {
  it('returns error if Integer lat/lng values are not provided', () => {
    request(server).get('/search/cat/cheese/toastie').end((err, res) => {
      expect(res.statusCode).to.equal(500);
    });
  });
})

describe('search route success', () => {
  it('returns JSON if lat/lng values and search term are provided', () => {
    const responseJson = { results: 
        [ { item_name: 'VW Camper Westfalia - Right Hand Drive',
            lat: 52.0251999,
            lng: 0.25670886,
            item_url: 'cambridge/hire-vw-camper-westfalia--right-hand-drive-28585278',
            img_urls: '["vw-camper-westfalia-right-hand-drive-50038971.jpg","vw-camper-westfalia-right-hand-drive-84467357.jpg","vw-camper-westfalia-right-hand-drive-73757654.jpg","vw-camper-westfalia-right-hand-drive-98060945.jpg","vw-camper-westfalia-right-hand-drive-77106052.jpg","vw-camper-westfalia-right-hand-drive-75261207.jpg","vw-camper-westfalia-right-hand-drive-10266646.jpg","vw-camper-westfalia-right-hand-drive-12336416.jpg"]',
            distance: 6.410812872633238 } ],
       secodarilyMatched: [] 
    }
    const scope = nock('http://localhost:1234')
      .get('/locationSearch/123/23')
      .reply(200, dbResponse);
    
    request(server).get('/search/Camper/123/23').end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.eql(responseJson);
    });
  });
})