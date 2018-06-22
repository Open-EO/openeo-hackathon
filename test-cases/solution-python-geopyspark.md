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

## Task 2

Requesting the processes offered by the back-end:
```{python}
session.get_all_processes()
```

Requesting the arguments required for the ndvi process:
```{python}
session.get_process('NDVI')
```

Requesting the products offered by the back-end:
```{python}
session.list_collections()
```

Requesting information about the Sentinel-2 dataset, including the temporal and spatial extent:
```{python}
collection = session.get_collection("CGS_SENTINEL2_RADIOMETRY_V101")
collection["extent"]
collection["time"]
```

## Task 3

First of all, requesting the supported file formats to see whether PNG or GeoTiff (GTiff) is supported and color stretching is required for PNG files or not:
```{python}
session.get_outputformats()
```

Only Geotiff files are supported.

For the construction of the process graph we need the following steps:

1. Construct the process graph builder
2. Specify the required dataset (`CGS_SENTINEL2_RADIOMETRY_V101`)
3. Filtering by date range
4. Filtering by bounding box
5. Calculating the NDVI on the red band B4 and the near-infrared band B8
6. Computing a minimum time composite
7. Strecthing the colors
8. Executing the process graph on the back-end, requesting a PNG file with the name `task_3_out.png`

We define the parameters:
```{python}
product = "CGS_SENTINEL2_RADIOMETRY_V101"
bbox = {
    "left": 16.138916, 
    "top": 48.320647, 
    "right": 16.524124, 
    "bottom": 48.138600, 
    "srs": "EPSG:4326"
}
time = {
    "start": "2018-01-01",
    "end": "2018-01-31"
}
ndvi = {
    "red": "B4",
    "nir": "B8"
}
stretch = {
    "min": -1,
    "max": 1
}
out_format = "GTIFF"
```
We are building the process graph as follows:
```{python}
product = "CGS_SENTINEL2_RADIOMETRY_V101"

s2a_prd_msil1c = session.image(product)
timeseries = s2a_prd_msil1c.bbox_filter(left=bbox["left"], right=bbox["right"], top=bbox["top"], bottom=bbox["bottom"], srs=bbox["srs"])
timeseries = timeseries.date_range_filter(time["start"], time["end"])
timeseries = timeseries.ndvi(ndvi["red"], ndvi["nir"])
timeseries = timeseries.min_time()
timeseries = timeseries.stretch_colors(stretch["min"], stretch["max"])

# Send Job to back end.
job = timeseries.send_job(out_format=out_format)
out_file = "task_3_out.png"
# download result from back end.
job.download(out_file)
```

## Task 4

Checking if the process `zonal_statistics` is provided by the back-end:
```{python}
session.get_process('zonal_statistics')
```

If you haven't done so yet, download the GeoJSON file containing the poylgon:
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

Uploading the GeoJSON file containing the poylgon:
```{python}
session.user_upload_file(polygon_dir)
```

Construct and execute the process graph. Downloads the file in JSON format with the file name `task_4.json`:
```{python}
s2a_prd_msil1c = session.image(product)
timeseries = s2a_prd_msil1c.date_range_filter(time["start"], time["end"])
timeseries = timeseries.bbox_filter(left=bbox["left"], right=bbox["right"], top=bbox["top"], bottom=bbox["bottom"], srs=bbox["srs"])
timeseries = timeseries.band_filter(bands)
timeseries = timeseries.zonal_statistics(regions=zonal_statistics["regions"], func=zonal_statistics["func"])

job = timeseries.send_job(out_format=out_format)

out_file = "task_4.json"
job.download(out_file)
```

## Task 5

TBD
