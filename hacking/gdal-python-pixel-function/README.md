## Setup environment and variables

* Setup conda environment
```bash
conda env create -f env.yml
```
* Activate environment
```bash
source activate open_EO_gdal
```
* Within the loaded environment, setup gdal variables necessary to execute python code within .vrt files
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
