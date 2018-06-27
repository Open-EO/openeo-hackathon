from osgeo import gdal
import xml.etree.cElementTree as ET

def get_info_vrt(in_vrt):
    """
    """

    # Create gdal dataset
    ds = gdal.Open(in_vrt)

    # Get projection
    projection = ds.GetProjection()

    # Get geotransfrom
    geotransform = ds.GetGeoTransform()

    # Get raster size
    raster_size_x = ds.RasterXSize
    raster_size_y = ds.RasterYSize

    return projection, geotransform, raster_size_x, raster_size_y

def write_vrt(in_files, out_vrt, proj, geoT, rast_x, rast_y, function_name):
    """
    """

    # Create root tag
    root = ET.Element('VRTDataset', {'rasterXSize':str(rast_x), 'rasterYSize':str(rast_y)})

    # Add projection tag_list
    srs = ET.SubElement(root, 'SRS')
    srs.text = proj

    # Add geotransform tag
    geotransform_tag = ET.SubElement(root, 'GeoTransform')
    geotransform_tag.text = str(geoT)[1:-1] # slicing needed to remove parentheses

    # Add derivedRasterBand tag to root tag
    data_type = 'Float32' # 'Byte'
    dict_attr = {'dataType':data_type, 'band':'1', 'subClass':'VRTDerivedRasterBand'}
    raster_band_tag = ET.SubElement(root, 'VRTRasterBand', dict_attr)

    # Add childern tags to derivedRasterBand tag
    pix_func_tag = ET.SubElement(raster_band_tag, 'PixelFunctionType')
    pix_func_tag.text = function_name

    pix_func_tag2 = ET.SubElement(raster_band_tag, 'PixelFunctionLanguage')
    pix_func_tag2.text = 'Python'

    for file in in_files:
        source_tag1 = ET.SubElement(raster_band_tag, 'SimpleSource')
        source_tag2 = ET.SubElement(source_tag1, 'SourceFilename', {'relativeToVRT':'1'})
        source_tag2.text = file

    # Write xml to disk
    ET.ElementTree(root).write(out_vrt)



def build_vrt(in_vrts, out_vrt, pixel_function):
    """
    in_vrts must be a list
    out_vrt must be a path/to/filename.vrt
    """

    projection, geotransform, raster_size_x, raster_size_y = get_info_vrt(in_vrts[0])

    write_vrt(in_vrts, out_vrt, projection, geotransform, raster_size_x, raster_size_y, pixel_function)
