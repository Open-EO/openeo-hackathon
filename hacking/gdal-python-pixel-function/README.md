## Intro

This example shows how to use gdal pixel functions written in python within a .vrt file (http://www.gdal.org/gdal_vrttut.html#gdal_vrttut_derived_python), including setting up a working conda environment with the necessary gdal variables.

Contributors: Luca Foresta and Sophie Hermann


## Setup environment and variables

* Setup conda environment
```bash
conda env create -f env.yml
```
* Activate environment
```bash
source activate open_EO_gdal
```
* Within the loaded environment, setup gdal variables necessary to execute python code within .vrt files. These variables are set when the conda env is activated and unset when it is deactivated.
(See e.g. here: https://conda.io/docs/user-guide/tasks/manage-environments.html under 'Saving environment variables')
Locate the conda environment folder (e.g. by typing 'which python') and do the following:
```bash
cd myconda_env_folder
mkdir -p ./etc/conda/activate.d
mkdir -p ./etc/conda/deactivate.d
touch ./etc/conda/activate.d/env_vars.sh
touch ./etc/conda/deactivate.d/env_vars.sh
```
Edit ./etc/conda/activate.d/env_vars.sh as follows:
```bash
#!/bin/sh

export GDAL_VRT_ENABLE_PYTHON='TRUSTED_MODULES'
export GDAL_VRT_PYTHON_TRUSTED_MODULES='pixel_functions'
```
Edit ./etc/conda/deactivate.d/env_vars.sh as follows:
```bash
#!/bin/sh

unset GDAL_VRT_ENABLE_PYTHON
unset GDAL_VRT_PYTHON_TRUSTED_MODULES
```

## Run Example

* Make sure the open_EO_gdal environment is active (see above)

* Open test_pixel_functions.py and input two path/to/georef-files as input

* Run the examples
```bash
python test_pixel_functions.py
```
Two vrt files will be generated in the current folder and displayed.
