import glob
import os
import sys

if(sys.argv[1] == "-a"):
	list_of_files = glob.glob('/srv/http/website/videos/*.webm')
elif(sys.argv[1] == "-v"):
	list_of_files = glob.glob('/srv/http/website/videos/*.mp4')
latest_file = max(list_of_files, key=os.path.getctime)
latest_file_new = latest_file
latest_file_new = latest_file_new.replace(" ", "")
latest_file_new = latest_file_new.replace("'", "")

if(sys.argv[1] == "-a"):
	latest_file_new = latest_file_new.replace(".webm", ".mp3")
	latest_file_new = latest_file_new.replace(".m4a", ".mp3")

os.rename(latest_file, latest_file_new)
