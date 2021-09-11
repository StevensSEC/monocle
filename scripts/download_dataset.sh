#!/bin/bash
set -euxo pipefail

cd "$(dirname "$0")/.."

DATA_DIR="$(pwd)/data"
DATASET_TRAIN_URL="${DATASET_TRAIN_URL-http://images.cocodataset.org/zips/train2014.zip}" # mirror: https://pjreddie.com/media/files/train2014.zip
DATASET_VALIDATION_URL="${DATASET_VALIDATION_URL-http://images.cocodataset.org/zips/val2014.zip}" # mirrpr: https://pjreddie.com/media/files/val2014.zip
DATASET_LABELS_URL="${DATASET_LABELS_URL-https://vision.cornell.edu/se3/wp-content/uploads/2019/05/COCO_Text.zip}"
DATASET_ANNOTATIONS_URL="${DATASET_ANNOTATIONS_URL-https://github.com/bgshih/cocotext/releases/download/dl/cocotext.v2.zip}"

echo "Downloading dataset into $DATA_DIR"
mkdir -p "$DATA_DIR"

wget --continue --no-clobber --show-progress --directory-prefix="$DATA_DIR" "$DATASET_TRAIN_URL" "$DATASET_VALIDATION_URL" "$DATASET_LABELS_URL" "$DATASET_ANNOTATIONS_URL"

md5sum --check data/checksums.md5

echo unzipping...
unzip data/train2014.zip -d data/ -o
unzip data/val2014.zip -d data/ -o
unzip data/COCO_Text.zip -d data/ -o
unzip data/cocotext.v2.zip -d data/ -o
