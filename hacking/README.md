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
