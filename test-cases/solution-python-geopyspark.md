# openEO Hackathon - Solution Python client / GeoPyspark back-end

## Task 4

If you haven't done so yet, download the GeoJSON file containing the polygon:
```{python}
polygon_dir = "polygon.json"
polygon_url = "https://raw.githubusercontent.com/Open-EO/openeo-hackathon/master/test-cases/task-4/polygon.json"
with open(polygon_dir, 'wb') as handle:
    response = requests.get(polygon_url, stream=True)
    
    if not response.ok:
        print (response)

    for block in response.iter_content(1024):

        if not block:
            break
        handle.write(block)
```

Construct and execute the process graph. The execute call is synchronous, so it computes the time series on the fly:
```{python}
from shapely.geometry import asShape
import json

with open("polygon.json","r") as f:
    polygon = asShape(json.load(f))

session = rest_session.session(userid=None, endpoint=self._rest_base)

image_collection = session \
    .imagecollection('PROBAV_L3_S10_TOC_NDVI_333M') \
    .date_range_filter(start_date="2017-11-01", end_date="2017-11-30")

timeseries = image_collection.zonal_statistics(polygon,'mean').execute()
```

## Task 5
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

Requesting the processes offered by the back-end:
```{python}
session.get_all_processes()
```

Requesting the products offered by the back-end:
```{python}
session.list_collections()
```
There is Sentinel-2 data called `CGS_SENTINEL2_RADIOMETRY_V101`.

Requesting the supported file formats to see whether GeoTiff (GTiff) or not:
```{python}
session.get_outputformats()
```
GTiff is supported.

We are building the process graph and downloading the file to disk:
```{python}
dir = os.path.dirname(openeo_udf.functions.__file__)
file_name = os.path.join(dir, "raster_collections_ndvi.py")
with open(file_name, "r")  as f:
    udf_code = f.read()
    image_collection = session.image("CGS_SENTINEL2_RADIOMETRY_V101") \
                .date_range_filter(start_date="2018-01-01", end_date="2018-01-31") \
                .bbox_filter(left = 16.138916, right = 16.524124, bottom = 48.138600, top = 48.320647, srs = "EPSG:4326") \
                .apply_tiles(udf_code) \
                .min_time() \
                .download("task_3_out.geotiff", "GTIFF")
```
