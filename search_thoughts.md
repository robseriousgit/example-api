## Random notes on the search query, read if you want to see my workings.

Search query:

  Use radius based great circle search to identify records in local area

    https://en.wikipedia.org/wiki/Haversine_formula

    https://stackoverflow.com/questions/260335/proximity-search/260347#260347

    https://www.scribd.com/presentation/2569355/Geo-Distance-Search-with-MySQL

      - note optimisation technique

  Order by closest location

Then filter on search string in JS, i.e. 'camera'

  Extract these items to a new array that will form search results

Not all records that _are_ cameras have 'camera' in the description, so attempt a fuzzy match of rows that contain something like or related to 'camera'

  Possible addition of metadata using an api

    Tried some AI servies such as google product search api but not particularly clean nor reliable

    Extract entities in description

      https://cloud.google.com/natural-language/docs/analyzing-entities

      https://developers.google.com/apis-explorer/#p/language/v1/language.documents.analyzeEntities?_h=11&resource=%257B%250A++%2522document%2522%253A+%250A++%257B%250A++++%2522content%2522%253A+%2522Blackmagic+Production+Camera+4K+(BMPC4K)%2522%252C%250A++++%2522type%2522%253A+%2522PLAIN_TEXT%2522%250A++%257D%250A%257D&

    Try using first word of description from wikipedia - ok but not reliable, i.e Sony, make all sorts of stuff, not just cameras

      https://en.wikipedia.org/w/api.php?action=opensearch&search=Zhiyun&limit=10&namespace=0&format=json
      https://en.wikipedia.org/w/api.php?action=opensearch&search=Canon&limit=10&namespace=0&format=json
      https://www.mediawiki.org/wiki/API:Opensearch

    Try using first word of description from Flickr brand models

      https://www.flickr.com/services/api/flickr.cameras.getBrandModels.html
      https://www.flickr.com/services/api/explore/flickr.cameras.getBrandModels

    Again, not reliable, but a potential fit.

  For promptness I elected to use a static list derived from:

    https://en.wikipedia.org/wiki/List_of_digital_camera_brands

  Extract these to a new array

Intersect these with the search results to de-dupe and return results as JSON