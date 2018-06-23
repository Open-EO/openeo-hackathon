# openEO Hackathon - Solution Python client / GeoPyspark back-end

## Task 1

* Prerequisites: Python 3.5, pip
* Clone/Download: [openeo-python-client](https://github.com/Open-EO/openeo-python-client)
* Hint: Use [anaconda](https://anaconda.org/anaconda/python) for python versioning
* Recommendation: Use Linux based operating system.

Installing and loading the required packages, in your console:
```{bash}
# inside the project directory
pip install -r requirements.txt
pip install -r requirements-dev.txt
pip install --user -e .
```

Connecting to the openEO GeoPyspark back-end:
```{python}
import openeo
endpoint = "http://openeo.vgt.vito.be/openeo"
session = openeo.session("me", endpoint=endpoint)
```

Requesting the capabilities that are provided by the back-end:
```{python}
session.list_capabilities()
```

Requesting the supported file formats to see whether GeoTiff (GTiff) or not:
```{python}
session.get_outputformats()
```

## Task 2

Requesting the processes offered by the back-end:
```{python}
session.get_all_processes()
```

Requesting the arguments required for the ndvi process is **currently not supported** by the GeoPyspark back-end, but the call would be:
```{python}
# session.get_process('NDVI')
```

Requesting the products offered by the back-end:
```{python}
session.list_collections()
```

Requesting information about the Sentinel-2 dataset, including the temporal and spatial extent, is **currently not supported** by the GeoPyspark back-end, but the calls would be:
```{python}
# collection = session.get_collection("COPERNICUS/S2")
# collection["extent"]
# collection["time"]
```

## Task 4

If you haven't done so yet, download [the GeoJSON file containing the polygon](polygon.json) into the working directory of the Python client.

Construct and execute the process graph. The execute call is synchronous, so it computes the time series on the fly:
```{python}
from shapely.geometry import asShape
import json

with open("polygon.json","r") as f:
    polygon = asShape(json.load(f))

image_collection = session \
    .imagecollection('PROBAV_L3_S10_TOC_NDVI_333M') \
    .date_range_filter(start_date="2017-11-01", end_date="2017-11-30")

timeseries = image_collection.zonal_statistics(polygon,'mean').execute()
```

## Task 5

If you haven't done so yet, download [the UDF file containing Python code to calculate the NDVI](raster_collections_ndvi.py) to the working directory of the Python client.

Connect to the back-end as described in task 1. Request information about available products and processes as shown in task 2.

After connecting to the back-end, we are building the process graph and downloading the file to disk:
```{python}
import openeo
import os

bbox = {
    "left": 6.8371137,
    "top": 50.5647147,
    "right": 6.8566699,
    "bottom": 50.560007,
    "srs": "EPSG:4326"
}
time = {
    "start": "2017-10-10",
    "end": "2017-10-30"
}

session = openeo.session("me", endpoint="http://openeo.vgt.vito.be/openeo")
with open("raster_collections_ndvi.py", "r")  as f:
    udf_code = f.read()
    image_collection = session.image("CGS_SENTINEL2_RADIOMETRY_V101") \
                .date_range_filter(start_date=time["start"], end_date=time["end"]) \
                .bbox_filter(left=bbox["left"],right=bbox["right"],bottom=bbox["bottom"],top=bbox["top"],srs=bbox["srs"]) \
                .apply_tiles(udf_code) \
                .max_time() \
                .download("task_5_out.geotiff", "GTIFF")
```
