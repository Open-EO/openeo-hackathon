# Hacking

Please feel free to add folders here for your hacking projects. Do this by forking this repository and wowkring on your forked repository. Add a folder to this folder in your repository and after your work publish your work in your repository and afterwards send a pull request to make your changes available in this central repository.

## Ideas

The following list are proposals for possible features or extensions of openEO. You can either work on your own ideas or on one of the proposals: 

* [OpenID Connect](https://openid.net/connect/) [integration](https://open-eo.github.io/openeo-api/v/0.3.0/apireference/index.html#/Authentication/get_credentials_oidc): OpenID Connect is a mechanism to authenticate and authorize users against a service provider. openEO uses this protocol, but hasn't yet implemented it in any back-end or front-end. 
* Process Graph Storage on client-side or sserver-side
* GraphQL Wrapper for openEO: GraphQL is an evolving technology that is an alternative for RESTful services. This feature proposal aims to investigate into to the feasibility to provide a GraphQL endpoint for openEO.
* Extending the JavaScript client library
* Implementing a framework for back-end compliance testing
* Implementing Job Management in the openEO Python client
* Adding Authentication to the openEO Python client
* Adding Delete File Feature (API: /users/{user_id}/files/{path} endpoint) to the openEO Python client
* Adding a User class to python client (maybe returned by session.auth()) to the openEO Python client
* Add Exception Handling / Error Handling (e.g. If a process is called, that is not implemented by the backend) to the openEO Python client. See API v0.3 for more information about error handling in the next version of openEO.
* Extend the GEE back-end to support other GEE scripts: Do you have any Google Earth Engine script you want to run with openEO? We may be able to add the required processes to the back-end and run your script via openEO.

## Results from the openEO Hackathon

### Projects

* [Codegeneration for openEO clients](codegen/)
* [GDAL pixel functions](gdal-python-pixel-function/)
* [GraphQL wrapper for openEO](openeo-graphql/)
* [Web Editor: Visual Process Graph Builder](web-editor-model-builder/)

### API issues

* [Datasets with disjoint extents](https://github.com/Open-EO/openeo-api/issues/101)
* [Debugging and getting intermediate result and metadata](https://github.com/Open-EO/openeo-api/issues/100)
* [xxx_time: Names for aggregate functions are misleading](https://github.com/Open-EO/openeo-api/issues/99)
* [ndvi: Name of the process](https://github.com/Open-EO/openeo-api/issues/98)
* [Common band names](https://github.com/Open-EO/openeo-api/issues/97)
* [Further references / links for data discovery and other parts of the API](https://github.com/Open-EO/openeo-api/issues/96)
* + contributions to existing issues.

### R Client issues

* [#20 Better error messages](https://github.com/Open-EO/openeo-r-client/issues/20)
* [#21 Making required packages optional](https://github.com/Open-EO/openeo-r-client/issues/21)
* [#22 Performance of describeCollection across OSs](https://github.com/Open-EO/openeo-r-client/issues/22)


### Python Client issues

* [#38 Merging session.image() and session.imagecollection()](https://github.com/Open-EO/openeo-python-client/issues/38)
* [#37 Pull Request](https://github.com/Open-EO/openeo-python-client/issues/37)
* [#36 Pull Request](https://github.com/Open-EO/openeo-python-client/issues/36)
* [#35 Improvement of displaying ImageCollection](https://github.com/Open-EO/openeo-python-client/issues/35)
* [#34 Adding possibiliy to visualize the process graph ](https://github.com/Open-EO/openeo-python-client/issues/34)
* [#33 Pull Request](https://github.com/Open-EO/openeo-python-client/issues/33)
* [#32 Adding error handling to user file handling ](https://github.com/Open-EO/openeo-python-client/issues/32)
* [#31 Pull Request](https://github.com/Open-EO/openeo-python-client/issues/31)
* [#30 Pull Request](https://github.com/Open-EO/openeo-python-client/issues/30)
* [#29 Different approach on building process graph (like Dask) ](https://github.com/Open-EO/openeo-python-client/issues/29)
* [#28 Pull Request](https://github.com/Open-EO/openeo-python-client/issues/28)
* [#27 UDF: rename function ](https://github.com/Open-EO/openeo-python-client/issues/27)
* [#26 NDVI calculation with UDF gives inconsistent results when image graph is constructed in parts ](https://github.com/Open-EO/openeo-python-client/issues/26)
* [#25 Using Python date/datetime ](https://github.com/Open-EO/openeo-python-client/issues/25)
* [#24 User feedback on adding a process ](https://github.com/Open-EO/openeo-python-client/issues/24)
* [#23 Error Handling: job.download ](https://github.com/Open-EO/openeo-python-client/issues/23)
* [#22 Imagery methods: Usabilitiy and User Input ](https://github.com/Open-EO/openeo-python-client/issues/22)
* [#21 Confusion: max_time, min_time ](https://github.com/Open-EO/openeo-python-client/issues/21)
* [#20 Confusion session.get_collection vs. session.imagecollection() ](https://github.com/Open-EO/openeo-python-client/issues/20)

Further Python Client implementations from the participants:
* Adding metadata to imagecollection
* Adding Unittests for the REST Session class
* Adding some functions to the ImageCollection
* Implementinon of a possible solution for visualizing the process graph

