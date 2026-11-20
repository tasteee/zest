import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZImageCropperDoc = () => (
	<ComponentDoc
		tag="z-image-cropper"
		category="Forms"
		description="Frame part of an image: drag, zoom or use the keys, then export the crop."
	>
		<DocExample
			demo="z-image-cropper/crop-an-avatar"
			title="Crop an avatar"
			description="shape="circle" rounds the frame and exports with transparent corners."
		/>
		<DocExample
			demo="z-image-cropper/export-the-crop"
			title="Export the crop"
			description="toDataURL(), toBlob() and toCanvas() cut the image at the current frame. change fires when a move ends."
		/>
	</ComponentDoc>
)
