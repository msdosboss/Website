import glob
import os
import sys

list_of_files = glob.glob('/srv/http/website/videos/*.webm') # * means all if need specific format then *.csv
latest_file = max(list_of_files, key=os.path.getctime)
latest_file_new = latest_file
latest_file_new = latest_file_new.replace(" ", "")
latest_file_new = latest_file_new.replace("'", "")

if(sys.argv[1] == "-a"):
    latest_file_new = latest_file_new.replace(".webm", ".mp3")

os.rename(latest_file, latest_file_new)