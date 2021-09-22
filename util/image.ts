import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";

export function imageToTensor(rawImageData: Uint8Array): tf.Tensor3D {
	const { width, height, data } = jpeg.decode(rawImageData);
	// Drop the alpha channel info, we don't need it.
	const buffer = new Uint8Array(width * height * 3);
	let offset = 0; // offset into original data
	for (let i = 0; i < buffer.length; i += 3) {
		buffer[i] = data[offset];
		buffer[i + 1] = data[offset + 1];
		buffer[i + 2] = data[offset + 2];

		offset += 4;
	}
	return tf.tensor3d(buffer, [height, width, 3]);
}

export function base64ImageToTensor(base64: string): tf.Tensor3D {
	const rawImageData = tf.util.encodeString(base64, "base64");
	return imageToTensor(rawImageData);
}
