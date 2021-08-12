//Importing modules for working on images
import express from 'express';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';


//Middleware for generating resized images 
const reader = (
	req: express.Request,
	res: express.Response,
	next: Function
): void => {
    //Assigning request properties to variables
	let name: string = req.query.name as string;
	let width: number = parseInt(req.query.width as string);
	let height: number = parseInt(req.query.height as string);
    //Building an output file with its own name
	let pathOutput: string =
		'./images/full/sized/' + width + ',' + height + ',' + name + '.jpg';
    
    //Functon for generating a resized image with the previous properties to the defined output
	const fileResize = async (
		name: string,
		width: number,
		height: number
	): Promise<void> => {
        //Using sharp and its structure
		await sharp('./images/full/' + name + '.jpg')
			.resize(width, height)
			.toFile(pathOutput)
			.catch(err => {
				throw err;
			});
	};
    //Function wich allow processing only if the generated image already exists
	const toProcess = async (pathTo: string): Promise<void> => {
		try {
            //We try to read if the image already exists
			const files = await fsPromises.readFile(pathTo);
			next();
		} catch (err) {
            //If the file do not exist, we resize otherwize it is a common error
			if (err.code == 'ENOENT') {
				await fileResize(name, width, height);
				next();
			} else {
				throw err;
			}
		}
	};
	toProcess(pathOutput);
};

//Exporting to us as a Middleware
export default reader;
