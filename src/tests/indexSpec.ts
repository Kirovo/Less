//TEST FILE

//Importing modules for testing
import supertest from 'supertest';
import fileResize from '../utilities/fileResize';
import app from '../index';
import path from 'path';

//Initializing supertest
const request = supertest(app);

//Testing endpoint and Resizing functionality
describe('Testing all functionalities', () => {
	describe('Testing the endpoint response', () => {
		it('Response has been get', async done => {
			const response = await request.get(
				'/api/images?name=fjord&width=500&height=500'
			);
			expect(response.statusCode).toBe(200);
			done();
		});
	});
	describe('Testing functionality used in the middleware', () => {
		it('Resizing functionality "fileResize" do not process without an existing file', async () => {
			try {
				await fileResize(
					'fjood',
					500,
					500,
					path.resolve('images/full/sized/500,500,fjood.jpg')
				);
			} catch (err) {
				expect(err).toEqual(
					'Error : Chosen name "fjood" or format do not exist. You can use by default: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica as valid names and numbers to define height and width'
				);
			}
		});
		it('Resizing functionality "fileResize" do process with an existing file', async () => {
			let resize = await fileResize(
				'fjord',
				500,
				500,
				path.resolve('images/full/sized/500,500,fjord.jpg')
			);
			//console.log(resize)
			expect(resize).not.toBeNull();
		});
	});
});
