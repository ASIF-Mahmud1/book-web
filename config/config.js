// const config = {
//   env: process.env.NODE_ENV || 'development',
//   port: process.env.PORT || 3000,
//   jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
//   mongoUri: process.env.MONGODB_URI ||
//     process.env.MONGO_HOST ||
//     'mongodb://' + (process.env.IP || 'localhost') + ':' +
//     (process.env.MONGO_PORT || '27017') +
//     '/mernproject'
// }


const config = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
	mongoUri:
		process.env.MONGODB_URI ||
		process.env.MONGO_HOST ||
		'mongodb+srv://mirsahib:mirsahib@mern-auth.bjobf.mongodb.net/mern-auth?retryWrites=true&w=majority',
};


//  mongodb+srv://mirsahib:mirsahib@mern-auth.bjobf.mongodb.net/mern-auth?retryWrites=true&w=majority


export default config


