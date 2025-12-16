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

//Converting unix to Date                        
var nowtimestamp = Math.floor(Date.now())
var tempdate = new Date(nowtimestamp)
//Where 'ru' is locale and 'Etc/GMT-3' means GMT+3. Also works backwards: 'Etc/GMT+3' means GMT-3
var iso = tempdate.toLocaleString(`en-US`, { timeZone: `Etc/GMT-3`, day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: "long" })
// Output: Monday, December 15, 2025 at 10:43:43 PM
console.log(iso)

//experimental
var nowtimestamp = Math.floor(Date.now())
var tzdate = new Date(nowtimestamp)
var testlocale = interaction.locale
if (testlocale === 'ru' || testlocale === 'en-US') {
            var timelocale = interaction.locale
        } else { 
            var timelocale = 'en-UK' 
        }
var iso = tempdate.toLocaleString(`${timelocale}`, { timeZone: 'Etc/GMT-3', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: "long" })
console.log(iso)