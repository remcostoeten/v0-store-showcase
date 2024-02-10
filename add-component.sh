#!/bin/bash

# Function to check if a directory exists
check_directory() {
	if [ -d "$1" ]; then
		return 0 # Directory exists
	else
		return 1 # Directory does not exist
	fi
}

# Check if either "components/ui" or "src/components/ui" directories exist
if check_directory "components/ui"; then
	COMPONENTS_DIR="components/ui"
elif check_directory "src/components/ui"; then
	COMPONENTS_DIR="src/components/ui"
else
	# If none of the directories exist, ask the user to create one
	read -p "Neither 'components/ui' nor 'src/components/ui' directories found. Do you want to create 'components/ui'? (y/n): " create_dir
	if [ "$create_dir" == "y" ] || [ "$create_dir" == "Y" ]; then
		mkdir -p "components/ui"
		COMPONENTS_DIR="components/ui"
	else
		echo "Aborted. Please create the necessary directory manually and run the script again."
		exit 1
	fi
fi

# Run the npx shadcn-ui@latest add command with the provided component name
npx shadcn-ui@latest add $1

# Run the script to update the ui-imports.tsx file
node update-imports.js $COMPONENTS_DIR
