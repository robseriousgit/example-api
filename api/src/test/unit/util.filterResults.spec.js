import { expect } from 'chai';

import { filterResults } from '../../../lib/util/filterResults'

describe('filterResults', () => { 
  const results = [
    {item_name: "Canon 5DSR Digital Camera"},
    {item_name: "Steadicam Arm & Vest (For Solo / Glidecam etc)"},
    {item_name: "Canon 16-35mm 2.8 L Series Wide Angle Lens"},
    {item_name: "Canon 5D Mark iii"},
    {item_name: "Go Pro Hero 2"},
    {item_name: "Canon 5D Mark 3 Camera + Canon 40mm Prime 2.8 Lens"},
  ]

  const filteredObject = {
    positivelyMatched: [
      {item_name: "Canon 5DSR Digital Camera"},
      {item_name: "Canon 5D Mark 3 Camera + Canon 40mm Prime 2.8 Lens"}
    ],
    unmatched: [
      {item_name: "Steadicam Arm & Vest (For Solo / Glidecam etc)"},
      {item_name: "Canon 16-35mm 2.8 L Series Wide Angle Lens"},
      {item_name: "Canon 5D Mark iii"},
      {item_name: "Go Pro Hero 2"}
    ]
  }

  it('rejects if term is not provided', () => {
    const curry = filterResults(null);
    return curry(results)
    .catch(error => {
      expect(error).to.eql('Search term must be provided')
    })
  });

  it('returns empty if no results', () => {
    const curriedFunction = filterResults('Camera');
    return curriedFunction([])
      .then(result => {
        expect(result).to.eql({positivelyMatched: [], unmatched: []});
      })
      .catch(error => {
        expect(error).to.eql('');
      })
    done();
  });

  it('returns filtered object if term is provided', () => {
    const curriedFunction = filterResults('Camera');
    return curriedFunction(results)
      .then(result => {
        expect(result).to.eql(filteredObject);
      })
      .catch(error => {
        expect(error).to.eql('');
      })
    done();
  });

})
