export const toBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}

export const resizeImage = (imgFile, imgWidth, imgHeight) => {
  return new Promise((resolve, reject) => {
    const imgToResize = new Image()
    imgToResize.src = imgFile

    imgToResize.onload = () => {
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      canvas.width = imgWidth
      canvas.height = imgHeight
      context.drawImage(imgToResize, 0, 0, imgWidth, imgHeight)

      resolve(canvas.toDataURL())
    }  

    imgToResize.onerror = (error) => {
      reject(error)
    }  
  })
}