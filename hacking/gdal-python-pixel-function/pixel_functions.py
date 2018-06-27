import numpy as np

def add(in_ar, out_ar, xoff, yoff, xsize, ysize, raster_xsize, raster_ysize, buf_radius, gt, **kwargs):
    min_val = 0
    max_val = 2**16 # for 16bit images
    #max_val = 2**8 # for 8bit images
    np.round_(np.clip(np.sum(in_ar, axis = 0, dtype = 'Float32'),min_val,max_val), out = out_ar)

def multiply(in_ar, out_ar, xoff, yoff, xsize, ysize, raster_xsize, raster_ysize, buf_radius, gt, **kwargs):
    #factor = float(kwargs['factor'])
    factor = np.float(1.5)
    min_val = 0
    max_val = 2**16 # for 16bit images
    #max_val = 2**8 # for 8bit images
    out_ar[:] = np.round_(np.clip(in_ar[0] * factor,min_val,max_val))
