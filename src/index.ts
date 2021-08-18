//            ===================================
//
//Description :
//            This work respond to the Project : Image Processing API
//       of the first lesson of Becoming a Full Stack JavaScript Developer entitled :
//       Backend Development with Node.js and mostly follow the attended steps.
//       see : Guide.ipynb
//
//Example of usable endpoint :
//            /api/images?name=fjord&width=500&height=500
//
//            ====================================
//
//Importing express package an the middleware "reader.ts"
import express, { Request, Response } from 'express';
import reader from './utilities/reader';gi
import path from 'path';

//Selecting a port and initializing app
const app = express();
const port = 3000;

//Display the picture (name) with the needed dimensions specified in the url (width, height)
app.get('/api/images', reader, (req: Request, res: Response) => {

	res.sendFile(
		path.resolve('images/full/sized') +
			'/' +
			req.query.width +
			',' +
			req.query.height +
			',' +
			req.query.name +
			'.jpg'
	);
    

});

//Print the port when the server is ready to use
app.listen(port, () => {
	console.log('listening to port : ' + port);
});

//Exporting app for endpoint test
export default app;
