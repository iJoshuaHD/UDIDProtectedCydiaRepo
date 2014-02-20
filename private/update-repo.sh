#!/bin/bash

dpkg-scanpackages -m . >Packages

rm -f Packages.bz2 && bzip2 Packages
