# openEO Hackathon - Solution Python client / GeoPyspark back-end

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
