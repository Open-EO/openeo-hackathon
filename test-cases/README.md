# Test Cases
To get a first insight in the setup and use of openEO, we start with some test cases. The test cases are mostly covering the basic functionality of the client libraries ([Python](https://github.com/Open-EO/openeo-python-client), [R](https://github.com/Open-EO/openeo-r-client)) and the [API](https://github.com/Open-EO/openeo-api). You can work on the test cases with the their own computers and with your preferred IDE/Editor. We are using two back-ends to perform these tasks.

## Task 1

Please install the openEO client of your choice:

* [Python client](https://github.com/Open-EO/openeo-python-client)
* [R client](https://github.com/Open-EO/openeo-r-client)

Make sure that the client is properly working by connecting to the [openEO Earth Engine back-end](https://github.com/Open-EO/openeo-earthengine-driver) and requesting the capabilities that are provided by the back-end. Credentials for a demo server may be provided in the [openEO Earth Engine back-end repository](https://github.com/Open-EO/openeo-earthengine-driver).

## Task 2

You want to know which products and processes are offered by the back-end. Please find this information. Furthermore, you want to know which temporal extent is available for a specific product (e.g. Sentinel-2) and which arguments need to be provided for the `ndvi` process.

## Task 3

You want to derive maximum NDVI measurements over pixel time series of Sentinel-2 data of Vienna. The extends that you are interested in:

* bounding box (left: 16.138916, top: 48.320647, right: 16.524124, bottom: 48.138600, EPSG:4326)
* temporal extent (01.01.2018 – 31.01.2018)

You want to download the results as PNG (with additional color stretching) or GeoTiff.

## Task 4

You want to compute time series of zonal statistics (arithmetic mean / average) of Sentinel-2 data using a predefined polygon. First of all you should check if the process `zonal_statistics` is provided by the back-end. Furthermore you need to upload [GeoJSON file containing the polygon](polygon.json). Use the following extents and band: 

* bounding box (left: 16.138916, top: 48.320647, right: 16.524124, bottom: 48.138600, EPSG:4326)
* temporal extent (01.01.2018 – 31.01.2018)
* band 8

You want to perform a batch processing and afterwards download the results as JSON.

## Task 5

*This task is currently only supported by the Python client and the openEO GeoPyspark back-end. If you are not familiar with Python feel free to skip this task.*

Make sure that the Python client is properly working by connecting to the [openEO GeoPyspark back-end](https://github.com/Open-EO/openeo-geopyspark-driver) and requesting the capabilities that are provided by the back-end.

- URL: http://openeo.vgt.vito.be/openeo
- Credentials: none

You want to find out which Sentinel-2 data is available at the back-end, as well as if the back-end provides User-Defined-Functions (UDFs). You want to run the [provided Python script](raster_collections_ndvi.py) on each time series of the dataset. The extents are defined by: 

- bounding box (left: 6.8371137, top: 50.5647147, right: 6.8566699, bottom: 50.560007, EPSG:4326)
- temporal extent (10.10.2017 – 30.10.2017)

You want to download the results as GeoTiff (GTiff).

## Solutions

* [R client / GEE back-end](solution-r-gee.rmd) (Tasks 1-4)
* [Python client / GEE back-end](solution-python-gee.md) (Tasks 1-4)
* [Python client / GeoPyspark back-end](solution-python-geopyspark.md) (Task 5)
