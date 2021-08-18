//Importing modules for working on images
import fileResize from './fileResize';
import express from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';

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
	let pathOutput: string = path.resolve(
		'images/full/sized/' + width + ',' + height + ',' + name + '.jpg'
	);

	//Function wich allow processing only if the generated image already exists
	const toProcess = async (pathTo: string): Promise<void> => {
		try {
			//We try to read if the image already exists
			await fsPromises.readFile(pathTo);
			next();
		} catch (err) {
			//If the file do not exist, we resize otherwize it is a common error
			if (err.code == 'ENOENT') {
				try {
					await fileResize(name, width, height, pathOutput);
					next();
				} catch (err) {
                    next(err);
				}
			}
		}
	};
	toProcess(pathOutput);
};

//Exporting to us as a Middleware
export default reader;
