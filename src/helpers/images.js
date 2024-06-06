export const toBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}

export const resizeImage = (imgFile, imgWidth, imgHeight) => {
  const imgToResize = new Image()
  imgToResize.src = imgFile
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  canvas.width = imgWidth
  canvas.height = imgHeight  
  context.drawImage(imgToResize, 0, 0, imgWidth, imgHeight)
  return canvas.toDataURL()
}