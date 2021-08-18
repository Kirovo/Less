import sharp from 'sharp';

//Functon for generating a resized image with defined properties to an output path
const fileResize = async (
	name: string,
	width: number,
	height: number,
	pathOutput: string
): Promise<void> => {
	//Using sharp and its structure
	try {
		await sharp('./images/full/' + name + '.jpg')
			.resize(width, height)
			.toFile(pathOutput);
	} catch (err) {
		throw 'Error : Chosen name "' +
			name +
			'" or format do not exist. You can use by default: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica as valid names and numbers to define height and width';
	}
};

export default fileResize;
