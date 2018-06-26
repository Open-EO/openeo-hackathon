# openEO-graphql

Graphql wrapper for openEO Api


## Install

__Perquisites:__ A modern node.js version (tested with v10)

```bash
    npm install
```

## Develop

```bash
    npm start
```

play with api at: http://localhost:2104/graphiql


## Api

To run the examples below, your dev server needs to be running by executing `npm start`

### Queries

You can remove unneeded attributes of the queries. This way you can avoid over-fetching.

#### Get capabilities

```graphql
query {
  capabilities {
    api,
    services,
    formats{
      default,
      formats
    }
  }
}
```


<a href="http://localhost:2104/graphiql?query=query%20%7B%0A%20%20capabilities%20%7B%0A%20%20%09api%2C%0A%20%20%20%20services%2C%0A%20%20%20%20formats%7B%0A%20%20%20%20%20%20default%2C%0A%20%20%20%20%20%20formats%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D" target="_tab">run in graphiql</a>


#### Authenticate

```graphql
query {
  auth(endpoint: "http://giv-project8.uni-muenster.de", user: "group1", password: "test123"){
    user
    token
    isLoggedIn
  }
}
```

<a href="http://localhost:2104/graphiql?query=query%20%7B%0A%20%20auth(endpoint%3A%20%22http%3A%2F%2Fgiv-project8.uni-muenster.de%22%2C%20user%3A%20%22group10%22%2C%20password%3A%20%22test123%22)%20%7B%0A%20%20%20%20user%0A%20%20%20%20token%0A%20%20%20%20isLoggedIn%0A%20%20%7D%0A%7D" target="_blank">run in graphiql</a>

#### User data

```graphql
query {
  auth(endpoint: "http://giv-project8.uni-muenster.de", user: "group1", password: "test123"){
    isLoggedIn
  },
  user(id: "group10"){
	  processGraphs,
    credits,
    files{
      size,
      name
    }
    services{
      service_args,
      job_id
    },
    jobs{
      job_id,
      submitted,
      consumed_credits
    }
  }
}
```

<a href="http://localhost:2104/graphiql?query=query%20%7B%0A%20%20auth(endpoint%3A%20%22http%3A%2F%2Fgiv-project8.uni-muenster.de%22%2C%20user%3A%20%22group1%22%2C%20password%3A%20%22test123%22)%20%7B%0A%20%20%20%20isLoggedIn%0A%20%20%7D%0A%20%20user(id%3A%20%22group10%22)%7B%0A%09%20%20processGraphs%2C%0A%20%20%20%20credits%2C%0A%20%20%20%20files%7B%0A%20%20%20%20%20%20size%2C%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20services%7B%0A%20%20%20%20%20%20service_args%2C%0A%20%20%20%20%20%20job_id%0A%20%20%20%20%7D%2C%0A%20%20%20%20jobs%7B%0A%20%20%20%20%20%20job_id%2C%0A%20%20%20%20%20%20submitted%2C%0A%20%20%20%20%20%20consumed_credits%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D" target="_blank">run in graphiql</a>

Somehow you need to hit two times run to retrieve all of the data

#### Data

```graphql
query {
  auth(endpoint: "http://giv-project8.uni-muenster.de", user: "group1", password: "test123"){
    isLoggedIn
  },
  data(id: "ASTER/AST_L1T_003"){
    source,
    description,
    product_id
  },
  #this would query all data
  #data{
  #  source,
  #  description,
  #  product_id
  #}
}
```

<a href="http://localhost:2104/graphiql?query=query%20%7B%0A%20%20auth(endpoint%3A%20%22http%3A%2F%2Fgiv-project8.uni-muenster.de%22%2C%20user%3A%20%22group10%22%2C%20password%3A%20%22test123%22)%7B%0A%20%20%20%20isLoggedIn%0A%20%20%7D%2C%0A%20%20data(id%3A%20%22ASTER%2FAST_L1T_003%22)%7B%0A%20%20%20%20source%2C%0A%20%20%20%20description%2C%0A%20%20%20%20product_id%0A%20%20%7D%2C%0A%20%20%23this%20would%20query%20all%20data%0A%20%20%23data%7B%0A%20%20%23%20%20source%2C%0A%20%20%23%20%20description%2C%0A%20%20%23%20%20product_id%0A%20%20%23%7D%0A%7D" target="_blank">run in graphiql</a>

#### Processes

```graphql
query {
  auth(endpoint: "http://giv-project8.uni-muenster.de", user: "group10", password: "test123"){
    isLoggedIn
  },
  processes(id: "max_time") {
    process_id
    description
  }
  #this would query all processes
  #processes{
  #  process_id
  #  description
  #}
}
```

<a href="http://localhost:2104/graphiql?query=query%20%7B%0A%20%20auth(endpoint%3A%20%22http%3A%2F%2Fgiv-project8.uni-muenster.de%22%2C%20user%3A%20%22group10%22%2C%20password%3A%20%22test123%22)%7B%0A%20%20%20%20isLoggedIn%0A%20%20%7D%2C%0A%20%20processes(id%3A%20%22max_time%22)%20%7B%0A%20%20%20%20process_id%0A%20%20%20%20description%0A%20%20%7D%0A%20%20%23this%20would%20query%20all%20processes%0A%20%20%23processes%7B%0A%20%20%23%20%20process_id%0A%20%20%23%20%20description%0A%20%20%23%7D%0A%7D" target="_blank">run in graphiql</a>


#### Combination

Here is a combination of all possible queries. This will trigger
multiple requests on the server, but for you it will be combined into one requests. You can just strip out unneeded queries, but keep in mind to use the auth query at least once if you want to query data beside capabilities.


```graphql
{
  auth(endpoint: "http://giv-project8.uni-muenster.de", user: "group1", password: "test123"){
    user
    token
    isLoggedIn
  },
  user(id: "group10"){
	  processGraphs,
    credits,
    files{
      size,
      name
    }
    services{
      service_args,
      job_id
    },
    jobs{
      job_id,
      submitted,
      consumed_credits
    }
  }
  capabilities {
  	api,
    services,
    formats{
      default,
      formats
    }
  },
  data(id: "ASTER/AST_L1T_003"){
    source,
    description,
    product_id
  },
  #this would query all data
  #data{
  #  source,
  #  description,
  #  product_id
  #},
  processes(id: "max_time") {
    process_id
    description
  }
  #this would query all processes
  #processes{
  #  process_id
  #  description
  #}
}
```

<a href="http://localhost:2104/graphiql?query=%7B%0A%20%20auth(endpoint%3A%20%22http%3A%2F%2Fgiv-project8.uni-muenster.de%22%2C%20user%3A%20%22group1%22%2C%20password%3A%20%22test123%22)%7B%0A%20%20%20%20user%0A%20%20%20%20token%0A%20%20%20%20isLoggedIn%0A%20%20%7D%2C%0A%20%20user(id%3A%20%22group10%22)%7B%0A%09%20%20processGraphs%2C%0A%20%20%20%20credits%2C%0A%20%20%20%20files%7B%0A%20%20%20%20%20%20size%2C%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20services%7B%0A%20%20%20%20%20%20service_args%2C%0A%20%20%20%20%20%20job_id%0A%20%20%20%20%7D%2C%0A%20%20%20%20jobs%7B%0A%20%20%20%20%20%20job_id%2C%0A%20%20%20%20%20%20submitted%2C%0A%20%20%20%20%20%20consumed_credits%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20capabilities%20%7B%0A%20%20%09api%2C%0A%20%20%20%20services%2C%0A%20%20%20%20formats%7B%0A%20%20%20%20%20%20default%2C%0A%20%20%20%20%20%20formats%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20data(id%3A%20%22ASTER%2FAST_L1T_003%22)%7B%0A%20%20%20%20source%2C%0A%20%20%20%20description%2C%0A%20%20%20%20product_id%0A%20%20%7D%2C%0A%20%20%23this%20would%20query%20all%20data%0A%20%20%23data%7B%0A%20%20%23%20%20source%2C%0A%20%20%23%20%20description%2C%0A%20%20%23%20%20product_id%0A%20%20%23%7D%2C%0A%20%20processes(id%3A%20%22max_time%22)%20%7B%0A%20%20%20%20process_id%0A%20%20%20%20description%0A%20%20%7D%0A%20%20%23this%20would%20query%20all%20processes%0A%20%20%23processes%7B%0A%20%20%23%20%20process_id%0A%20%20%23%20%20description%0A%20%20%23%7D%0A%7D" target="_blank">run in graphiql</a>

Note: you need to hit play twice to fetch the uploaded files

### Mutations

Mutations are like queries but are meant to manipulate data on the server. They also are able to return data like queries.

#### Register


```graphql
mutation {
  register(password: "supersecret23")
}
```

<a href="http://localhost:2104/graphiql?query=mutation%20%7B%0A%09register(password%3A%20%22supersecret23%22)%0A%7D%0A" target="_blank">run in graphiql</a>

#### Image Collection

For this mutation you need to run the `auth` query first

```graphql
mutation ($bbox: JSON, $time: JSON, $ndvi: JSON) {
  imageCollection(
    collectionId: "COPERNICUS/S2", 
    outputFormat: "png", 
    bbox: $bbox
  	time: $time
    ndvi: $ndvi,
    maxTime: true
  )
}
```

variables:

```JSON
{
  "bbox": {
    "left": 16.138916,
    "top": 48.320647,
    "right": 16.524124,
    "bottom": 48.1386,
    "srs": "EPSG:4326"
  },
  "time": {
    "start": "2018-01-01",
    "end": "2018-01-31"
  },
  "ndvi": {
    "red": "B4",
    "nir": "B8"
  }
}
```

<a href="http://localhost:2104/graphiql?query=mutation%20(%24bbox%3A%20JSON%2C%20%24time%3A%20JSON%2C%20%24ndvi%3A%20JSON)%20%7B%0A%20%20imageCollection(%0A%20%20%20%20collectionId%3A%20%22COPERNICUS%2FS2%22%2C%20%0A%20%20%20%20outputFormat%3A%20%22png%22%2C%20%0A%20%20%20%20bbox%3A%20%24bbox%0A%20%20%09time%3A%20%24time%0A%20%20%20%20ndvi%3A%20%24ndvi%2C%0A%20%20%20%20maxTime%3A%20true%0A%20%20)%0A%7D%0A&variables=%7B%0A%20%20%22bbox%22%3A%20%7B%0A%20%20%20%20%20%22left%22%3A%2016.138916%2C%0A%20%20%20%20%20%22top%22%3A%2048.320647%2C%20%0A%20%20%20%20%20%22right%22%3A%2016.524124%2C%20%0A%20%20%20%20%20%22bottom%22%3A%2048.138600%2C%20%0A%20%20%20%20%20%22srs%22%3A%20%22EPSG%3A4326%22%0A%20%20%7D%2C%0A%20%20%22time%22%3A%20%7B%0A%20%20%20%20%22start%22%3A%20%222018-01-01%22%2C%0A%20%20%20%20%22end%22%3A%20%222018-01-31%22%0A%20%20%7D%2C%0A%20%20%22ndvi%22%3A%20%7B%0A%20%20%20%20%20%22red%22%3A%20%22B4%22%2C%0A%20%20%20%20%20%22nir%22%3A%20%22B8%22%20%0A%20%20%7D%0A%7D%0A" target="_blank">run in graphiql</a>

Note: currently the download of the result is not working!

### Subscriptons

run this subscription in another browser window and you will receive a websocket notification, each time another browser window runs the `auth` query.

```graphql
subscription {
  userLoggedIn
  #you can also listen to a specific user
  #userLoggedIn(user: "group1")
}
```

<a href="http://localhost:2104/graphiql?query=subscription%20%7B%0A%20%20userLoggedIn%0A%20%20%23you%20can%20also%20listen%20to%20a%20specific%20user%0A%20%20%23userLoggedIn(user%3A%20%22group1%22)%0A%7D" target="_blank">run in graphiql</a>


run this subscription in another browser window and you will receive a websocket notification, each time another browser window runs the `register` mutation.

```graphql
subscription{
  userRegistered
}
```

<a href="http://localhost:2104/graphiql?query=subscription%7B%0A%20%20userRegistered%0A%7D" target="_blank">run in graphiql</a>