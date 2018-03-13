import { expect } from 'chai';

import { fuzzyMatch } from '../../../lib/util/fuzzyMatch'

describe('fuzzyMatch', () => { 
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

  const expected = {
    results: [
      {item_name: "Canon 5DSR Digital Camera"},
      {item_name: "Canon 5D Mark 3 Camera + Canon 40mm Prime 2.8 Lens"}
    ],
    secodarilyMatched: [
      { item_name: 'Canon 16-35mm 2.8 L Series Wide Angle Lens' },
      { item_name: 'Canon 5D Mark iii' },
      { item_name: 'Go Pro Hero 2' }
    ]
  }

  it('returns no secondary matches if no indexed fuzzy search term exists', () => {
    const curriedFunction = fuzzyMatch('some new search term');
    return curriedFunction(filteredObject)
      .then(result => {
        console.log(result);
        expect(result).to.eql({results: filteredObject.positivelyMatched, secodarilyMatched: []});
      })
      .catch(error => {
        expect(error).to.eql('');
      })
    done();
  });

  it('returns secondary matches if indexed fuzzy search term exists', () => {
    const curriedFunction = fuzzyMatch('camera');
    return curriedFunction(filteredObject)
      .then(result => {
        expect(result).to.eql(expected);
      })
      .catch(error => {
        expect(error).to.eql('');
      })
    done();
  });
})
