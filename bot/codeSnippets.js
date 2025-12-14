//get current unix time
var unixTimestamp = Math.floor(Date.now() / 1000);
console.log(unixTimestamp);

//converting date to unix
//Converting a specific date string
var dateString = '2024-01-04T00:00:00.000Z'; 
var calcDate = new Date(dateString);
var unixTimestamp = Math.floor(calcDate.getTime() / 1000);
console.log(unixTimestamp); // Output: 1704326400

//localized replies
client.on(Events.InteractionCreate, (interaction) => {
	const locales = {
		pl: 'Witaj Świecie!',
		de: 'Hallo Welt!',
	};
	interaction.reply(locales[interaction.locale] ?? 'Hello World (default is english)');
});