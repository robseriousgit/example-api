import { expect } from 'chai';
import nock from 'nock';

import { search } from '../../../lib/util/search'

describe('search', () => { 
  it('rejects if integer lat/lng are not provided', () => {
    return search('http://db.com', '123', "Robert'); DROP TABLE items;--")
    .catch(error => {
      expect(error).to.eql('Integer lat/lng values must be provided')
    })
  });

  it('rejects if search fails', () => {
    const scope = nock('http://db.com')
        .get('/locationSearch/123/123')
        .replyWithError('errrrr');

    return search('http://db.com', '123', '123')
      .catch((err) => {
        expect(err.message).to.have.string('errrrr');
        if (scope.isDone()) {
          nock.cleanAll();
        }
      });
  })

  it('returns json if search succeeds', () => {
    const responseJson = [
      {one: 2}
    ]
    const scope = nock('http://db.com')
      .get('/locationSearch/123/123')
      .reply(200, responseJson);

    return search('http://db.com', '123', '123')
      .then(response => {
        expect(response).to.eql(responseJson)
      })
      
  })

})
