#!/bin/bash

if [ ! -e utils/header ]; then
    echo "Error, cannot find header, make sure you're calling this from the root dir" 1>&2
    exit 1
fi


function handleArgs {
for ARG in "$@"; do
    if [ -f "$ARG" ]; then
        cp "$ARG" "$ARG".\$tmp
        cat utils/header "$ARG".\$tmp > "$ARG"
        rm "$ARG".\$tmp
    elif [ -d "$ARG" ]; then
        handleArgs "$ARG"/*
    else
        echo "$ARG is not a regular file or folder" 1>&2
    fi
done
}

handleArgs "$@"
