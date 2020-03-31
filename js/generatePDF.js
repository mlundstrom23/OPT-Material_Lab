// Generate PDF of model
function generate_pdf()
{
	// Dimensions of page are in different units from font size/spacing units
	const pdf = new jsPDF('p', 'mm', [605, 665])

	// Get image from canvas
	var canvas = document.querySelector('#cjcwrap canvas');
	var previewImage = canvas.toDataURL("image/png");

	// Setting variables for details we need for PDF
	const model_name = document.getElementById('ifilename').innerText;
	const bounding_box = document.getElementById('isize').innerText;
	const volume = document.getElementById('ivol').innerText;
	const printing_time = document.getElementById('itime').innerText;
	const printing_speed = document.getElementById('ispeed').innerText;
	const material_resin = document.getElementById(document.getElementById('material1').value).text; // this is a select
	const price_estimate = document.getElementById('esprice1').innerText;

	// Testing to see if details come out when inspecting "Download As PDF" link
	/* console.log({
		model_name, bounding_box, volume, printing_time, printing_speed, material_resin, price_estimate, previewImage
	}) */

	// Bunching details together in an object to put in for each loop later
	const basicDetails = { model_name, bounding_box, volume }
	const printingDetails = { printing_time, printing_speed }
	const materialDetails = { material_resin }
	const priceDetails = { price_estimate }

	// Header for main page
	pdf.setFontSize(40)
							// x, y - position
	pdf.text(`INSTANT QUOTE`, 65, 23)
				
	// Header for each object
	pdf.setFontSize(20)
	pdf.text('Model Info:', 15, 50)
				
	/* Will loop through each detail "key" in object for each index = "i" 
	For each index, the loop will capitalize every letter for each key and replace underscore with space
	It will also add a space of 10 units between each key for each index */
	pdf.setFontSize(10)
	Object.keys(basicDetails).forEach((k, i) => {
		pdf.text(`${k.toUpperCase().replace('_', ' ')}: ${basicDetails[k]}`, 15, 60 + (10 * i)) // Last line is y = 80
	})

	pdf.setFontSize(20)
	pdf.text('Printing Info:', 15, 100)
	
	pdf.setFontSize(10)
	Object.keys(printingDetails).forEach((k, i) => {
		pdf.text(`${k.toUpperCase().replace('_', ' ')}: ${printingDetails[k]}`, 15, 110 + (10 * i)) // Last line is y = 120
	})

	pdf.setFontSize(20)
	pdf.text('Material Info:', 15, 140)
				
	pdf.setFontSize(10)
	Object.keys(materialDetails).forEach((k, i) => {
		pdf.text(`${k.toUpperCase().replace('_', ' ')}: ${materialDetails[k]}`, 15, 150 + (10 * i)) // Last line is y = 160
	})

	pdf.setFontSize(20)
	pdf.text('Price Info:', 15, 170)
				
	pdf.setFontSize(10)
	Object.keys(priceDetails).forEach((k, i) => {
		pdf.text(`${k.toUpperCase().replace('_', ' ')}: ${priceDetails[k]}`, 15, 180 + (10 * i)) // Last line is y = 190
	})

				// image URI data so jsPDF can identify it to pdf.addImage function
	const logo = 'data:image/png;base64,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'

	pdf.addImage(
		logo,
		'PNG',
		15, // x
		5, // y
		36, // width
		25 // height
	)

	pdf.addImage(
		previewImage,
		'PNG',
		100, // x
		45, // y
		93, // width
		95 // height
	)

	pdf.setFontSize(8)
	pdf.text('© Copyright 2019. OPT Industries Inc. All rights reserved.', 30, 230)

	// Save the Instant Quote as PDF
	pdf.save('Instant-Quote.pdf')
}