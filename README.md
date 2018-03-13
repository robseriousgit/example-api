
# Code Sample: Search Endpoint

## General

This is a dockerised search endpoint containing an API and a DB application.

The apps use Restify and Chai and have been built with a modular TDD approach.  

The apps are coded in ES6 and compiled from an npm task using Babel.

![Technical layout](http://image.ibb.co/gwsspc/technical_diagram.png "Technical layout")

Two applications help with seperation of concerns, for example a new DB endpoint could be substituted in.

Also new API endpoints could be added quickly without interference.

The app will return errors should a service (such as the database) fail or any request not contain appropriate paramaters.

Example request:

`http://localhost:9001/search/camera/51.948/0.172943`

Healthcheck endpoint:

`http://localhost:9001/__health`

## Search priority

The example data set contained some items that _are_ actually cameras, but would not match a text search string.

A great circle search for all of the items by distance returns results to the API to filter by search term.  

The remainder contain some potential matches so I have included some notes (search_thoughts.md) on ideas I had for how the metadata of the items could be extended, but for the sake of this submission I elected to only use a small example of some fuzzy match based on 'camera' being the search term and an expectation that 'go pro' should also be returned.

I have deliberately added these as a secondary match in the results as some may be false positives, i.e. 'Canon' make lenses, printers etc, so alone, they are not 100% reliably matched.

## Performance

This search is only performant due to the small data set.  For a real application I would also filter by max distance from the lat/lng point.  This search result could also be cached for a user searching different items within the same area.  Cache timeout would be short (1min?) as listings change frequently.

The 'fuzzy' matching criteria could be added to the db and then included as part of a query to reduce response time.

The applictations exist behind one docker bridge so requests between apps are quick.

## Other considerations

I have not included any authentication, error logging, monitoring, CI for this code sample

I have used basic numeric validation on the lat/lng.  It could be extended to ensure it was only valid for Earth.

## Usage and installation

Docker is required, but you can also run both services locally using `npm start`.

The `/dev/` folder contains a docker-compose file.  CD to this dir then run:

`docker-compose build`
`docker-compose up`

Then you should see some results if you hit

`http://localhost:9001/search/camera/51.948/0.172943`

## Testing

Unit tests have been written for methods and integration tests have been written for the endpoints.

The tests can be run in each app's directory using:

`npm test`

## Other notes

One Docker install had a problem with better_sqlite3 module and I had to reinstall node_modules in the container using:

  `docker exec -it dev_db_1 bash`
  `rm -rf node_modules`
  `npm install`


