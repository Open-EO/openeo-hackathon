from create_vrt_derivedRasterBand import build_vrt

### These imports are only needed to load/display the output
import matplotlib.pyplot as plt
from osgeo import gdal
import numpy as np
###

in_file1 = '' # fullpath to georeferenced (e.g. vrt/tif/jp2) file
in_file2 = '' # fullpath to georeferenced (e.g. vrt/tif/jp2) file

out_file1 = '' # output vrt filename (no path)

out_file2 = '' # output vrt filename (no path)

# Example 1: Use pixel  function 'multiply'
build_vrt([in_file1], out_file1, 'pixel_functions.multiply')

# Load data from generated vrt file
ds1 = gdal.Open(out_file1)
data1 = ds1.ReadAsArray()
print(np.max(data1))

plt.imshow(data1, cmap='gray')
plt.colorbar()
plt.show()

# Example 2: Use pixel  function 'add'
build_vrt([in_file1, in_file2], out_file2, 'pixel_functions.add')

# Load data from generated vrt file
ds2 = gdal.Open(out_file2)
data2 = ds2.ReadAsArray()
print(np.max(data2))

plt.imshow(data2, cmap='gray')
plt.colorbar()
plt.show()
