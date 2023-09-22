export WE_MY_PROJECTS="/c/Program Files (x86)/Steam/steamapps/common/wallpaper_engine/projects/myprojects"
export GALLERY_PROJECT="gallery"
export PROJECT_FILE="project.json"

while getopts se option; do
  case $option in
    s)
      sh bash/copyWEProjectJsonToPublic.sh
      sh bash/clearWEProject.sh
      ;;
    e)
      sh bash/copyDistToWEProject.sh
      ;;
    \?)
      echo "Error: Invalid option"
      exit;;
  esac
done
