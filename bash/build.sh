export WE_MY_PROJECTS="/c/Program Files (x86)/Steam/steamapps/common/wallpaper_engine/projects/myprojects"
export GALLERY_PROJECT="gallery"
export PROJECT_FILE="project.json"
export PREVIEW_FILE="preview.jpg"

while getopts sec option; do
  case $option in
    s)
    # Start
      sh bash/copyWEProjectFilesToPublic.sh
      sh bash/clearWEProject.sh
      ;;
    e)
    # End
      sh bash/copyDistToWEProject.sh
      ;;
    c)
    # Copy project files
      sh bash/copyWEProjectFilesToPublic.sh
      ;;
    \?)
      echo "Error: Invalid option"
      exit;;
  esac
done
