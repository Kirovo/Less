//TEST FILE

//Importing modules for testing
import supertest from 'supertest';
import sharp from 'sharp';
import app from '../index';

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
		it('Resizing functionality "sharp" do not process without an existing file', async () => {
			try {
				await sharp('./images/full/fjood.jpg')
					.resize(500, 500)
					.toFile('./images/full/sized/500,500,fjord.jpg');
			} catch (err) {
				expect(err.message).toEqual('Input file is missing');
			}
		});
		it('Resizing functionality "sharp" do process with an existing file', async () => {
			let resize = await sharp('./images/full/fjord.jpg')
				.resize(500, 500)
				.toFile('./images/full/sized/500,500,fjord.jpg');
			expect(resize).not.toBeNull();
		});
	});
});
