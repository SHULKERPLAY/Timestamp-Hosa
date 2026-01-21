const { SlashCommandBuilder } = require('discord.js');
const { timestampstyles, timezonesgmtminus, timezonesgmtplus, timezoneskey, monthsoption, alltimezones } = require('./constants.js');
const fs = require('fs');
const path = require('path');
//loading bot localization
const localepath = path.join(__dirname, 'locales.json');
let locale = {};
try {
    if (fs.existsSync(localepath)) {
        const locdata = fs.readFileSync(localepath);
        locale = JSON.parse(locdata.toString());
    } else {
        locale = {};
    }
} catch (error) {
    console.error('Error while loading locale:', error);
    locale = {};
}

//.setDefaultMemberPermissions(0) restricts usage to admins only. 
//.setContexts(0, 1, 2) 0 - Can be used in server channels, 1 - Can be used in DM with app's bot user, 2 - Can be used in private channels without inviting the bot
//.setIntegrationTypes(0, 1) - 0 - Can be used with bot installed on server, 1 - can be used with bot installed as User App

//CommandBuilder
const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('🏓 Check Application response time')
    .setDescriptionLocalizations({
        "ru": `🏓 ${locale.ru.checkping}`,
        "en-US": `🏓 ${locale.en_us.checkping}`,
        "de": `🏓 ${locale.de.checkping}`,
        "pl": `🏓 ${locale.pl.checkping}`,
        "fr": `🏓 ${locale.fr.checkping}`,
        "ja": `🏓 ${locale.ja.checkping}`,
        "pt-BR": `🏓 ${locale.pt_BR.checkping}`,
        "ko": `🏓 ${locale.ko.checkping}`,
        "bg": `🏓 ${locale.bg.checkping}`,
        "sv-SE": `🏓 ${locale.sv_SE.checkping}`,
        "uk": `🏓 ${locale.uk.checkping}`,
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)

const about = new SlashCommandBuilder()
    .setName('about')
    .setDescription('📙 About this app')
    .setDescriptionLocalizations({
        "ru": `📙 ${locale.ru.aboutapp}`,
        "en-US": `📙 ${locale.en_us.aboutapp}`,
        "de": `📙 ${locale.de.aboutapp}`,
        "pl": `📙 ${locale.pl.aboutapp}`,
        "fr": `📙 ${locale.fr.aboutapp}`,
        "ja": `📙 ${locale.ja.aboutapp}`,
        "pt-BR": `📙 ${locale.pt_BR.aboutapp}`,
        "ko": `📙 ${locale.ko.aboutapp}`,
        "bg": `📙 ${locale.bg.aboutapp}`,
        "sv-SE": `📙 ${locale.sv_SE.aboutapp}`,
        "uk": `📙 ${locale.uk.aboutapp}`,
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)

const invite = new SlashCommandBuilder()
    .setName('invite')
    .setDescription('🔗 Install TimestampHosa app on Server or as personal app!')
    .setDescriptionLocalizations({
        "ru": `🔗 ${locale.ru.installapp}`,
        "en-US": `🔗 ${locale.en_us.installapp}`,
        "de": `🔗 ${locale.de.installapp}`,
        "pl": `🔗 ${locale.pl.installapp}`,
        "fr": `🔗 ${locale.fr.installapp}`,
        "ja": `🔗 ${locale.ja.installapp}`,
        "pt-BR": `🔗 ${locale.pt_BR.installapp}`,
        "ko": `🔗 ${locale.ko.installapp}`,
        "bg": `🔗 ${locale.bg.installapp}`,
        "sv-SE": `🔗 ${locale.sv_SE.installapp}`,
        "uk": `🔗 ${locale.uk.installapp}`,
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)

const timenow = new SlashCommandBuilder()
    .setName('now')
    .setDescription('⏱ Display current time and timestamp')
    .setDescriptionLocalizations({
        "ru": `⏱ ${locale.ru.descnow}`,
        "en-US": `⏱ ${locale.en_us.descnow}`,
        "de": `⏱ ${locale.de.descnow}`,
        "pl": `⏱ ${locale.pl.descnow}`,
        "fr": `⏱ ${locale.fr.descnow}`,
        "ja": `⏱ ${locale.ja.descnow}`,
        "pt-BR": `⏱ ${locale.pt_BR.descnow}`,
        "ko": `⏱ ${locale.ko.descnow}`,
        "bg": `⏱ ${locale.bg.descnow}`,
        "sv-SE": `⏱ ${locale.sv_SE.descnow}`,
        "uk": `⏱ ${locale.uk.descnow}`,
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addStringOption(option =>
        option.setName('style')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.style}`,
            "en-US": `${locale.en_us.arg.style}`,
            "de": `${locale.de.arg.style}`,
            "pl": `${locale.pl.arg.style}`,
            "fr": `${locale.fr.arg.style}`,
            "ja": `${locale.ja.arg.style}`,
            "pt-BR": `${locale.pt_BR.arg.style}`,
            "ko": `${locale.ko.arg.style}`,
            "bg": `${locale.bg.arg.style}`,
            "sv-SE": `${locale.sv_SE.arg.style}`,
            "uk": `${locale.uk.arg.style}`,
        })
        .setDescription('Select style of date output')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.selectstyleformat}`,
            "en-US": `${locale.en_us.selectstyleformat}`,
            "de": `${locale.de.selectstyleformat}`,
            "pl": `${locale.pl.selectstyleformat}`,
            "fr": `${locale.fr.selectstyleformat}`,
            "ja": `${locale.ja.selectstyleformat}`,
            "pt-BR": `${locale.pt_BR.selectstyleformat}`,
            "ko": `${locale.ko.selectstyleformat}`,
            "bg": `${locale.bg.selectstyleformat}`,
            "sv-SE": `${locale.sv_SE.selectstyleformat}`,
            "uk": `${locale.uk.selectstyleformat}`,
        })
        .setRequired(false)
        .addChoices(timestampstyles)
    )
    //decide if reply be ephemeral (publicreply: false / true)
    .addBooleanOption(option =>
        option.setName('publicreply')
        .setDescription('Make the result visible to everyone in the chat')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.publicreply}`,
            "en-US": `${locale.en_us.publicreply}`,
            "de": `${locale.de.publicreply}`,
            "pl": `${locale.pl.publicreply}`,
            "fr": `${locale.fr.publicreply}`,
            "ja": `${locale.ja.publicreply}`,
            "pt-BR": `${locale.pt_BR.publicreply}`,
            "ko": `${locale.ko.publicreply}`,
            "bg": `${locale.bg.publicreply}`,
            "sv-SE": `${locale.sv_SE.publicreply}`,
            "uk": `${locale.uk.publicreply}`,
        })
        .setRequired(false)
    )
    //end of publicreply
        
const timezonenow = new SlashCommandBuilder()
    .setName('timezone')
    .setDescription('🕒 Display current time in selected timezone')
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addSubcommand(subcommand =>
        subcommand.setName('gmtplus')
        .setDescription('🕒 Select timezone from GMT to GMT +14')
        .setDescriptionLocalizations({
            "ru": `🕒 ${locale.ru.desctimezoneplus}`,
            "en-US": `🕒 ${locale.en_us.desctimezoneplus}`,
            "de": `🕒 ${locale.de.desctimezoneplus}`,
            "pl": `🕒 ${locale.pl.desctimezoneplus}`,
            "fr": `🕒 ${locale.fr.desctimezoneplus}`,
            "ja": `🕒 ${locale.ja.desctimezoneplus}`,
            "pt-BR": `🕒 ${locale.pt_BR.desctimezoneplus}`,
            "ko": `🕒 ${locale.ko.desctimezoneplus}`,
            "bg": `🕒 ${locale.bg.desctimezoneplus}`,
            "sv-SE": `🕒 ${locale.sv_SE.desctimezoneplus}`,
            "uk": `🕒 ${locale.uk.desctimezoneplus}`,
        })
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
                "de": `${locale.de.arg.timezone}`,
                "pl": `${locale.pl.arg.timezone}`,
                "fr": `${locale.fr.arg.timezone}`,
                "ja": `${locale.ja.arg.timezone}`,
                "pt-BR": `${locale.pt_BR.arg.timezone}`,
                "ko": `${locale.ko.arg.timezone}`,
                "bg": `${locale.bg.arg.timezone}`,
                "sv-SE": `${locale.sv_SE.arg.timezone}`,
                "uk": `${locale.uk.arg.timezone}`,
            })
            .setDescription('Select timezone')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selecttimezone}`,
                "en-US": `${locale.en_us.selecttimezone}`,
                "de": `${locale.de.selecttimezone}`,
                "pl": `${locale.pl.selecttimezone}`,
                "fr": `${locale.fr.selecttimezone}`,
                "ja": `${locale.ja.selecttimezone}`,
                "pt-BR": `${locale.pt_BR.selecttimezone}`,
                "ko": `${locale.ko.selecttimezone}`,
                "bg": `${locale.bg.selecttimezone}`,
                "sv-SE": `${locale.sv_SE.selecttimezone}`,
                "uk": `${locale.uk.selecttimezone}`,
            })
            .setRequired(true)
            .addChoices(timezonesgmtplus)
        )
        //decide if reply be ephemeral (publicreply: false / true)
        .addBooleanOption(option =>
            option.setName('publicreply')
            .setDescription('Make the result visible to everyone in the chat')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.publicreply}`,
                "en-US": `${locale.en_us.publicreply}`,
                "de": `${locale.de.publicreply}`,
                "pl": `${locale.pl.publicreply}`,
                "fr": `${locale.fr.publicreply}`,
                "ja": `${locale.ja.publicreply}`,
                "pt-BR": `${locale.pt_BR.publicreply}`,
                "ko": `${locale.ko.publicreply}`,
                "bg": `${locale.bg.publicreply}`,
                "sv-SE": `${locale.sv_SE.publicreply}`,
                "uk": `${locale.uk.publicreply}`,
            })
            .setRequired(false)
        )
        //end of publicreply
    )
    .addSubcommand(subcommand =>
        subcommand.setName('gmtminus')
        .setDescription('🕒 Select timezone from GMT -12 to GMT')
        .setDescriptionLocalizations({
            "ru": `🕒 ${locale.ru.desctimezoneminus}`,
            "en-US": `🕒 ${locale.en_us.desctimezoneminus}`,
            "de": `🕒 ${locale.de.desctimezoneminus}`,
            "pl": `🕒 ${locale.pl.desctimezoneminus}`,
            "fr": `🕒 ${locale.fr.desctimezoneminus}`,
            "ja": `🕒 ${locale.ja.desctimezoneminus}`,
            "pt-BR": `🕒 ${locale.pt_BR.desctimezoneminus}`,
            "ko": `🕒 ${locale.ko.desctimezoneminus}`,
            "bg": `🕒 ${locale.bg.desctimezoneminus}`,
            "sv-SE": `🕒 ${locale.sv_SE.desctimezoneminus}`,
            "uk": `🕒 ${locale.uk.desctimezoneminus}`,
        })
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
                "de": `${locale.de.arg.timezone}`,
                "pl": `${locale.pl.arg.timezone}`,
                "fr": `${locale.fr.arg.timezone}`,
                "ja": `${locale.ja.arg.timezone}`,
                "pt-BR": `${locale.pt_BR.arg.timezone}`,
                "ko": `${locale.ko.arg.timezone}`,
                "bg": `${locale.bg.arg.timezone}`,
                "sv-SE": `${locale.sv_SE.arg.timezone}`,
                "uk": `${locale.uk.arg.timezone}`,
            })
            .setDescription('Select timezone')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selecttimezone}`,
                "en-US": `${locale.en_us.selecttimezone}`,
                "de": `${locale.de.selecttimezone}`,
                "pl": `${locale.pl.selecttimezone}`,
                "fr": `${locale.fr.selecttimezone}`,
                "ja": `${locale.ja.selecttimezone}`,
                "pt-BR": `${locale.pt_BR.selecttimezone}`,
                "ko": `${locale.ko.selecttimezone}`,
                "bg": `${locale.bg.selecttimezone}`,
                "sv-SE": `${locale.sv_SE.selecttimezone}`,
                "uk": `${locale.uk.selecttimezone}`,
            })
            .setRequired(true)
            .addChoices(timezonesgmtminus)
        )
        //decide if reply be ephemeral (publicreply: false / true)
        .addBooleanOption(option =>
            option.setName('publicreply')
            .setDescription('Make the result visible to everyone in the chat')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.publicreply}`,
                "en-US": `${locale.en_us.publicreply}`,
                "de": `${locale.de.publicreply}`,
                "pl": `${locale.pl.publicreply}`,
                "fr": `${locale.fr.publicreply}`,
                "ja": `${locale.ja.publicreply}`,
                "pt-BR": `${locale.pt_BR.publicreply}`,
                "ko": `${locale.ko.publicreply}`,
                "bg": `${locale.bg.publicreply}`,
                "sv-SE": `${locale.sv_SE.publicreply}`,
                "uk": `${locale.uk.publicreply}`,
            })
            .setRequired(false)
        )
        //end of publicreply
    )
    
    .addSubcommand(subcommand =>
        subcommand.setName('keyzones')
        .setDescription('🕒 Check time in timezone different from GMT')
        .setDescriptionLocalizations({
            "ru": `🕒 ${locale.ru.desctimezonekey}`,
            "en-US": `🕒 ${locale.en_us.desctimezonekey}`,
            "de": `🕒 ${locale.de.desctimezonekey}`,
            "pl": `🕒 ${locale.pl.desctimezonekey}`,
            "fr": `🕒 ${locale.fr.desctimezonekey}`,
            "ja": `🕒 ${locale.ja.desctimezonekey}`,
            "pt-BR": `🕒 ${locale.pt_BR.desctimezonekey}`,
            "ko": `🕒 ${locale.ko.desctimezonekey}`,
            "bg": `🕒 ${locale.bg.desctimezonekey}`,
            "sv-SE": `🕒 ${locale.sv_SE.desctimezonekey}`,
            "uk": `🕒 ${locale.uk.desctimezonekey}`,
        })
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
                "de": `${locale.de.arg.timezone}`,
                "pl": `${locale.pl.arg.timezone}`,
                "fr": `${locale.fr.arg.timezone}`,
                "ja": `${locale.ja.arg.timezone}`,
                "pt-BR": `${locale.pt_BR.arg.timezone}`,
                "ko": `${locale.ko.arg.timezone}`,
                "bg": `${locale.bg.arg.timezone}`,
                "sv-SE": `${locale.sv_SE.arg.timezone}`,
                "uk": `${locale.uk.arg.timezone}`,
            })
            .setDescription('Select timezone')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selecttimezone}`,
                "en-US": `${locale.en_us.selecttimezone}`,
                "de": `${locale.de.selecttimezone}`,
                "pl": `${locale.pl.selecttimezone}`,
                "fr": `${locale.fr.selecttimezone}`,
                "ja": `${locale.ja.selecttimezone}`,
                "pt-BR": `${locale.pt_BR.selecttimezone}`,
                "ko": `${locale.ko.selecttimezone}`,
                "bg": `${locale.bg.selecttimezone}`,
                "sv-SE": `${locale.sv_SE.selecttimezone}`,
                "uk": `${locale.uk.selecttimezone}`,
            })
            .setRequired(true)
            .addChoices(timezoneskey)
        )
        //decide if reply be ephemeral (publicreply: false / true)
        .addBooleanOption(option =>
            option.setName('publicreply')
            .setDescription('Make the result visible to everyone in the chat')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.publicreply}`,
                "en-US": `${locale.en_us.publicreply}`,
                "de": `${locale.de.publicreply}`,
                "pl": `${locale.pl.publicreply}`,
                "fr": `${locale.fr.publicreply}`,
                "ja": `${locale.ja.publicreply}`,
                "pt-BR": `${locale.pt_BR.publicreply}`,
                "ko": `${locale.ko.publicreply}`,
                "bg": `${locale.bg.publicreply}`,
                "sv-SE": `${locale.sv_SE.publicreply}`,
                "uk": `${locale.uk.publicreply}`,
            })
            .setRequired(false)
        )
        //end of publicreply
    )
        
const timestampint = new SlashCommandBuilder()
    .setName('timestamp')
    .setDescription('⏳ Create timestamp to embed it in your message!')
    .setDescriptionLocalizations({
        "ru": `⏳ ${locale.ru.desctimestamp}`,
        "en-US": `⏳ ${locale.en_us.desctimestamp}`,
        "de": `⏳ ${locale.de.desctimestamp}`,
        "pl": `⏳ ${locale.pl.desctimestamp}`,
        "fr": `⏳ ${locale.fr.desctimestamp}`,
        "ja": `⏳ ${locale.ja.desctimestamp}`,
        "pt-BR": `⏳ ${locale.pt_BR.desctimestamp}`,
        "ko": `⏳ ${locale.ko.desctimestamp}`,
        "bg": `⏳ ${locale.bg.desctimestamp}`,
        "sv-SE": `⏳ ${locale.sv_SE.desctimestamp}`,
        "uk": `⏳ ${locale.uk.desctimestamp}`,
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addIntegerOption(option =>
        option.setName('year')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.year}`,
            "en-US": `${locale.en_us.arg.year}`,
            "de": `${locale.de.arg.year}`,
            "pl": `${locale.pl.arg.year}`,
            "fr": `${locale.fr.arg.year}`,
            "ja": `${locale.ja.arg.year}`,
            "pt-BR": `${locale.pt_BR.arg.year}`,
            "ko": `${locale.ko.arg.year}`,
            "bg": `${locale.bg.arg.year}`,
            "sv-SE": `${locale.sv_SE.arg.year}`,
            "uk": `${locale.uk.arg.year}`,
        })
        .setDescription('Type Year of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.typetimestampyear}`,
            "en-US": `${locale.en_us.typetimestampyear}`,
            "de": `${locale.de.typetimestampyear}`,
            "pl": `${locale.pl.typetimestampyear}`,
            "fr": `${locale.fr.typetimestampyear}`,
            "ja": `${locale.ja.typetimestampyear}`,
            "pt-BR": `${locale.pt_BR.typetimestampyear}`,
            "ko": `${locale.ko.typetimestampyear}`,
            "bg": `${locale.bg.typetimestampyear}`,
            "sv-SE": `${locale.sv_SE.typetimestampyear}`,
            "uk": `${locale.uk.typetimestampyear}`,
        })
        .setMinValue(1901)
        .setMaxValue(2999)
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('month')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.month}`,
            "en-US": `${locale.en_us.arg.month}`,
            "de": `${locale.de.arg.month}`,
            "pl": `${locale.pl.arg.month}`,
            "fr": `${locale.fr.arg.month}`,
            "ja": `${locale.ja.arg.month}`,
            "pt-BR": `${locale.pt_BR.arg.month}`,
            "ko": `${locale.ko.arg.month}`,
            "bg": `${locale.bg.arg.month}`,
            "sv-SE": `${locale.sv_SE.arg.month}`,
            "uk": `${locale.uk.arg.month}`,
        })
        .setDescription('Select Month of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.seltimestampmonth}`,
            "en-US": `${locale.en_us.seltimestampmonth}`,
            "de": `${locale.de.seltimestampmonth}`,
            "pl": `${locale.pl.seltimestampmonth}`,
            "fr": `${locale.fr.seltimestampmonth}`,
            "ja": `${locale.ja.seltimestampmonth}`,
            "pt-BR": `${locale.pt_BR.seltimestampmonth}`,
            "ko": `${locale.ko.seltimestampmonth}`,
            "bg": `${locale.bg.seltimestampmonth}`,
            "sv-SE": `${locale.sv_SE.seltimestampmonth}`,
            "uk": `${locale.uk.seltimestampmonth}`,
        })
        .setRequired(true)
        .addChoices(monthsoption)
    )
    .addIntegerOption(option =>
        option.setName('day')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.day}`,
            "en-US": `${locale.en_us.arg.day}`,
            "de": `${locale.de.arg.day}`,
            "pl": `${locale.pl.arg.day}`,
            "fr": `${locale.fr.arg.day}`,
            "ja": `${locale.ja.arg.day}`,
            "pt-BR": `${locale.pt_BR.arg.day}`,
            "ko": `${locale.ko.arg.day}`,
            "bg": `${locale.bg.arg.day}`,
            "sv-SE": `${locale.sv_SE.arg.day}`,
            "uk": `${locale.uk.arg.day}`,
        })
        .setDescription('Type Day of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.typetimestampday}`,
            "en-US": `${locale.en_us.typetimestampday}`,
            "de": `${locale.de.typetimestampday}`,
            "pl": `${locale.pl.typetimestampday}`,
            "fr": `${locale.fr.typetimestampday}`,
            "ja": `${locale.ja.typetimestampday}`,
            "pt-BR": `${locale.pt_BR.typetimestampday}`,
            "ko": `${locale.ko.typetimestampday}`,
            "bg": `${locale.bg.typetimestampday}`,
            "sv-SE": `${locale.sv_SE.typetimestampday}`,
            "uk": `${locale.uk.typetimestampday}`,
        })
        .setMinValue(1)
        .setMaxValue(31)
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.setName('hour')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.hour}`,
            "en-US": `${locale.en_us.arg.hour}`,
            "de": `${locale.de.arg.hour}`,
            "pl": `${locale.pl.arg.hour}`,
            "fr": `${locale.fr.arg.hour}`,
            "ja": `${locale.ja.arg.hour}`,
            "pt-BR": `${locale.pt_BR.arg.hour}`,
            "ko": `${locale.ko.arg.hour}`,
            "bg": `${locale.bg.arg.hour}`,
            "sv-SE": `${locale.sv_SE.arg.hour}`,
            "uk": `${locale.uk.arg.hour}`,
        })
        .setDescription('Type Hour of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.typetimestamphour}`,
            "en-US": `${locale.en_us.typetimestamphour}`,
            "de": `${locale.de.typetimestamphour}`,
            "pl": `${locale.pl.typetimestamphour}`,
            "fr": `${locale.fr.typetimestamphour}`,
            "ja": `${locale.ja.typetimestamphour}`,
            "pt-BR": `${locale.pt_BR.typetimestamphour}`,
            "ko": `${locale.ko.typetimestamphour}`,
            "bg": `${locale.bg.typetimestamphour}`,
            "sv-SE": `${locale.sv_SE.typetimestamphour}`,
            "uk": `${locale.uk.typetimestamphour}`,
        })
        .setMinValue(0)
        .setMaxValue(23)
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option.setName('minute')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.minute}`,
            "en-US": `${locale.en_us.arg.minute}`,
            "de": `${locale.de.arg.minute}`,
            "pl": `${locale.pl.arg.minute}`,
            "fr": `${locale.fr.arg.minute}`,
            "ja": `${locale.ja.arg.minute}`,
            "pt-BR": `${locale.pt_BR.arg.minute}`,
            "ko": `${locale.ko.arg.minute}`,
            "bg": `${locale.bg.arg.minute}`,
            "sv-SE": `${locale.sv_SE.arg.minute}`,
            "uk": `${locale.uk.arg.minute}`,
        })
        .setDescription('Type Minute of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.typetimestampminute}`,
            "en-US": `${locale.en_us.typetimestampminute}`,
            "de": `${locale.de.typetimestampminute}`,
            "pl": `${locale.pl.typetimestampminute}`,
            "fr": `${locale.fr.typetimestampminute}`,
            "ja": `${locale.ja.typetimestampminute}`,
            "pt-BR": `${locale.pt_BR.typetimestampminute}`,
            "ko": `${locale.ko.typetimestampminute}`,
            "bg": `${locale.bg.typetimestampminute}`,
            "sv-SE": `${locale.sv_SE.typetimestampminute}`,
            "uk": `${locale.uk.typetimestampminute}`,
        })
        .setMinValue(0)
        .setMaxValue(59)
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option.setName('second')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.second}`,
            "en-US": `${locale.en_us.arg.second}`,
            "de": `${locale.de.arg.second}`,
            "pl": `${locale.pl.arg.second}`,
            "fr": `${locale.fr.arg.second}`,
            "ja": `${locale.ja.arg.second}`,
            "pt-BR": `${locale.pt_BR.arg.second}`,
            "ko": `${locale.ko.arg.second}`,
            "bg": `${locale.bg.arg.second}`,
            "sv-SE": `${locale.sv_SE.arg.second}`,
            "uk": `${locale.uk.arg.second}`,
        })
        .setDescription('Type Second of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.typetimestampsecond}`,
            "en-US": `${locale.en_us.typetimestampsecond}`,
            "de": `${locale.de.typetimestampsecond}`,
            "pl": `${locale.pl.typetimestampsecond}`,
            "fr": `${locale.fr.typetimestampsecond}`,
            "ja": `${locale.ja.typetimestampsecond}`,
            "pt-BR": `${locale.pt_BR.typetimestampsecond}`,
            "ko": `${locale.ko.typetimestampsecond}`,
            "bg": `${locale.bg.typetimestampsecond}`,
            "sv-SE": `${locale.sv_SE.typetimestampsecond}`,
            "uk": `${locale.uk.typetimestampsecond}`,
        })
        .setMinValue(0)
        .setMaxValue(59)
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('timezone')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.timezone}`,
            "en-US": `${locale.en_us.arg.timezone}`,
            "de": `${locale.de.arg.timezone}`,
            "pl": `${locale.pl.arg.timezone}`,
            "fr": `${locale.fr.arg.timezone}`,
            "ja": `${locale.ja.arg.timezone}`,
            "pt-BR": `${locale.pt_BR.arg.timezone}`,
            "ko": `${locale.ko.arg.timezone}`,
            "bg": `${locale.bg.arg.timezone}`,
            "sv-SE": `${locale.sv_SE.arg.timezone}`,
            "uk": `${locale.uk.arg.timezone}`,
        })
        .setDescription('Select timezone of timestamp (Default: GMT+0)')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.seltimestamptimezone}`,
            "en-US": `${locale.en_us.seltimestamptimezone}`,
            "de": `${locale.de.seltimestamptimezone}`,
            "pl": `${locale.pl.seltimestamptimezone}`,
            "fr": `${locale.fr.seltimestamptimezone}`,
            "ja": `${locale.ja.seltimestamptimezone}`,
            "pt-BR": `${locale.pt_BR.seltimestamptimezone}`,
            "ko": `${locale.ko.seltimestamptimezone}`,
            "bg": `${locale.bg.seltimestamptimezone}`,
            "sv-SE": `${locale.sv_SE.seltimestamptimezone}`,
            "uk": `${locale.uk.seltimestamptimezone}`,
        })
        .setRequired(false)
        .addChoices(alltimezones)
    )
    .addStringOption(option =>
        option.setName('style')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.style}`,
            "en-US": `${locale.en_us.arg.style}`,
            "de": `${locale.de.arg.style}`,
            "pl": `${locale.pl.arg.style}`,
            "fr": `${locale.fr.arg.style}`,
            "ja": `${locale.ja.arg.style}`,
            "pt-BR": `${locale.pt_BR.arg.style}`,
            "ko": `${locale.ko.arg.style}`,
            "bg": `${locale.bg.arg.style}`,
            "sv-SE": `${locale.sv_SE.arg.style}`,
            "uk": `${locale.uk.arg.style}`,
        })
        .setDescription('Select style of date output')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.selectstyleformat}`,
            "en-US": `${locale.en_us.selectstyleformat}`,
            "de": `${locale.de.selectstyleformat}`,
            "pl": `${locale.pl.selectstyleformat}`,
            "fr": `${locale.fr.selectstyleformat}`,
            "ja": `${locale.ja.selectstyleformat}`,
            "pt-BR": `${locale.pt_BR.selectstyleformat}`,
            "ko": `${locale.ko.selectstyleformat}`,
            "bg": `${locale.bg.selectstyleformat}`,
            "sv-SE": `${locale.sv_SE.selectstyleformat}`,
            "uk": `${locale.uk.selectstyleformat}`,
        })
        .setRequired(false)
        .addChoices(timestampstyles)
    )
    //decide if reply be ephemeral (publicreply: false / true)
    .addBooleanOption(option =>
        option.setName('publicreply')
        .setDescription('Make the result visible to everyone in the chat')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.publicreply}`,
            "en-US": `${locale.en_us.publicreply}`,
            "de": `${locale.de.publicreply}`,
            "pl": `${locale.pl.publicreply}`,
            "fr": `${locale.fr.publicreply}`,
            "ja": `${locale.ja.publicreply}`,
            "pt-BR": `${locale.pt_BR.publicreply}`,
            "ko": `${locale.ko.publicreply}`,
            "bg": `${locale.bg.publicreply}`,
            "sv-SE": `${locale.sv_SE.publicreply}`,
            "uk": `${locale.uk.publicreply}`,
        })
        .setRequired(false)
    )
    //end of publicreply
    
const convertint = new SlashCommandBuilder()
    .setName('convert')
    .setDescription('🔄 Convert UNIX string to Date and backwards')
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addSubcommand(subcommand =>
        subcommand.setName('tounix')
        .setDescription('🔄 Convert selected date to UNIX date integer')
        .setDescriptionLocalizations({
            "ru": `🔄 ${locale.ru.descconverttounix}`,
            "en-US": `🔄 ${locale.en_us.descconverttounix}`,
            "de": `🔄 ${locale.de.descconverttounix}`,
            "pl": `🔄 ${locale.pl.descconverttounix}`,
            "fr": `🔄 ${locale.fr.descconverttounix}`,
            "ja": `🔄 ${locale.ja.descconverttounix}`,
            "pt-BR": `🔄 ${locale.pt_BR.descconverttounix}`,
            "ko": `🔄 ${locale.ko.descconverttounix}`,
            "bg": `🔄 ${locale.bg.descconverttounix}`,
            "sv-SE": `🔄 ${locale.sv_SE.descconverttounix}`,
            "uk": `🔄 ${locale.uk.descconverttounix}`,
        })
        .addIntegerOption(option =>
            option.setName('year')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.year}`,
                "en-US": `${locale.en_us.arg.year}`,
                "de": `${locale.de.arg.year}`,
                "pl": `${locale.pl.arg.year}`,
                "fr": `${locale.fr.arg.year}`,
                "ja": `${locale.ja.arg.year}`,
                "pt-BR": `${locale.pt_BR.arg.year}`,
                "ko": `${locale.ko.arg.year}`,
                "bg": `${locale.bg.arg.year}`,
                "sv-SE": `${locale.sv_SE.arg.year}`,
                "uk": `${locale.uk.arg.year}`,
            })
            .setDescription('Type Year you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeyear}`,
                "en-US": `${locale.en_us.typeyear}`,
                "de": `${locale.de.typeyear}`,
                "pl": `${locale.pl.typeyear}`,
                "fr": `${locale.fr.typeyear}`,
                "ja": `${locale.ja.typeyear}`,
                "pt-BR": `${locale.pt_BR.typeyear}`,
                "ko": `${locale.ko.typeyear}`,
                "bg": `${locale.bg.typeyear}`,
                "sv-SE": `${locale.sv_SE.typeyear}`,
                "uk": `${locale.uk.typeyear}`,
            })
            .setMinValue(1601)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('month')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.month}`,
                "en-US": `${locale.en_us.arg.month}`,
                "de": `${locale.de.arg.month}`,
                "pl": `${locale.pl.arg.month}`,
                "fr": `${locale.fr.arg.month}`,
                "ja": `${locale.ja.arg.month}`,
                "pt-BR": `${locale.pt_BR.arg.month}`,
                "ko": `${locale.ko.arg.month}`,
                "bg": `${locale.bg.arg.month}`,
                "sv-SE": `${locale.sv_SE.arg.month}`,
                "uk": `${locale.uk.arg.month}`,
            })
            .setDescription('Select Month you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selmonth}`,
                "en-US": `${locale.en_us.selmonth}`,
                "de": `${locale.de.selmonth}`,
                "pl": `${locale.pl.selmonth}`,
                "fr": `${locale.fr.selmonth}`,
                "ja": `${locale.ja.selmonth}`,
                "pt-BR": `${locale.pt_BR.selmonth}`,
                "ko": `${locale.ko.selmonth}`,
                "bg": `${locale.bg.selmonth}`,
                "sv-SE": `${locale.sv_SE.selmonth}`,
                "uk": `${locale.uk.selmonth}`,
            })
            .setRequired(true)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('day')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.day}`,
                "en-US": `${locale.en_us.arg.day}`,
                "de": `${locale.de.arg.day}`,
                "pl": `${locale.pl.arg.day}`,
                "fr": `${locale.fr.arg.day}`,
                "ja": `${locale.ja.arg.day}`,
                "pt-BR": `${locale.pt_BR.arg.day}`,
                "ko": `${locale.ko.arg.day}`,
                "bg": `${locale.bg.arg.day}`,
                "sv-SE": `${locale.sv_SE.arg.day}`,
                "uk": `${locale.uk.arg.day}`,
            })
            .setDescription('Type Day you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeday}`,
                "en-US": `${locale.en_us.typeday}`,
                "de": `${locale.de.typeday}`,
                "pl": `${locale.pl.typeday}`,
                "fr": `${locale.fr.typeday}`,
                "ja": `${locale.ja.typeday}`,
                "pt-BR": `${locale.pt_BR.typeday}`,
                "ko": `${locale.ko.typeday}`,
                "bg": `${locale.bg.typeday}`,
                "sv-SE": `${locale.sv_SE.typeday}`,
                "uk": `${locale.uk.typeday}`,
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('displayms')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.displayms}`,
                "en-US": `${locale.en_us.arg.displayms}`,
                "de": `${locale.de.arg.displayms}`,
                "pl": `${locale.pl.arg.displayms}`,
                "fr": `${locale.fr.arg.displayms}`,
                "ja": `${locale.ja.arg.displayms}`,
                "pt-BR": `${locale.pt_BR.arg.displayms}`,
                "ko": `${locale.ko.arg.displayms}`,
                "bg": `${locale.bg.arg.displayms}`,
                "sv-SE": `${locale.sv_SE.arg.displayms}`,
                "uk": `${locale.uk.arg.displayms}`,
            })
            .setDescription('Whether or not to return value with milliseconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.returnmilliseconds}`,
                "en-US": `${locale.en_us.returnmilliseconds}`,
                "de": `${locale.de.returnmilliseconds}`,
                "pl": `${locale.pl.returnmilliseconds}`,
                "fr": `${locale.fr.returnmilliseconds}`,
                "ja": `${locale.ja.returnmilliseconds}`,
                "pt-BR": `${locale.pt_BR.returnmilliseconds}`,
                "ko": `${locale.ko.returnmilliseconds}`,
                "bg": `${locale.bg.returnmilliseconds}`,
                "sv-SE": `${locale.sv_SE.returnmilliseconds}`,
                "uk": `${locale.uk.returnmilliseconds}`,
            })
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('hour')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.hour}`,
                "en-US": `${locale.en_us.arg.hour}`,
                "de": `${locale.de.arg.hour}`,
                "pl": `${locale.pl.arg.hour}`,
                "fr": `${locale.fr.arg.hour}`,
                "ja": `${locale.ja.arg.hour}`,
                "pt-BR": `${locale.pt_BR.arg.hour}`,
                "ko": `${locale.ko.arg.hour}`,
                "bg": `${locale.bg.arg.hour}`,
                "sv-SE": `${locale.sv_SE.arg.hour}`,
                "uk": `${locale.uk.arg.hour}`,
            })
            .setDescription('Type Hour you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typehour}`,
                "en-US": `${locale.en_us.typehour}`,
                "de": `${locale.de.typehour}`,
                "pl": `${locale.pl.typehour}`,
                "fr": `${locale.fr.typehour}`,
                "ja": `${locale.ja.typehour}`,
                "pt-BR": `${locale.pt_BR.typehour}`,
                "ko": `${locale.ko.typehour}`,
                "bg": `${locale.bg.typehour}`,
                "sv-SE": `${locale.sv_SE.typehour}`,
                "uk": `${locale.uk.typehour}`,
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('minute')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.minute}`,
                "en-US": `${locale.en_us.arg.minute}`,
                "de": `${locale.de.arg.minute}`,
                "pl": `${locale.pl.arg.minute}`,
                "fr": `${locale.fr.arg.minute}`,
                "ja": `${locale.ja.arg.minute}`,
                "pt-BR": `${locale.pt_BR.arg.minute}`,
                "ko": `${locale.ko.arg.minute}`,
                "bg": `${locale.bg.arg.minute}`,
                "sv-SE": `${locale.sv_SE.arg.minute}`,
                "uk": `${locale.uk.arg.minute}`,
            })
            .setDescription('Type Minute you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeminute}`,
                "en-US": `${locale.en_us.typeminute}`,
                "de": `${locale.de.typeminute}`,
                "pl": `${locale.pl.typeminute}`,
                "fr": `${locale.fr.typeminute}`,
                "ja": `${locale.ja.typeminute}`,
                "pt-BR": `${locale.pt_BR.typeminute}`,
                "ko": `${locale.ko.typeminute}`,
                "bg": `${locale.bg.typeminute}`,
                "sv-SE": `${locale.sv_SE.typeminute}`,
                "uk": `${locale.uk.typeminute}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('second')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.second}`,
                "en-US": `${locale.en_us.arg.second}`,
                "de": `${locale.de.arg.second}`,
                "pl": `${locale.pl.arg.second}`,
                "fr": `${locale.fr.arg.second}`,
                "ja": `${locale.ja.arg.second}`,
                "pt-BR": `${locale.pt_BR.arg.second}`,
                "ko": `${locale.ko.arg.second}`,
                "bg": `${locale.bg.arg.second}`,
                "sv-SE": `${locale.sv_SE.arg.second}`,
                "uk": `${locale.uk.arg.second}`,
            })
            .setDescription('Type Second you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecond}`,
                "en-US": `${locale.en_us.typesecond}`,
                "de": `${locale.de.typesecond}`,
                "pl": `${locale.pl.typesecond}`,
                "fr": `${locale.fr.typesecond}`,
                "ja": `${locale.ja.typesecond}`,
                "pt-BR": `${locale.pt_BR.typesecond}`,
                "ko": `${locale.ko.typesecond}`,
                "bg": `${locale.bg.typesecond}`,
                "sv-SE": `${locale.sv_SE.typesecond}`,
                "uk": `${locale.uk.typesecond}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('millisecond')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.millisecond}`,
                "en-US": `${locale.en_us.arg.millisecond}`,
                "de": `${locale.de.arg.millisecond}`,
                "pl": `${locale.pl.arg.millisecond}`,
                "fr": `${locale.fr.arg.millisecond}`,
                "ja": `${locale.ja.arg.millisecond}`,
                "pt-BR": `${locale.pt_BR.arg.millisecond}`,
                "ko": `${locale.ko.arg.millisecond}`,
                "bg": `${locale.bg.arg.millisecond}`,
                "sv-SE": `${locale.sv_SE.arg.millisecond}`,
                "uk": `${locale.uk.arg.millisecond}`,
            })
            .setDescription('Type Millisecond you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typemillisecond}`,
                "en-US": `${locale.en_us.typemillisecond}`,
                "de": `${locale.de.typemillisecond}`,
                "pl": `${locale.pl.typemillisecond}`,
                "fr": `${locale.fr.typemillisecond}`,
                "ja": `${locale.ja.typemillisecond}`,
                "pt-BR": `${locale.pt_BR.typemillisecond}`,
                "ko": `${locale.ko.typemillisecond}`,
                "bg": `${locale.bg.typemillisecond}`,
                "sv-SE": `${locale.sv_SE.typemillisecond}`,
                "uk": `${locale.uk.typemillisecond}`,
            })
            .setMinValue(0)
            .setMaxValue(999)
            .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
                "de": `${locale.de.arg.timezone}`,
                "pl": `${locale.pl.arg.timezone}`,
                "fr": `${locale.fr.arg.timezone}`,
                "ja": `${locale.ja.arg.timezone}`,
                "pt-BR": `${locale.pt_BR.arg.timezone}`,
                "ko": `${locale.ko.arg.timezone}`,
                "bg": `${locale.bg.arg.timezone}`,
                "sv-SE": `${locale.sv_SE.arg.timezone}`,
                "uk": `${locale.uk.arg.timezone}`,
            })
            .setDescription('Select timezone of input (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.seldatetimezone}`,
                "en-US": `${locale.en_us.seldatetimezone}`,
                "de": `${locale.de.seldatetimezone}`,
                "pl": `${locale.pl.seldatetimezone}`,
                "fr": `${locale.fr.seldatetimezone}`,
                "ja": `${locale.ja.seldatetimezone}`,
                "pt-BR": `${locale.pt_BR.seldatetimezone}`,
                "ko": `${locale.ko.seldatetimezone}`,
                "bg": `${locale.bg.seldatetimezone}`,
                "sv-SE": `${locale.sv_SE.seldatetimezone}`,
                "uk": `${locale.uk.seldatetimezone}`,
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
    )
    .addSubcommand(subcommand =>
        subcommand.setName('todate')
        .setDescription('🔄 Convert UNIX date integer to Human Date')
        .setDescriptionLocalizations({
            "ru": `🔄 ${locale.ru.descconverttodate}`,
            "en-US": `🔄 ${locale.en_us.descconverttodate}`,
            "de": `🔄 ${locale.de.descconverttodate}`,
            "pl": `🔄 ${locale.pl.descconverttodate}`,
            "fr": `🔄 ${locale.fr.descconverttodate}`,
            "ja": `🔄 ${locale.ja.descconverttodate}`,
            "pt-BR": `🔄 ${locale.pt_BR.descconverttodate}`,
            "ko": `🔄 ${locale.ko.descconverttodate}`,
            "bg": `🔄 ${locale.bg.descconverttodate}`,
            "sv-SE": `🔄 ${locale.sv_SE.descconverttodate}`,
            "uk": `🔄 ${locale.uk.descconverttodate}`,
        })
        .addIntegerOption(option =>
            option.setName('unixtime')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.unixtime}`,
                "en-US": `${locale.en_us.arg.unixtime}`,
                "de": `${locale.de.arg.unixtime}`,
                "pl": `${locale.pl.arg.unixtime}`,
                "fr": `${locale.fr.arg.unixtime}`,
                "ja": `${locale.ja.arg.unixtime}`,
                "pt-BR": `${locale.pt_BR.arg.unixtime}`,
                "ko": `${locale.ko.arg.unixtime}`,
                "bg": `${locale.bg.arg.unixtime}`,
                "sv-SE": `${locale.sv_SE.arg.unixtime}`,
                "uk": `${locale.uk.arg.unixtime}`,
            })
            .setDescription('Type UNIX Epoch Time Integer')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeunixint}`,
                "en-US": `${locale.en_us.typeunixint}`,
                "de": `${locale.de.typeunixint}`,
                "pl": `${locale.pl.typeunixint}`,
                "fr": `${locale.fr.typeunixint}`,
                "ja": `${locale.ja.typeunixint}`,
                "pt-BR": `${locale.pt_BR.typeunixint}`,
                "ko": `${locale.ko.typeunixint}`,
                "bg": `${locale.bg.typeunixint}`,
                "sv-SE": `${locale.sv_SE.typeunixint}`,
                "uk": `${locale.uk.typeunixint}`,
            })
            .setMinValue(-8639999999999)
            .setMaxValue(8639999999999)
            .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('withms')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.withms}`,
                "en-US": `${locale.en_us.arg.withms}`,
                "de": `${locale.de.arg.withms}`,
                "pl": `${locale.pl.arg.withms}`,
                "fr": `${locale.fr.arg.withms}`,
                "ja": `${locale.ja.arg.withms}`,
                "pt-BR": `${locale.pt_BR.arg.withms}`,
                "ko": `${locale.ko.arg.withms}`,
                "bg": `${locale.bg.arg.withms}`,
                "sv-SE": `${locale.sv_SE.arg.withms}`,
                "uk": `${locale.uk.arg.withms}`,
            })
            .setDescription('Whether or not to read and return value with milliseconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.withmilliseconds}`,
                "en-US": `${locale.en_us.withmilliseconds}`,
                "de": `${locale.de.withmilliseconds}`,
                "pl": `${locale.pl.withmilliseconds}`,
                "fr": `${locale.fr.withmilliseconds}`,
                "ja": `${locale.ja.withmilliseconds}`,
                "pt-BR": `${locale.pt_BR.withmilliseconds}`,
                "ko": `${locale.ko.withmilliseconds}`,
                "bg": `${locale.bg.withmilliseconds}`,
                "sv-SE": `${locale.sv_SE.withmilliseconds}`,
                "uk": `${locale.uk.withmilliseconds}`,
            })
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
                "de": `${locale.de.arg.timezone}`,
                "pl": `${locale.pl.arg.timezone}`,
                "fr": `${locale.fr.arg.timezone}`,
                "ja": `${locale.ja.arg.timezone}`,
                "pt-BR": `${locale.pt_BR.arg.timezone}`,
                "ko": `${locale.ko.arg.timezone}`,
                "bg": `${locale.bg.arg.timezone}`,
                "sv-SE": `${locale.sv_SE.arg.timezone}`,
                "uk": `${locale.uk.arg.timezone}`,
            })
            .setDescription('Select timezone for output (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.outputtimezone}`,
                "en-US": `${locale.en_us.outputtimezone}`,
                "de": `${locale.de.outputtimezone}`,
                "pl": `${locale.pl.outputtimezone}`,
                "fr": `${locale.fr.outputtimezone}`,
                "ja": `${locale.ja.outputtimezone}`,
                "pt-BR": `${locale.pt_BR.outputtimezone}`,
                "ko": `${locale.ko.outputtimezone}`,
                "bg": `${locale.bg.outputtimezone}`,
                "sv-SE": `${locale.sv_SE.outputtimezone}`,
                "uk": `${locale.uk.outputtimezone}`,
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
    )

const calcint = new SlashCommandBuilder()
    .setName('calc')
    .setDescription('🧮 Time and Date Calculator')
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addSubcommand(subcommand =>
        subcommand.setName('fromnow')
        .setDescription('🧮 Add or subtract time from the current time')
        .setDescriptionLocalizations({
            "ru": `🧮 ${locale.ru.desccalcfromnow}`,
            "en-US": `🧮 ${locale.en_us.desccalcfromnow}`,
            "de": `🧮 ${locale.de.desccalcfromnow}`,
            "pl": `🧮 ${locale.pl.desccalcfromnow}`,
            "fr": `🧮 ${locale.fr.desccalcfromnow}`,
            "ja": `🧮 ${locale.ja.desccalcfromnow}`,
            "pt-BR": `🧮 ${locale.pt_BR.desccalcfromnow}`,
            "ko": `🧮 ${locale.ko.desccalcfromnow}`,
            "bg": `🧮 ${locale.bg.desccalcfromnow}`,
            "sv-SE": `🧮 ${locale.sv_SE.desccalcfromnow}`,
            "uk": `🧮 ${locale.uk.desccalcfromnow}`,
        })
        //Add or subtract
        .addStringOption(option =>
            option.setName('matharg')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.matharg}`,
                "en-US": `${locale.en_us.arg.matharg}`,
                "de": `${locale.de.arg.matharg}`,
                "pl": `${locale.pl.arg.matharg}`,
                "fr": `${locale.fr.arg.matharg}`,
                "ja": `${locale.ja.arg.matharg}`,
                "pt-BR": `${locale.pt_BR.arg.matharg}`,
                "ko": `${locale.ko.arg.matharg}`,
                "bg": `${locale.bg.arg.matharg}`,
                "sv-SE": `${locale.sv_SE.arg.matharg}`,
                "uk": `${locale.uk.arg.matharg}`,
            })
            .setDescription('ADD OR SUBTRACT')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsub}`,
                "en-US": `${locale.en_us.addorsub}`,
                "de": `${locale.de.addorsub}`,
                "pl": `${locale.pl.addorsub}`,
                "fr": `${locale.fr.addorsub}`,
                "ja": `${locale.ja.addorsub}`,
                "pt-BR": `${locale.pt_BR.addorsub}`,
                "ko": `${locale.ko.addorsub}`,
                "bg": `${locale.bg.addorsub}`,
                "sv-SE": `${locale.sv_SE.addorsub}`,
                "uk": `${locale.uk.addorsub}`,
            })
            .setRequired(true)
            .addChoices({
                name: 'Add (+)',
                value: 'Add',
                name_localizations: { "ru": `${locale.ru.add}`, "en-US": `${locale.en_us.add}`, "de": `${locale.de.add}`, "pl": `${locale.pl.add}`, "fr": `${locale.fr.add}`, "ja": `${locale.ja.add}`, "pt-BR": `${locale.pt_BR.add}`, "ko": `${locale.ko.add}`, "bg": `${locale.bg.add}`, "sv-SE": `${locale.sv_SE.add}`, "uk": `${locale.uk.add}` }
                },
                { name: 'Subtract (-)',
                  value: 'Subtract',
                  name_localizations: { "ru": `${locale.ru.subtract}`, "en-US": `${locale.en_us.subtract}`, "de": `${locale.de.subtract}`, "pl": `${locale.pl.subtract}`, "fr": `${locale.fr.subtract}`, "ja": `${locale.ja.subtract}`, "pt-BR": `${locale.pt_BR.subtract}`, "ko": `${locale.ko.subtract}`, "bg": `${locale.bg.subtract}`, "sv-SE": `${locale.sv_SE.subtract}`, "uk": `${locale.uk.subtract}` }
                }
            )
        )
        //offset to timezone
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
                "de": `${locale.de.arg.timezone}`,
                "pl": `${locale.pl.arg.timezone}`,
                "fr": `${locale.fr.arg.timezone}`,
                "ja": `${locale.ja.arg.timezone}`,
                "pt-BR": `${locale.pt_BR.arg.timezone}`,
                "ko": `${locale.ko.arg.timezone}`,
                "bg": `${locale.bg.arg.timezone}`,
                "sv-SE": `${locale.sv_SE.arg.timezone}`,
                "uk": `${locale.uk.arg.timezone}`,
            })
            .setDescription('Select timezone of input (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.seltimezone}`,
                "en-US": `${locale.en_us.seltimezone}`,
                "de": `${locale.de.seltimezone}`,
                "pl": `${locale.pl.seltimezone}`,
                "fr": `${locale.fr.seltimezone}`,
                "ja": `${locale.ja.seltimezone}`,
                "pt-BR": `${locale.pt_BR.seltimezone}`,
                "ko": `${locale.ko.seltimezone}`,
                "bg": `${locale.bg.seltimezone}`,
                "sv-SE": `${locale.sv_SE.seltimezone}`,
                "uk": `${locale.uk.seltimezone}`,
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
        //arg2
        .addIntegerOption(option =>
            option.setName('years')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.years}`,
                "en-US": `${locale.en_us.arg.years}`,
                "de": `${locale.de.arg.years}`,
                "pl": `${locale.pl.arg.years}`,
                "fr": `${locale.fr.arg.years}`,
                "ja": `${locale.ja.arg.years}`,
                "pt-BR": `${locale.pt_BR.arg.years}`,
                "ko": `${locale.ko.arg.years}`,
                "bg": `${locale.bg.arg.years}`,
                "sv-SE": `${locale.sv_SE.arg.years}`,
                "uk": `${locale.uk.arg.years}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of years (Inaccurate. 365 days)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubyears}`,
                "en-US": `${locale.en_us.addorsubyears}`,
                "de": `${locale.de.addorsubyears}`,
                "pl": `${locale.pl.addorsubyears}`,
                "fr": `${locale.fr.addorsubyears}`,
                "ja": `${locale.ja.addorsubyears}`,
                "pt-BR": `${locale.pt_BR.addorsubyears}`,
                "ko": `${locale.ko.addorsubyears}`,
                "bg": `${locale.bg.addorsubyears}`,
                "sv-SE": `${locale.sv_SE.addorsubyears}`,
                "uk": `${locale.uk.addorsubyears}`,
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('months')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.months}`,
                "en-US": `${locale.en_us.arg.months}`,
                "de": `${locale.de.arg.months}`,
                "pl": `${locale.pl.arg.months}`,
                "fr": `${locale.fr.arg.months}`,
                "ja": `${locale.ja.arg.months}`,
                "pt-BR": `${locale.pt_BR.arg.months}`,
                "ko": `${locale.ko.arg.months}`,
                "bg": `${locale.bg.arg.months}`,
                "sv-SE": `${locale.sv_SE.arg.months}`,
                "uk": `${locale.uk.arg.months}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of months (Inaccurate. 30 days)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubmonths}`,
                "en-US": `${locale.en_us.addorsubmonths}`,
                "de": `${locale.de.addorsubmonths}`,
                "pl": `${locale.pl.addorsubmonths}`,
                "fr": `${locale.fr.addorsubmonths}`,
                "ja": `${locale.ja.addorsubmonths}`,
                "pt-BR": `${locale.pt_BR.addorsubmonths}`,
                "ko": `${locale.ko.addorsubmonths}`,
                "bg": `${locale.bg.addorsubmonths}`,
                "sv-SE": `${locale.sv_SE.addorsubmonths}`,
                "uk": `${locale.uk.addorsubmonths}`,
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('weeks')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.weeks}`,
                "en-US": `${locale.en_us.arg.weeks}`,
                "de": `${locale.de.arg.weeks}`,
                "pl": `${locale.pl.arg.weeks}`,
                "fr": `${locale.fr.arg.weeks}`,
                "ja": `${locale.ja.arg.weeks}`,
                "pt-BR": `${locale.pt_BR.arg.weeks}`,
                "ko": `${locale.ko.arg.weeks}`,
                "bg": `${locale.bg.arg.weeks}`,
                "sv-SE": `${locale.sv_SE.arg.weeks}`,
                "uk": `${locale.uk.arg.weeks}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Weeks')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubweeks}`,
                "en-US": `${locale.en_us.addorsubweeks}`,
                "de": `${locale.de.addorsubweeks}`,
                "pl": `${locale.pl.addorsubweeks}`,
                "fr": `${locale.fr.addorsubweeks}`,
                "ja": `${locale.ja.addorsubweeks}`,
                "pt-BR": `${locale.pt_BR.addorsubweeks}`,
                "ko": `${locale.ko.addorsubweeks}`,
                "bg": `${locale.bg.addorsubweeks}`,
                "sv-SE": `${locale.sv_SE.addorsubweeks}`,
                "uk": `${locale.uk.addorsubweeks}`,
            })
            .setMinValue(0)
            .setMaxValue(5000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('days')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.days}`,
                "en-US": `${locale.en_us.arg.days}`,
                "de": `${locale.de.arg.days}`,
                "pl": `${locale.pl.arg.days}`,
                "fr": `${locale.fr.arg.days}`,
                "ja": `${locale.ja.arg.days}`,
                "pt-BR": `${locale.pt_BR.arg.days}`,
                "ko": `${locale.ko.arg.days}`,
                "bg": `${locale.bg.arg.days}`,
                "sv-SE": `${locale.sv_SE.arg.days}`,
                "uk": `${locale.uk.arg.days}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Days')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubdays}`,
                "en-US": `${locale.en_us.addorsubdays}`,
                "de": `${locale.de.addorsubdays}`,
                "pl": `${locale.pl.addorsubdays}`,
                "fr": `${locale.fr.addorsubdays}`,
                "ja": `${locale.ja.addorsubdays}`,
                "pt-BR": `${locale.pt_BR.addorsubdays}`,
                "ko": `${locale.ko.addorsubdays}`,
                "bg": `${locale.bg.addorsubdays}`,
                "sv-SE": `${locale.sv_SE.addorsubdays}`,
                "uk": `${locale.uk.addorsubdays}`,
            })
            .setMinValue(0)
            .setMaxValue(50000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('hours')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.hours}`,
                "en-US": `${locale.en_us.arg.hours}`,
                "de": `${locale.de.arg.hours}`,
                "pl": `${locale.pl.arg.hours}`,
                "fr": `${locale.fr.arg.hours}`,
                "ja": `${locale.ja.arg.hours}`,
                "pt-BR": `${locale.pt_BR.arg.hours}`,
                "ko": `${locale.ko.arg.hours}`,
                "bg": `${locale.bg.arg.hours}`,
                "sv-SE": `${locale.sv_SE.arg.hours}`,
                "uk": `${locale.uk.arg.hours}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Hours')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubhours}`,
                "en-US": `${locale.en_us.addorsubhours}`,
                "de": `${locale.de.addorsubhours}`,
                "pl": `${locale.pl.addorsubhours}`,
                "fr": `${locale.fr.addorsubhours}`,
                "ja": `${locale.ja.addorsubhours}`,
                "pt-BR": `${locale.pt_BR.addorsubhours}`,
                "ko": `${locale.ko.addorsubhours}`,
                "bg": `${locale.bg.addorsubhours}`,
                "sv-SE": `${locale.sv_SE.addorsubhours}`,
                "uk": `${locale.uk.addorsubhours}`,
            })
            .setMinValue(0)
            .setMaxValue(240000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('minutes')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.minutes}`,
                "en-US": `${locale.en_us.arg.minutes}`,
                "de": `${locale.de.arg.minutes}`,
                "pl": `${locale.pl.arg.minutes}`,
                "fr": `${locale.fr.arg.minutes}`,
                "ja": `${locale.ja.arg.minutes}`,
                "pt-BR": `${locale.pt_BR.arg.minutes}`,
                "ko": `${locale.ko.arg.minutes}`,
                "bg": `${locale.bg.arg.minutes}`,
                "sv-SE": `${locale.sv_SE.arg.minutes}`,
                "uk": `${locale.uk.arg.minutes}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Minutes')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubminutes}`,
                "en-US": `${locale.en_us.addorsubminutes}`,
                "de": `${locale.de.addorsubminutes}`,
                "pl": `${locale.pl.addorsubminutes}`,
                "fr": `${locale.fr.addorsubminutes}`,
                "ja": `${locale.ja.addorsubminutes}`,
                "pt-BR": `${locale.pt_BR.addorsubminutes}`,
                "ko": `${locale.ko.addorsubminutes}`,
                "bg": `${locale.bg.addorsubminutes}`,
                "sv-SE": `${locale.sv_SE.addorsubminutes}`,
                "uk": `${locale.uk.addorsubminutes}`,
            })
            .setMinValue(0)
            .setMaxValue(1000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('seconds')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.seconds}`,
                "en-US": `${locale.en_us.arg.seconds}`,
                "de": `${locale.de.arg.seconds}`,
                "pl": `${locale.pl.arg.seconds}`,
                "fr": `${locale.fr.arg.seconds}`,
                "ja": `${locale.ja.arg.seconds}`,
                "pt-BR": `${locale.pt_BR.arg.seconds}`,
                "ko": `${locale.ko.arg.seconds}`,
                "bg": `${locale.bg.arg.seconds}`,
                "sv-SE": `${locale.sv_SE.arg.seconds}`,
                "uk": `${locale.uk.arg.seconds}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Seconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubseconds}`,
                "en-US": `${locale.en_us.addorsubseconds}`,
                "de": `${locale.de.addorsubseconds}`,
                "pl": `${locale.pl.addorsubseconds}`,
                "fr": `${locale.fr.addorsubseconds}`,
                "ja": `${locale.ja.addorsubseconds}`,
                "pt-BR": `${locale.pt_BR.addorsubseconds}`,
                "ko": `${locale.ko.addorsubseconds}`,
                "bg": `${locale.bg.addorsubseconds}`,
                "sv-SE": `${locale.sv_SE.addorsubseconds}`,
                "uk": `${locale.uk.addorsubseconds}`,
            })
            .setMinValue(0)
            .setMaxValue(100000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('milliseconds')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.milliseconds}`,
                "en-US": `${locale.en_us.arg.milliseconds}`,
                "de": `${locale.de.arg.milliseconds}`,
                "pl": `${locale.pl.arg.milliseconds}`,
                "fr": `${locale.fr.arg.milliseconds}`,
                "ja": `${locale.ja.arg.milliseconds}`,
                "pt-BR": `${locale.pt_BR.arg.milliseconds}`,
                "ko": `${locale.ko.arg.milliseconds}`,
                "bg": `${locale.bg.arg.milliseconds}`,
                "sv-SE": `${locale.sv_SE.arg.milliseconds}`,
                "uk": `${locale.uk.arg.milliseconds}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Milliseconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubmilliseconds}`,
                "en-US": `${locale.en_us.addorsubmilliseconds}`,
                "de": `${locale.de.addorsubmilliseconds}`,
                "pl": `${locale.pl.addorsubmilliseconds}`,
                "fr": `${locale.fr.addorsubmilliseconds}`,
                "ja": `${locale.ja.addorsubmilliseconds}`,
                "pt-BR": `${locale.pt_BR.addorsubmilliseconds}`,
                "ko": `${locale.ko.addorsubmilliseconds}`,
                "bg": `${locale.bg.addorsubmilliseconds}`,
                "sv-SE": `${locale.sv_SE.addorsubmilliseconds}`,
                "uk": `${locale.uk.addorsubmilliseconds}`,
            })
            .setMinValue(0)
            .setMaxValue(1000000000)
            .setRequired(false)
        )
        //decide if reply be ephemeral (publicreply: false / true)
        .addBooleanOption(option =>
            option.setName('publicreply')
            .setDescription('Make the result visible to everyone in the chat')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.publicreply}`,
                "en-US": `${locale.en_us.publicreply}`,
                "de": `${locale.de.publicreply}`,
                "pl": `${locale.pl.publicreply}`,
                "fr": `${locale.fr.publicreply}`,
                "ja": `${locale.ja.publicreply}`,
                "pt-BR": `${locale.pt_BR.publicreply}`,
                "ko": `${locale.ko.publicreply}`,
                "bg": `${locale.bg.publicreply}`,
                "sv-SE": `${locale.sv_SE.publicreply}`,
                "uk": `${locale.uk.publicreply}`,
            })
            .setRequired(false)
        )
        //end of publicreply
    )
    //Calc with custom first arg
    .addSubcommand(subcommand =>
        subcommand.setName('fromdate')
        .setDescription('🧮 Add or subtract time from the specified date')
        .setDescriptionLocalizations({
            "ru": `🧮 ${locale.ru.desccalcfromdate}`,
            "en-US": `🧮 ${locale.en_us.desccalcfromdate}`,
            "de": `🧮 ${locale.de.desccalcfromdate}`,
            "pl": `🧮 ${locale.pl.desccalcfromdate}`,
            "fr": `🧮 ${locale.fr.desccalcfromdate}`,
            "ja": `🧮 ${locale.ja.desccalcfromdate}`,
            "pt-BR": `🧮 ${locale.pt_BR.desccalcfromdate}`,
            "ko": `🧮 ${locale.ko.desccalcfromdate}`,
            "bg": `🧮 ${locale.bg.desccalcfromdate}`,
            "sv-SE": `🧮 ${locale.sv_SE.desccalcfromdate}`,
            "uk": `🧮 ${locale.uk.desccalcfromdate}`,
        })
        //arg1
        .addIntegerOption(option =>
            option.setName('year')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.year}`,
                "en-US": `${locale.en_us.arg.year}`,
                "de": `${locale.de.arg.year}`,
                "pl": `${locale.pl.arg.year}`,
                "fr": `${locale.fr.arg.year}`,
                "ja": `${locale.ja.arg.year}`,
                "pt-BR": `${locale.pt_BR.arg.year}`,
                "ko": `${locale.ko.arg.year}`,
                "bg": `${locale.bg.arg.year}`,
                "sv-SE": `${locale.sv_SE.arg.year}`,
                "uk": `${locale.uk.arg.year}`,
            })
            .setDescription('Type Year to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeyeartocountfrom}`,
                "en-US": `${locale.en_us.typeyeartocountfrom}`,
                "de": `${locale.de.typeyeartocountfrom}`,
                "pl": `${locale.pl.typeyeartocountfrom}`,
                "fr": `${locale.fr.typeyeartocountfrom}`,
                "ja": `${locale.ja.typeyeartocountfrom}`,
                "pt-BR": `${locale.pt_BR.typeyeartocountfrom}`,
                "ko": `${locale.ko.typeyeartocountfrom}`,
                "bg": `${locale.bg.typeyeartocountfrom}`,
                "sv-SE": `${locale.sv_SE.typeyeartocountfrom}`,
                "uk": `${locale.uk.typeyeartocountfrom}`,
            })
            .setMinValue(1601)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('month')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.month}`,
                "en-US": `${locale.en_us.arg.month}`,
                "de": `${locale.de.arg.month}`,
                "pl": `${locale.pl.arg.month}`,
                "fr": `${locale.fr.arg.month}`,
                "ja": `${locale.ja.arg.month}`,
                "pt-BR": `${locale.pt_BR.arg.month}`,
                "ko": `${locale.ko.arg.month}`,
                "bg": `${locale.bg.arg.month}`,
                "sv-SE": `${locale.sv_SE.arg.month}`,
                "uk": `${locale.uk.arg.month}`,
            })
            .setDescription('Select Month to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selmonthtocountfrom}`,
                "en-US": `${locale.en_us.selmonthtocountfrom}`,
                "de": `${locale.de.selmonthtocountfrom}`,
                "pl": `${locale.pl.selmonthtocountfrom}`,
                "fr": `${locale.fr.selmonthtocountfrom}`,
                "ja": `${locale.ja.selmonthtocountfrom}`,
                "pt-BR": `${locale.pt_BR.selmonthtocountfrom}`,
                "ko": `${locale.ko.selmonthtocountfrom}`,
                "bg": `${locale.bg.selmonthtocountfrom}`,
                "sv-SE": `${locale.sv_SE.selmonthtocountfrom}`,
                "uk": `${locale.uk.selmonthtocountfrom}`,
            })
            .setRequired(true)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('day')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.day}`,
                "en-US": `${locale.en_us.arg.day}`,
                "de": `${locale.de.arg.day}`,
                "pl": `${locale.pl.arg.day}`,
                "fr": `${locale.fr.arg.day}`,
                "ja": `${locale.ja.arg.day}`,
                "pt-BR": `${locale.pt_BR.arg.day}`,
                "ko": `${locale.ko.arg.day}`,
                "bg": `${locale.bg.arg.day}`,
                "sv-SE": `${locale.sv_SE.arg.day}`,
                "uk": `${locale.uk.arg.day}`,
            })
            .setDescription('Type Day to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typedaytocountfrom}`,
                "en-US": `${locale.en_us.typedaytocountfrom}`,
                "de": `${locale.de.typedaytocountfrom}`,
                "pl": `${locale.pl.typedaytocountfrom}`,
                "fr": `${locale.fr.typedaytocountfrom}`,
                "ja": `${locale.ja.typedaytocountfrom}`,
                "pt-BR": `${locale.pt_BR.typedaytocountfrom}`,
                "ko": `${locale.ko.typedaytocountfrom}`,
                "bg": `${locale.bg.typedaytocountfrom}`,
                "sv-SE": `${locale.sv_SE.typedaytocountfrom}`,
                "uk": `${locale.uk.typedaytocountfrom}`,
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        //arg1
        .addIntegerOption(option =>
            option.setName('hour')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.hour}`,
                "en-US": `${locale.en_us.arg.hour}`,
                "de": `${locale.de.arg.hour}`,
                "pl": `${locale.pl.arg.hour}`,
                "fr": `${locale.fr.arg.hour}`,
                "ja": `${locale.ja.arg.hour}`,
                "pt-BR": `${locale.pt_BR.arg.hour}`,
                "ko": `${locale.ko.arg.hour}`,
                "bg": `${locale.bg.arg.hour}`,
                "sv-SE": `${locale.sv_SE.arg.hour}`,
                "uk": `${locale.uk.arg.hour}`,
            })
            .setDescription('Type Hour to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typehourtocountfrom}`,
                "en-US": `${locale.en_us.typehourtocountfrom}`,
                "de": `${locale.de.typehourtocountfrom}`,
                "pl": `${locale.pl.typehourtocountfrom}`,
                "fr": `${locale.fr.typehourtocountfrom}`,
                "ja": `${locale.ja.typehourtocountfrom}`,
                "pt-BR": `${locale.pt_BR.typehourtocountfrom}`,
                "ko": `${locale.ko.typehourtocountfrom}`,
                "bg": `${locale.bg.typehourtocountfrom}`,
                "sv-SE": `${locale.sv_SE.typehourtocountfrom}`,
                "uk": `${locale.uk.typehourtocountfrom}`,
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('minute')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.minute}`,
                "en-US": `${locale.en_us.arg.minute}`,
                "de": `${locale.de.arg.minute}`,
                "pl": `${locale.pl.arg.minute}`,
                "fr": `${locale.fr.arg.minute}`,
                "ja": `${locale.ja.arg.minute}`,
                "pt-BR": `${locale.pt_BR.arg.minute}`,
                "ko": `${locale.ko.arg.minute}`,
                "bg": `${locale.bg.arg.minute}`,
                "sv-SE": `${locale.sv_SE.arg.minute}`,
                "uk": `${locale.uk.arg.minute}`,
            })
            .setDescription('Type Minute to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeminutetocountfrom}`,
                "en-US": `${locale.en_us.typeminutetocountfrom}`,
                "de": `${locale.de.typeminutetocountfrom}`,
                "pl": `${locale.pl.typeminutetocountfrom}`,
                "fr": `${locale.fr.typeminutetocountfrom}`,
                "ja": `${locale.ja.typeminutetocountfrom}`,
                "pt-BR": `${locale.pt_BR.typeminutetocountfrom}`,
                "ko": `${locale.ko.typeminutetocountfrom}`,
                "bg": `${locale.bg.typeminutetocountfrom}`,
                "sv-SE": `${locale.sv_SE.typeminutetocountfrom}`,
                "uk": `${locale.uk.typeminutetocountfrom}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('second')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.second}`,
                "en-US": `${locale.en_us.arg.second}`,
                "de": `${locale.de.arg.second}`,
                "pl": `${locale.pl.arg.second}`,
                "fr": `${locale.fr.arg.second}`,
                "ja": `${locale.ja.arg.second}`,
                "pt-BR": `${locale.pt_BR.arg.second}`,
                "ko": `${locale.ko.arg.second}`,
                "bg": `${locale.bg.arg.second}`,
                "sv-SE": `${locale.sv_SE.arg.second}`,
                "uk": `${locale.uk.arg.second}`,
            })
            .setDescription('Type Second to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondtocountfrom}`,
                "en-US": `${locale.en_us.typesecondtocountfrom}`,
                "de": `${locale.de.typesecondtocountfrom}`,
                "pl": `${locale.pl.typesecondtocountfrom}`,
                "fr": `${locale.fr.typesecondtocountfrom}`,
                "ja": `${locale.ja.typesecondtocountfrom}`,
                "pt-BR": `${locale.pt_BR.typesecondtocountfrom}`,
                "ko": `${locale.ko.typesecondtocountfrom}`,
                "bg": `${locale.bg.typesecondtocountfrom}`,
                "sv-SE": `${locale.sv_SE.typesecondtocountfrom}`,
                "uk": `${locale.uk.typesecondtocountfrom}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('millisecond')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.millisecond}`,
                "en-US": `${locale.en_us.arg.millisecond}`,
                "de": `${locale.de.arg.millisecond}`,
                "pl": `${locale.pl.arg.millisecond}`,
                "fr": `${locale.fr.arg.millisecond}`,
                "ja": `${locale.ja.arg.millisecond}`,
                "pt-BR": `${locale.pt_BR.arg.millisecond}`,
                "ko": `${locale.ko.arg.millisecond}`,
                "bg": `${locale.bg.arg.millisecond}`,
                "sv-SE": `${locale.sv_SE.arg.millisecond}`,
                "uk": `${locale.uk.arg.millisecond}`,
            })
            .setDescription('Type Millisecond to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typemillisecondtocountfrom}`,
                "en-US": `${locale.en_us.typemillisecondtocountfrom}`,
                "de": `${locale.de.typemillisecondtocountfrom}`,
                "pl": `${locale.pl.typemillisecondtocountfrom}`,
                "fr": `${locale.fr.typemillisecondtocountfrom}`,
                "ja": `${locale.ja.typemillisecondtocountfrom}`,
                "pt-BR": `${locale.pt_BR.typemillisecondtocountfrom}`,
                "ko": `${locale.ko.typemillisecondtocountfrom}`,
                "bg": `${locale.bg.typemillisecondtocountfrom}`,
                "sv-SE": `${locale.sv_SE.typemillisecondtocountfrom}`,
                "uk": `${locale.uk.typemillisecondtocountfrom}`,
            })
            .setMinValue(0)
            .setMaxValue(999)
            .setRequired(true)
        )
        //Add or subtract
        .addStringOption(option =>
            option.setName('matharg')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.matharg}`,
                "en-US": `${locale.en_us.arg.matharg}`,
                "de": `${locale.de.arg.matharg}`,
                "pl": `${locale.pl.arg.matharg}`,
                "fr": `${locale.fr.arg.matharg}`,
                "ja": `${locale.ja.arg.matharg}`,
                "pt-BR": `${locale.pt_BR.arg.matharg}`,
                "ko": `${locale.ko.arg.matharg}`,
                "bg": `${locale.bg.arg.matharg}`,
                "sv-SE": `${locale.sv_SE.arg.matharg}`,
                "uk": `${locale.uk.arg.matharg}`,
            })
            .setDescription('ADD OR SUBTRACT')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsub}`,
                "en-US": `${locale.en_us.addorsub}`,
                "de": `${locale.de.addorsub}`,
                "pl": `${locale.pl.addorsub}`,
                "fr": `${locale.fr.addorsub}`,
                "ja": `${locale.ja.addorsub}`,
                "pt-BR": `${locale.pt_BR.addorsub}`,
                "ko": `${locale.ko.addorsub}`,
                "bg": `${locale.bg.addorsub}`,
                "sv-SE": `${locale.sv_SE.addorsub}`,
                "uk": `${locale.uk.addorsub}`,
            })
            .setRequired(true)
            .addChoices({
                name: 'Add (+)',
                value: 'Add',
                name_localizations: { "ru": `${locale.ru.add}`, "en-US": `${locale.en_us.add}`, "de": `${locale.de.add}`, "pl": `${locale.pl.add}`, "fr": `${locale.fr.add}`, "ja": `${locale.ja.add}`, "pt-BR": `${locale.pt_BR.add}`, "ko": `${locale.ko.add}`, "bg": `${locale.bg.add}`, "sv-SE": `${locale.sv_SE.add}`, "uk": `${locale.uk.add}` }
                },
                { name: 'Subtract (-)',
                  value: 'Subtract',
                  name_localizations: { "ru": `${locale.ru.subtract}`, "en-US": `${locale.en_us.subtract}`, "de": `${locale.de.subtract}`, "pl": `${locale.pl.subtract}`, "fr": `${locale.fr.subtract}`, "ja": `${locale.ja.subtract}`, "pt-BR": `${locale.pt_BR.subtract}`, "ko": `${locale.ko.subtract}`, "bg": `${locale.bg.subtract}`, "sv-SE": `${locale.sv_SE.subtract}`, "uk": `${locale.uk.subtract}` }
                }
            )
        )
        //timezone of arg1
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
                "de": `${locale.de.arg.timezone}`,
                "pl": `${locale.pl.arg.timezone}`,
                "fr": `${locale.fr.arg.timezone}`,
                "ja": `${locale.ja.arg.timezone}`,
                "pt-BR": `${locale.pt_BR.arg.timezone}`,
                "ko": `${locale.ko.arg.timezone}`,
                "bg": `${locale.bg.arg.timezone}`,
                "sv-SE": `${locale.sv_SE.arg.timezone}`,
                "uk": `${locale.uk.arg.timezone}`,
            })
            .setDescription('Select timezone of input (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.seltimezone}`,
                "en-US": `${locale.en_us.seltimezone}`,
                "de": `${locale.de.seltimezone}`,
                "pl": `${locale.pl.seltimezone}`,
                "fr": `${locale.fr.seltimezone}`,
                "ja": `${locale.ja.seltimezone}`,
                "pt-BR": `${locale.pt_BR.seltimezone}`,
                "ko": `${locale.ko.seltimezone}`,
                "bg": `${locale.bg.seltimezone}`,
                "sv-SE": `${locale.sv_SE.seltimezone}`,
                "uk": `${locale.uk.seltimezone}`,
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
        //arg2
        .addIntegerOption(option =>
            option.setName('years')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.years}`,
                "en-US": `${locale.en_us.arg.years}`,
                "de": `${locale.de.arg.years}`,
                "pl": `${locale.pl.arg.years}`,
                "fr": `${locale.fr.arg.years}`,
                "ja": `${locale.ja.arg.years}`,
                "pt-BR": `${locale.pt_BR.arg.years}`,
                "ko": `${locale.ko.arg.years}`,
                "bg": `${locale.bg.arg.years}`,
                "sv-SE": `${locale.sv_SE.arg.years}`,
                "uk": `${locale.uk.arg.years}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of years (Inaccurate. 365 days)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubyears}`,
                "en-US": `${locale.en_us.addorsubyears}`,
                "de": `${locale.de.addorsubyears}`,
                "pl": `${locale.pl.addorsubyears}`,
                "fr": `${locale.fr.addorsubyears}`,
                "ja": `${locale.ja.addorsubyears}`,
                "pt-BR": `${locale.pt_BR.addorsubyears}`,
                "ko": `${locale.ko.addorsubyears}`,
                "bg": `${locale.bg.addorsubyears}`,
                "sv-SE": `${locale.sv_SE.addorsubyears}`,
                "uk": `${locale.uk.addorsubyears}`,
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('months')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.months}`,
                "en-US": `${locale.en_us.arg.months}`,
                "de": `${locale.de.arg.months}`,
                "pl": `${locale.pl.arg.months}`,
                "fr": `${locale.fr.arg.months}`,
                "ja": `${locale.ja.arg.months}`,
                "pt-BR": `${locale.pt_BR.arg.months}`,
                "ko": `${locale.ko.arg.months}`,
                "bg": `${locale.bg.arg.months}`,
                "sv-SE": `${locale.sv_SE.arg.months}`,
                "uk": `${locale.uk.arg.months}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of months (Inaccurate. 30 days)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubmonths}`,
                "en-US": `${locale.en_us.addorsubmonths}`,
                "de": `${locale.de.addorsubmonths}`,
                "pl": `${locale.pl.addorsubmonths}`,
                "fr": `${locale.fr.addorsubmonths}`,
                "ja": `${locale.ja.addorsubmonths}`,
                "pt-BR": `${locale.pt_BR.addorsubmonths}`,
                "ko": `${locale.ko.addorsubmonths}`,
                "bg": `${locale.bg.addorsubmonths}`,
                "sv-SE": `${locale.sv_SE.addorsubmonths}`,
                "uk": `${locale.uk.addorsubmonths}`,
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('weeks')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.weeks}`,
                "en-US": `${locale.en_us.arg.weeks}`,
                "de": `${locale.de.arg.weeks}`,
                "pl": `${locale.pl.arg.weeks}`,
                "fr": `${locale.fr.arg.weeks}`,
                "ja": `${locale.ja.arg.weeks}`,
                "pt-BR": `${locale.pt_BR.arg.weeks}`,
                "ko": `${locale.ko.arg.weeks}`,
                "bg": `${locale.bg.arg.weeks}`,
                "sv-SE": `${locale.sv_SE.arg.weeks}`,
                "uk": `${locale.uk.arg.weeks}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Weeks')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubweeks}`,
                "en-US": `${locale.en_us.addorsubweeks}`,
                "de": `${locale.de.addorsubweeks}`,
                "pl": `${locale.pl.addorsubweeks}`,
                "fr": `${locale.fr.addorsubweeks}`,
                "ja": `${locale.ja.addorsubweeks}`,
                "pt-BR": `${locale.pt_BR.addorsubweeks}`,
                "ko": `${locale.ko.addorsubweeks}`,
                "bg": `${locale.bg.addorsubweeks}`,
                "sv-SE": `${locale.sv_SE.addorsubweeks}`,
                "uk": `${locale.uk.addorsubweeks}`,
            })
            .setMinValue(0)
            .setMaxValue(5000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('days')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.days}`,
                "en-US": `${locale.en_us.arg.days}`,
                "de": `${locale.de.arg.days}`,
                "pl": `${locale.pl.arg.days}`,
                "fr": `${locale.fr.arg.days}`,
                "ja": `${locale.ja.arg.days}`,
                "pt-BR": `${locale.pt_BR.arg.days}`,
                "ko": `${locale.ko.arg.days}`,
                "bg": `${locale.bg.arg.days}`,
                "sv-SE": `${locale.sv_SE.arg.days}`,
                "uk": `${locale.uk.arg.days}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Days')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubdays}`,
                "en-US": `${locale.en_us.addorsubdays}`,
                "de": `${locale.de.addorsubdays}`,
                "pl": `${locale.pl.addorsubdays}`,
                "fr": `${locale.fr.addorsubdays}`,
                "ja": `${locale.ja.addorsubdays}`,
                "pt-BR": `${locale.pt_BR.addorsubdays}`,
                "ko": `${locale.ko.addorsubdays}`,
                "bg": `${locale.bg.addorsubdays}`,
                "sv-SE": `${locale.sv_SE.addorsubdays}`,
                "uk": `${locale.uk.addorsubdays}`,
            })
            .setMinValue(0)
            .setMaxValue(50000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('hours')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.hours}`,
                "en-US": `${locale.en_us.arg.hours}`,
                "de": `${locale.de.arg.hours}`,
                "pl": `${locale.pl.arg.hours}`,
                "fr": `${locale.fr.arg.hours}`,
                "ja": `${locale.ja.arg.hours}`,
                "pt-BR": `${locale.pt_BR.arg.hours}`,
                "ko": `${locale.ko.arg.hours}`,
                "bg": `${locale.bg.arg.hours}`,
                "sv-SE": `${locale.sv_SE.arg.hours}`,
                "uk": `${locale.uk.arg.hours}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Hours')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubhours}`,
                "en-US": `${locale.en_us.addorsubhours}`,
                "de": `${locale.de.addorsubhours}`,
                "pl": `${locale.pl.addorsubhours}`,
                "fr": `${locale.fr.addorsubhours}`,
                "ja": `${locale.ja.addorsubhours}`,
                "pt-BR": `${locale.pt_BR.addorsubhours}`,
                "ko": `${locale.ko.addorsubhours}`,
                "bg": `${locale.bg.addorsubhours}`,
                "sv-SE": `${locale.sv_SE.addorsubhours}`,
                "uk": `${locale.uk.addorsubhours}`,
            })
            .setMinValue(0)
            .setMaxValue(240000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('minutes')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.minutes}`,
                "en-US": `${locale.en_us.arg.minutes}`,
                "de": `${locale.de.arg.minutes}`,
                "pl": `${locale.pl.arg.minutes}`,
                "fr": `${locale.fr.arg.minutes}`,
                "ja": `${locale.ja.arg.minutes}`,
                "pt-BR": `${locale.pt_BR.arg.minutes}`,
                "ko": `${locale.ko.arg.minutes}`,
                "bg": `${locale.bg.arg.minutes}`,
                "sv-SE": `${locale.sv_SE.arg.minutes}`,
                "uk": `${locale.uk.arg.minutes}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Minutes')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubminutes}`,
                "en-US": `${locale.en_us.addorsubminutes}`,
                "de": `${locale.de.addorsubminutes}`,
                "pl": `${locale.pl.addorsubminutes}`,
                "fr": `${locale.fr.addorsubminutes}`,
                "ja": `${locale.ja.addorsubminutes}`,
                "pt-BR": `${locale.pt_BR.addorsubminutes}`,
                "ko": `${locale.ko.addorsubminutes}`,
                "bg": `${locale.bg.addorsubminutes}`,
                "sv-SE": `${locale.sv_SE.addorsubminutes}`,
                "uk": `${locale.uk.addorsubminutes}`,
            })
            .setMinValue(0)
            .setMaxValue(1000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('seconds')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.seconds}`,
                "en-US": `${locale.en_us.arg.seconds}`,
                "de": `${locale.de.arg.seconds}`,
                "pl": `${locale.pl.arg.seconds}`,
                "fr": `${locale.fr.arg.seconds}`,
                "ja": `${locale.ja.arg.seconds}`,
                "pt-BR": `${locale.pt_BR.arg.seconds}`,
                "ko": `${locale.ko.arg.seconds}`,
                "bg": `${locale.bg.arg.seconds}`,
                "sv-SE": `${locale.sv_SE.arg.seconds}`,
                "uk": `${locale.uk.arg.seconds}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Seconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubseconds}`,
                "en-US": `${locale.en_us.addorsubseconds}`,
                "de": `${locale.de.addorsubseconds}`,
                "pl": `${locale.pl.addorsubseconds}`,
                "fr": `${locale.fr.addorsubseconds}`,
                "ja": `${locale.ja.addorsubseconds}`,
                "pt-BR": `${locale.pt_BR.addorsubseconds}`,
                "ko": `${locale.ko.addorsubseconds}`,
                "bg": `${locale.bg.addorsubseconds}`,
                "sv-SE": `${locale.sv_SE.addorsubseconds}`,
                "uk": `${locale.uk.addorsubseconds}`,
            })
            .setMinValue(0)
            .setMaxValue(100000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('milliseconds')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.milliseconds}`,
                "en-US": `${locale.en_us.arg.milliseconds}`,
                "de": `${locale.de.arg.milliseconds}`,
                "pl": `${locale.pl.arg.milliseconds}`,
                "fr": `${locale.fr.arg.milliseconds}`,
                "ja": `${locale.ja.arg.milliseconds}`,
                "pt-BR": `${locale.pt_BR.arg.milliseconds}`,
                "ko": `${locale.ko.arg.milliseconds}`,
                "bg": `${locale.bg.arg.milliseconds}`,
                "sv-SE": `${locale.sv_SE.arg.milliseconds}`,
                "uk": `${locale.uk.arg.milliseconds}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Milliseconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubmilliseconds}`,
                "en-US": `${locale.en_us.addorsubmilliseconds}`,
                "de": `${locale.de.addorsubmilliseconds}`,
                "pl": `${locale.pl.addorsubmilliseconds}`,
                "fr": `${locale.fr.addorsubmilliseconds}`,
                "ja": `${locale.ja.addorsubmilliseconds}`,
                "pt-BR": `${locale.pt_BR.addorsubmilliseconds}`,
                "ko": `${locale.ko.addorsubmilliseconds}`,
                "bg": `${locale.bg.addorsubmilliseconds}`,
                "sv-SE": `${locale.sv_SE.addorsubmilliseconds}`,
                "uk": `${locale.uk.addorsubmilliseconds}`,
            })
            .setMinValue(0)
            .setMaxValue(1000000000)
            .setRequired(false)
        )
        //decide if reply be ephemeral (publicreply: false / true)
        .addBooleanOption(option =>
            option.setName('publicreply')
            .setDescription('Make the result visible to everyone in the chat')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.publicreply}`,
                "en-US": `${locale.en_us.publicreply}`,
                "de": `${locale.de.publicreply}`,
                "pl": `${locale.pl.publicreply}`,
                "fr": `${locale.fr.publicreply}`,
                "ja": `${locale.ja.publicreply}`,
                "pt-BR": `${locale.pt_BR.publicreply}`,
                "ko": `${locale.ko.publicreply}`,
                "bg": `${locale.bg.publicreply}`,
                "sv-SE": `${locale.sv_SE.publicreply}`,
                "uk": `${locale.uk.publicreply}`,
            })
            .setRequired(false)
        )
        //end of publicreply
    )
    //calculate time between dates
    .addSubcommand(subcommand =>
        subcommand.setName('from-to')
        .setDescription('🧮 Calculate time between two dates')
        .setDescriptionLocalizations({
            "ru": `🧮 ${locale.ru.desccalcfromto}`,
            "en-US": `🧮 ${locale.en_us.desccalcfromto}`,
            "de": `🧮 ${locale.de.desccalcfromto}`,
            "pl": `🧮 ${locale.pl.desccalcfromto}`,
            "fr": `🧮 ${locale.fr.desccalcfromto}`,
            "ja": `🧮 ${locale.ja.desccalcfromto}`,
            "pt-BR": `🧮 ${locale.pt_BR.desccalcfromto}`,
            "ko": `🧮 ${locale.ko.desccalcfromto}`,
            "bg": `🧮 ${locale.bg.desccalcfromto}`,
            "sv-SE": `🧮 ${locale.sv_SE.desccalcfromto}`,
            "uk": `🧮 ${locale.uk.desccalcfromto}`,
        })
        //first date
        .addIntegerOption(option =>
            option.setName('fromyear')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromyear}`,
                "en-US": `${locale.en_us.arg.fromyear}`,
                "de": `${locale.de.arg.fromyear}`,
                "pl": `${locale.pl.arg.fromyear}`,
                "fr": `${locale.fr.arg.fromyear}`,
                "ja": `${locale.ja.arg.fromyear}`,
                "pt-BR": `${locale.pt_BR.arg.fromyear}`,
                "ko": `${locale.ko.arg.fromyear}`,
                "bg": `${locale.bg.arg.fromyear}`,
                "sv-SE": `${locale.sv_SE.arg.fromyear}`,
                "uk": `${locale.uk.arg.fromyear}`,
            })
            .setDescription('Type first date Year')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstyear}`,
                "en-US": `${locale.en_us.typefirstyear}`,
                "de": `${locale.de.typefirstyear}`,
                "pl": `${locale.pl.typefirstyear}`,
                "fr": `${locale.fr.typefirstyear}`,
                "ja": `${locale.ja.typefirstyear}`,
                "pt-BR": `${locale.pt_BR.typefirstyear}`,
                "ko": `${locale.ko.typefirstyear}`,
                "bg": `${locale.bg.typefirstyear}`,
                "sv-SE": `${locale.sv_SE.typefirstyear}`,
                "uk": `${locale.uk.typefirstyear}`,
            })
            .setMinValue(1001)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('frommonth')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.frommonth}`,
                "en-US": `${locale.en_us.arg.frommonth}`,
                "de": `${locale.de.arg.frommonth}`,
                "pl": `${locale.pl.arg.frommonth}`,
                "fr": `${locale.fr.arg.frommonth}`,
                "ja": `${locale.ja.arg.frommonth}`,
                "pt-BR": `${locale.pt_BR.arg.frommonth}`,
                "ko": `${locale.ko.arg.frommonth}`,
                "bg": `${locale.bg.arg.frommonth}`,
                "sv-SE": `${locale.sv_SE.arg.frommonth}`,
                "uk": `${locale.uk.arg.frommonth}`,
            })
            .setDescription('Select first date Month')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selfirstmonth}`,
                "en-US": `${locale.en_us.selfirstmonth}`,
                "de": `${locale.de.selfirstmonth}`,
                "pl": `${locale.pl.selfirstmonth}`,
                "fr": `${locale.fr.selfirstmonth}`,
                "ja": `${locale.ja.selfirstmonth}`,
                "pt-BR": `${locale.pt_BR.selfirstmonth}`,
                "ko": `${locale.ko.selfirstmonth}`,
                "bg": `${locale.bg.selfirstmonth}`,
                "sv-SE": `${locale.sv_SE.selfirstmonth}`,
                "uk": `${locale.uk.selfirstmonth}`,
            })
            .setRequired(true)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('fromday')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromday}`,
                "en-US": `${locale.en_us.arg.fromday}`,
                "de": `${locale.de.arg.fromday}`,
                "pl": `${locale.pl.arg.fromday}`,
                "fr": `${locale.fr.arg.fromday}`,
                "ja": `${locale.ja.arg.fromday}`,
                "pt-BR": `${locale.pt_BR.arg.fromday}`,
                "ko": `${locale.ko.arg.fromday}`,
                "bg": `${locale.bg.arg.fromday}`,
                "sv-SE": `${locale.sv_SE.arg.fromday}`,
                "uk": `${locale.uk.arg.fromday}`,
            })
            .setDescription('Type first date Day')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstday}`,
                "en-US": `${locale.en_us.typefirstday}`,
                "de": `${locale.de.typefirstday}`,
                "pl": `${locale.pl.typefirstday}`,
                "fr": `${locale.fr.typefirstday}`,
                "ja": `${locale.ja.typefirstday}`,
                "pt-BR": `${locale.pt_BR.typefirstday}`,
                "ko": `${locale.ko.typefirstday}`,
                "bg": `${locale.bg.typefirstday}`,
                "sv-SE": `${locale.sv_SE.typefirstday}`,
                "uk": `${locale.uk.typefirstday}`,
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        //second date
        .addIntegerOption(option =>
            option.setName('toyear')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.toyear}`,
                "en-US": `${locale.en_us.arg.toyear}`,
                "de": `${locale.de.arg.toyear}`,
                "pl": `${locale.pl.arg.toyear}`,
                "fr": `${locale.fr.arg.toyear}`,
                "ja": `${locale.ja.arg.toyear}`,
                "pt-BR": `${locale.pt_BR.arg.toyear}`,
                "ko": `${locale.ko.arg.toyear}`,
                "bg": `${locale.bg.arg.toyear}`,
                "sv-SE": `${locale.sv_SE.arg.toyear}`,
                "uk": `${locale.uk.arg.toyear}`,
            })
            .setDescription('Type second date Year')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondyear}`,
                "en-US": `${locale.en_us.typesecondyear}`,
                "de": `${locale.de.typesecondyear}`,
                "pl": `${locale.pl.typesecondyear}`,
                "fr": `${locale.fr.typesecondyear}`,
                "ja": `${locale.ja.typesecondyear}`,
                "pt-BR": `${locale.pt_BR.typesecondyear}`,
                "ko": `${locale.ko.typesecondyear}`,
                "bg": `${locale.bg.typesecondyear}`,
                "sv-SE": `${locale.sv_SE.typesecondyear}`,
                "uk": `${locale.uk.typesecondyear}`,
            })
            .setMinValue(1001)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('tomonth')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tomonth}`,
                "en-US": `${locale.en_us.arg.tomonth}`,
                "de": `${locale.de.arg.tomonth}`,
                "pl": `${locale.pl.arg.tomonth}`,
                "fr": `${locale.fr.arg.tomonth}`,
                "ja": `${locale.ja.arg.tomonth}`,
                "pt-BR": `${locale.pt_BR.arg.tomonth}`,
                "ko": `${locale.ko.arg.tomonth}`,
                "bg": `${locale.bg.arg.tomonth}`,
                "sv-SE": `${locale.sv_SE.arg.tomonth}`,
                "uk": `${locale.uk.arg.tomonth}`,
            })
            .setDescription('Select second date Month')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selsecondmonth}`,
                "en-US": `${locale.en_us.selsecondmonth}`,
                "de": `${locale.de.selsecondmonth}`,
                "pl": `${locale.pl.selsecondmonth}`,
                "fr": `${locale.fr.selsecondmonth}`,
                "ja": `${locale.ja.selsecondmonth}`,
                "pt-BR": `${locale.pt_BR.selsecondmonth}`,
                "ko": `${locale.ko.selsecondmonth}`,
                "bg": `${locale.bg.selsecondmonth}`,
                "sv-SE": `${locale.sv_SE.selsecondmonth}`,
                "uk": `${locale.uk.selsecondmonth}`,
            })
            .setRequired(true)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('today')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.today}`,
                "en-US": `${locale.en_us.arg.today}`,
                "de": `${locale.de.arg.today}`,
                "pl": `${locale.pl.arg.today}`,
                "fr": `${locale.fr.arg.today}`,
                "ja": `${locale.ja.arg.today}`,
                "pt-BR": `${locale.pt_BR.arg.today}`,
                "ko": `${locale.ko.arg.today}`,
                "bg": `${locale.bg.arg.today}`,
                "sv-SE": `${locale.sv_SE.arg.today}`,
                "uk": `${locale.uk.arg.today}`,
            })
            .setDescription('Type second date Day')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondday}`,
                "en-US": `${locale.en_us.typesecondday}`,
                "de": `${locale.de.typesecondday}`,
                "pl": `${locale.pl.typesecondday}`,
                "fr": `${locale.fr.typesecondday}`,
                "ja": `${locale.ja.typesecondday}`,
                "pt-BR": `${locale.pt_BR.typesecondday}`,
                "ko": `${locale.ko.typesecondday}`,
                "bg": `${locale.bg.typesecondday}`,
                "sv-SE": `${locale.sv_SE.typesecondday}`,
                "uk": `${locale.uk.typesecondday}`,
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        //first time
        .addIntegerOption(option =>
            option.setName('fromhour')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromhour}`,
                "en-US": `${locale.en_us.arg.fromhour}`,
                "de": `${locale.de.arg.fromhour}`,
                "pl": `${locale.pl.arg.fromhour}`,
                "fr": `${locale.fr.arg.fromhour}`,
                "ja": `${locale.ja.arg.fromhour}`,
                "pt-BR": `${locale.pt_BR.arg.fromhour}`,
                "ko": `${locale.ko.arg.fromhour}`,
                "bg": `${locale.bg.arg.fromhour}`,
                "sv-SE": `${locale.sv_SE.arg.fromhour}`,
                "uk": `${locale.uk.arg.fromhour}`,
            })
            .setDescription('Type first date Hour')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirsthour}`,
                "en-US": `${locale.en_us.typefirsthour}`,
                "de": `${locale.de.typefirsthour}`,
                "pl": `${locale.pl.typefirsthour}`,
                "fr": `${locale.fr.typefirsthour}`,
                "ja": `${locale.ja.typefirsthour}`,
                "pt-BR": `${locale.pt_BR.typefirsthour}`,
                "ko": `${locale.ko.typefirsthour}`,
                "bg": `${locale.bg.typefirsthour}`,
                "sv-SE": `${locale.sv_SE.typefirsthour}`,
                "uk": `${locale.uk.typefirsthour}`,
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('fromminute')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromminute}`,
                "en-US": `${locale.en_us.arg.fromminute}`,
                "de": `${locale.de.arg.fromminute}`,
                "pl": `${locale.pl.arg.fromminute}`,
                "fr": `${locale.fr.arg.fromminute}`,
                "ja": `${locale.ja.arg.fromminute}`,
                "pt-BR": `${locale.pt_BR.arg.fromminute}`,
                "ko": `${locale.ko.arg.fromminute}`,
                "bg": `${locale.bg.arg.fromminute}`,
                "sv-SE": `${locale.sv_SE.arg.fromminute}`,
                "uk": `${locale.uk.arg.fromminute}`,
            })
            .setDescription('Type first date Minute')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstminute}`,
                "en-US": `${locale.en_us.typefirstminute}`,
                "de": `${locale.de.typefirstminute}`,
                "pl": `${locale.pl.typefirstminute}`,
                "fr": `${locale.fr.typefirstminute}`,
                "ja": `${locale.ja.typefirstminute}`,
                "pt-BR": `${locale.pt_BR.typefirstminute}`,
                "ko": `${locale.ko.typefirstminute}`,
                "bg": `${locale.bg.typefirstminute}`,
                "sv-SE": `${locale.sv_SE.typefirstminute}`,
                "uk": `${locale.uk.typefirstminute}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('fromsecond')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromsecond}`,
                "en-US": `${locale.en_us.arg.fromsecond}`,
                "de": `${locale.de.arg.fromsecond}`,
                "pl": `${locale.pl.arg.fromsecond}`,
                "fr": `${locale.fr.arg.fromsecond}`,
                "ja": `${locale.ja.arg.fromsecond}`,
                "pt-BR": `${locale.pt_BR.arg.fromsecond}`,
                "ko": `${locale.ko.arg.fromsecond}`,
                "bg": `${locale.bg.arg.fromsecond}`,
                "sv-SE": `${locale.sv_SE.arg.fromsecond}`,
                "uk": `${locale.uk.arg.fromsecond}`,
            })
            .setDescription('Type first date Second')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstsecond}`,
                "en-US": `${locale.en_us.typefirstsecond}`,
                "de": `${locale.de.typefirstsecond}`,
                "pl": `${locale.pl.typefirstsecond}`,
                "fr": `${locale.fr.typefirstsecond}`,
                "ja": `${locale.ja.typefirstsecond}`,
                "pt-BR": `${locale.pt_BR.typefirstsecond}`,
                "ko": `${locale.ko.typefirstsecond}`,
                "bg": `${locale.bg.typefirstsecond}`,
                "sv-SE": `${locale.sv_SE.typefirstsecond}`,
                "uk": `${locale.uk.typefirstsecond}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        //second time
        .addIntegerOption(option =>
            option.setName('tohour')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tohour}`,
                "en-US": `${locale.en_us.arg.tohour}`,
                "de": `${locale.de.arg.tohour}`,
                "pl": `${locale.pl.arg.tohour}`,
                "fr": `${locale.fr.arg.tohour}`,
                "ja": `${locale.ja.arg.tohour}`,
                "pt-BR": `${locale.pt_BR.arg.tohour}`,
                "ko": `${locale.ko.arg.tohour}`,
                "bg": `${locale.bg.arg.tohour}`,
                "sv-SE": `${locale.sv_SE.arg.tohour}`,
                "uk": `${locale.uk.arg.tohour}`,
            })
            .setDescription('Type second date Hour')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondhour}`,
                "en-US": `${locale.en_us.typesecondhour}`,
                "de": `${locale.de.typesecondhour}`,
                "pl": `${locale.pl.typesecondhour}`,
                "fr": `${locale.fr.typesecondhour}`,
                "ja": `${locale.ja.typesecondhour}`,
                "pt-BR": `${locale.pt_BR.typesecondhour}`,
                "ko": `${locale.ko.typesecondhour}`,
                "bg": `${locale.bg.typesecondhour}`,
                "sv-SE": `${locale.sv_SE.typesecondhour}`,
                "uk": `${locale.uk.typesecondhour}`,
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('tominute')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tominute}`,
                "en-US": `${locale.en_us.arg.tominute}`,
                "de": `${locale.de.arg.tominute}`,
                "pl": `${locale.pl.arg.tominute}`,
                "fr": `${locale.fr.arg.tominute}`,
                "ja": `${locale.ja.arg.tominute}`,
                "pt-BR": `${locale.pt_BR.arg.tominute}`,
                "ko": `${locale.ko.arg.tominute}`,
                "bg": `${locale.bg.arg.tominute}`,
                "sv-SE": `${locale.sv_SE.arg.tominute}`,
                "uk": `${locale.uk.arg.tominute}`,
            })
            .setDescription('Type second date Minute')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondminute}`,
                "en-US": `${locale.en_us.typesecondminute}`,
                "de": `${locale.de.typesecondminute}`,
                "pl": `${locale.pl.typesecondminute}`,
                "fr": `${locale.fr.typesecondminute}`,
                "ja": `${locale.ja.typesecondminute}`,
                "pt-BR": `${locale.pt_BR.typesecondminute}`,
                "ko": `${locale.ko.typesecondminute}`,
                "bg": `${locale.bg.typesecondminute}`,
                "sv-SE": `${locale.sv_SE.typesecondminute}`,
                "uk": `${locale.uk.typesecondminute}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('tosecond')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tosecond}`,
                "en-US": `${locale.en_us.arg.tosecond}`,
                "de": `${locale.de.arg.tosecond}`,
                "pl": `${locale.pl.arg.tosecond}`,
                "fr": `${locale.fr.arg.tosecond}`,
                "ja": `${locale.ja.arg.tosecond}`,
                "pt-BR": `${locale.pt_BR.arg.tosecond}`,
                "ko": `${locale.ko.arg.tosecond}`,
                "bg": `${locale.bg.arg.tosecond}`,
                "sv-SE": `${locale.sv_SE.arg.tosecond}`,
                "uk": `${locale.uk.arg.tosecond}`,
            })
            .setDescription('Type second date Second')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondsecond}`,
                "en-US": `${locale.en_us.typesecondsecond}`,
                "de": `${locale.de.typesecondsecond}`,
                "pl": `${locale.pl.typesecondsecond}`,
                "fr": `${locale.fr.typesecondsecond}`,
                "ja": `${locale.ja.typesecondsecond}`,
                "pt-BR": `${locale.pt_BR.typesecondsecond}`,
                "ko": `${locale.ko.typesecondsecond}`,
                "bg": `${locale.bg.typesecondsecond}`,
                "sv-SE": `${locale.sv_SE.typesecondsecond}`,
                "uk": `${locale.uk.typesecondsecond}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        //decide if reply be ephemeral (publicreply: false / true)
        .addBooleanOption(option =>
            option.setName('publicreply')
            .setDescription('Make the result visible to everyone in the chat')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.publicreply}`,
                "en-US": `${locale.en_us.publicreply}`,
                "de": `${locale.de.publicreply}`,
                "pl": `${locale.pl.publicreply}`,
                "fr": `${locale.fr.publicreply}`,
                "ja": `${locale.ja.publicreply}`,
                "pt-BR": `${locale.pt_BR.publicreply}`,
                "ko": `${locale.ko.publicreply}`,
                "bg": `${locale.bg.publicreply}`,
                "sv-SE": `${locale.sv_SE.publicreply}`,
                "uk": `${locale.uk.publicreply}`,
            })
            .setRequired(false)
        )
        //end of publicreply
    )

const randomint = new SlashCommandBuilder()
    .setName('random')
    .setDescription('Get fully or custom range random Date and Time or Integer')
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addSubcommand(subcommand =>
        subcommand.setName('date')
        .setDescription('🎲 Get random Date and Time with custom range support. First date: Min, Second date: Max')
        .setDescriptionLocalizations({
            "ru": `🎲 ${locale.ru.descranddate}`,
            "en-US": `🎲 ${locale.en_us.descranddate}`,
            "de": `🎲 ${locale.de.descranddate}`,
            "pl": `🎲 ${locale.pl.descranddate}`,
            "fr": `🎲 ${locale.fr.descranddate}`,
            "ja": `🎲 ${locale.ja.descranddate}`,
            "pt-BR": `🎲 ${locale.pt_BR.descranddate}`,
            "ko": `🎲 ${locale.ko.descranddate}`,
            "bg": `🎲 ${locale.bg.descranddate}`,
            "sv-SE": `🎲 ${locale.sv_SE.descranddate}`,
            "uk": `🎲 ${locale.uk.descranddate}`,
        })
        //first date
        .addIntegerOption(option =>
            option.setName('fromyear')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromyear}`,
                "en-US": `${locale.en_us.arg.fromyear}`,
                "de": `${locale.de.arg.fromyear}`,
                "pl": `${locale.pl.arg.fromyear}`,
                "fr": `${locale.fr.arg.fromyear}`,
                "ja": `${locale.ja.arg.fromyear}`,
                "pt-BR": `${locale.pt_BR.arg.fromyear}`,
                "ko": `${locale.ko.arg.fromyear}`,
                "bg": `${locale.bg.arg.fromyear}`,
                "sv-SE": `${locale.sv_SE.arg.fromyear}`,
                "uk": `${locale.uk.arg.fromyear}`,
            })
            .setDescription('Type first date Year')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstyear}`,
                "en-US": `${locale.en_us.typefirstyear}`,
                "de": `${locale.de.typefirstyear}`,
                "pl": `${locale.pl.typefirstyear}`,
                "fr": `${locale.fr.typefirstyear}`,
                "ja": `${locale.ja.typefirstyear}`,
                "pt-BR": `${locale.pt_BR.typefirstyear}`,
                "ko": `${locale.ko.typefirstyear}`,
                "bg": `${locale.bg.typefirstyear}`,
                "sv-SE": `${locale.sv_SE.typefirstyear}`,
                "uk": `${locale.uk.typefirstyear}`,
            })
            .setMinValue(1)
            .setMaxValue(3939)
            .setRequired(true)
        )
        //second date
        .addIntegerOption(option =>
            option.setName('toyear')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.toyear}`,
                "en-US": `${locale.en_us.arg.toyear}`,
                "de": `${locale.de.arg.toyear}`,
                "pl": `${locale.pl.arg.toyear}`,
                "fr": `${locale.fr.arg.toyear}`,
                "ja": `${locale.ja.arg.toyear}`,
                "pt-BR": `${locale.pt_BR.arg.toyear}`,
                "ko": `${locale.ko.arg.toyear}`,
                "bg": `${locale.bg.arg.toyear}`,
                "sv-SE": `${locale.sv_SE.arg.toyear}`,
                "uk": `${locale.uk.arg.toyear}`,
            })
            .setDescription('Type second date Year')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondyear}`,
                "en-US": `${locale.en_us.typesecondyear}`,
                "de": `${locale.de.typesecondyear}`,
                "pl": `${locale.pl.typesecondyear}`,
                "fr": `${locale.fr.typesecondyear}`,
                "ja": `${locale.ja.typesecondyear}`,
                "pt-BR": `${locale.pt_BR.typesecondyear}`,
                "ko": `${locale.ko.typesecondyear}`,
                "bg": `${locale.bg.typesecondyear}`,
                "sv-SE": `${locale.sv_SE.typesecondyear}`,
                "uk": `${locale.uk.typesecondyear}`,
            })
            .setMinValue(1)
            .setMaxValue(3939)
            .setRequired(true)
        )
        //first date
        .addStringOption(option =>
            option.setName('frommonth')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.frommonth}`,
                "en-US": `${locale.en_us.arg.frommonth}`,
                "de": `${locale.de.arg.frommonth}`,
                "pl": `${locale.pl.arg.frommonth}`,
                "fr": `${locale.fr.arg.frommonth}`,
                "ja": `${locale.ja.arg.frommonth}`,
                "pt-BR": `${locale.pt_BR.arg.frommonth}`,
                "ko": `${locale.ko.arg.frommonth}`,
                "bg": `${locale.bg.arg.frommonth}`,
                "sv-SE": `${locale.sv_SE.arg.frommonth}`,
                "uk": `${locale.uk.arg.frommonth}`,
            })
            .setDescription('Select first date Month')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selfirstmonth}`,
                "en-US": `${locale.en_us.selfirstmonth}`,
                "de": `${locale.de.selfirstmonth}`,
                "pl": `${locale.pl.selfirstmonth}`,
                "fr": `${locale.fr.selfirstmonth}`,
                "ja": `${locale.ja.selfirstmonth}`,
                "pt-BR": `${locale.pt_BR.selfirstmonth}`,
                "ko": `${locale.ko.selfirstmonth}`,
                "bg": `${locale.bg.selfirstmonth}`,
                "sv-SE": `${locale.sv_SE.selfirstmonth}`,
                "uk": `${locale.uk.selfirstmonth}`,
            })
            .setRequired(false)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('fromday')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromday}`,
                "en-US": `${locale.en_us.arg.fromday}`,
                "de": `${locale.de.arg.fromday}`,
                "pl": `${locale.pl.arg.fromday}`,
                "fr": `${locale.fr.arg.fromday}`,
                "ja": `${locale.ja.arg.fromday}`,
                "pt-BR": `${locale.pt_BR.arg.fromday}`,
                "ko": `${locale.ko.arg.fromday}`,
                "bg": `${locale.bg.arg.fromday}`,
                "sv-SE": `${locale.sv_SE.arg.fromday}`,
                "uk": `${locale.uk.arg.fromday}`,
            })
            .setDescription('Type first date Day')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstday}`,
                "en-US": `${locale.en_us.typefirstday}`,
                "de": `${locale.de.typefirstday}`,
                "pl": `${locale.pl.typefirstday}`,
                "fr": `${locale.fr.typefirstday}`,
                "ja": `${locale.ja.typefirstday}`,
                "pt-BR": `${locale.pt_BR.typefirstday}`,
                "ko": `${locale.ko.typefirstday}`,
                "bg": `${locale.bg.typefirstday}`,
                "sv-SE": `${locale.sv_SE.typefirstday}`,
                "uk": `${locale.uk.typefirstday}`,
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('fromhour')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromhour}`,
                "en-US": `${locale.en_us.arg.fromhour}`,
                "de": `${locale.de.arg.fromhour}`,
                "pl": `${locale.pl.arg.fromhour}`,
                "fr": `${locale.fr.arg.fromhour}`,
                "ja": `${locale.ja.arg.fromhour}`,
                "pt-BR": `${locale.pt_BR.arg.fromhour}`,
                "ko": `${locale.ko.arg.fromhour}`,
                "bg": `${locale.bg.arg.fromhour}`,
                "sv-SE": `${locale.sv_SE.arg.fromhour}`,
                "uk": `${locale.uk.arg.fromhour}`,
            })
            .setDescription('Type first date Hour')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirsthour}`,
                "en-US": `${locale.en_us.typefirsthour}`,
                "de": `${locale.de.typefirsthour}`,
                "pl": `${locale.pl.typefirsthour}`,
                "fr": `${locale.fr.typefirsthour}`,
                "ja": `${locale.ja.typefirsthour}`,
                "pt-BR": `${locale.pt_BR.typefirsthour}`,
                "ko": `${locale.ko.typefirsthour}`,
                "bg": `${locale.bg.typefirsthour}`,
                "sv-SE": `${locale.sv_SE.typefirsthour}`,
                "uk": `${locale.uk.typefirsthour}`,
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('fromminute')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromminute}`,
                "en-US": `${locale.en_us.arg.fromminute}`,
                "de": `${locale.de.arg.fromminute}`,
                "pl": `${locale.pl.arg.fromminute}`,
                "fr": `${locale.fr.arg.fromminute}`,
                "ja": `${locale.ja.arg.fromminute}`,
                "pt-BR": `${locale.pt_BR.arg.fromminute}`,
                "ko": `${locale.ko.arg.fromminute}`,
                "bg": `${locale.bg.arg.fromminute}`,
                "sv-SE": `${locale.sv_SE.arg.fromminute}`,
                "uk": `${locale.uk.arg.fromminute}`,
            })
            .setDescription('Type first date Minute')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstminute}`,
                "en-US": `${locale.en_us.typefirstminute}`,
                "de": `${locale.de.typefirstminute}`,
                "pl": `${locale.pl.typefirstminute}`,
                "fr": `${locale.fr.typefirstminute}`,
                "ja": `${locale.ja.typefirstminute}`,
                "pt-BR": `${locale.pt_BR.typefirstminute}`,
                "ko": `${locale.ko.typefirstminute}`,
                "bg": `${locale.bg.typefirstminute}`,
                "sv-SE": `${locale.sv_SE.typefirstminute}`,
                "uk": `${locale.uk.typefirstminute}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('fromsecond')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromsecond}`,
                "en-US": `${locale.en_us.arg.fromsecond}`,
                "de": `${locale.de.arg.fromsecond}`,
                "pl": `${locale.pl.arg.fromsecond}`,
                "fr": `${locale.fr.arg.fromsecond}`,
                "ja": `${locale.ja.arg.fromsecond}`,
                "pt-BR": `${locale.pt_BR.arg.fromsecond}`,
                "ko": `${locale.ko.arg.fromsecond}`,
                "bg": `${locale.bg.arg.fromsecond}`,
                "sv-SE": `${locale.sv_SE.arg.fromsecond}`,
                "uk": `${locale.uk.arg.fromsecond}`,
            })
            .setDescription('Type first date Second')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstsecond}`,
                "en-US": `${locale.en_us.typefirstsecond}`,
                "de": `${locale.de.typefirstsecond}`,
                "pl": `${locale.pl.typefirstsecond}`,
                "fr": `${locale.fr.typefirstsecond}`,
                "ja": `${locale.ja.typefirstsecond}`,
                "pt-BR": `${locale.pt_BR.typefirstsecond}`,
                "ko": `${locale.ko.typefirstsecond}`,
                "bg": `${locale.bg.typefirstsecond}`,
                "sv-SE": `${locale.sv_SE.typefirstsecond}`,
                "uk": `${locale.uk.typefirstsecond}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        //second date
        .addStringOption(option =>
            option.setName('tomonth')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tomonth}`,
                "en-US": `${locale.en_us.arg.tomonth}`,
                "de": `${locale.de.arg.tomonth}`,
                "pl": `${locale.pl.arg.tomonth}`,
                "fr": `${locale.fr.arg.tomonth}`,
                "ja": `${locale.ja.arg.tomonth}`,
                "pt-BR": `${locale.pt_BR.arg.tomonth}`,
                "ko": `${locale.ko.arg.tomonth}`,
                "bg": `${locale.bg.arg.tomonth}`,
                "sv-SE": `${locale.sv_SE.arg.tomonth}`,
                "uk": `${locale.uk.arg.tomonth}`,
            })
            .setDescription('Select second date Month')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selsecondmonth}`,
                "en-US": `${locale.en_us.selsecondmonth}`,
                "de": `${locale.de.selsecondmonth}`,
                "pl": `${locale.pl.selsecondmonth}`,
                "fr": `${locale.fr.selsecondmonth}`,
                "ja": `${locale.ja.selsecondmonth}`,
                "pt-BR": `${locale.pt_BR.selsecondmonth}`,
                "ko": `${locale.ko.selsecondmonth}`,
                "bg": `${locale.bg.selsecondmonth}`,
                "sv-SE": `${locale.sv_SE.selsecondmonth}`,
                "uk": `${locale.uk.selsecondmonth}`,
            })
            .setRequired(false)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('today')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.today}`,
                "en-US": `${locale.en_us.arg.today}`,
                "de": `${locale.de.arg.today}`,
                "pl": `${locale.pl.arg.today}`,
                "fr": `${locale.fr.arg.today}`,
                "ja": `${locale.ja.arg.today}`,
                "pt-BR": `${locale.pt_BR.arg.today}`,
                "ko": `${locale.ko.arg.today}`,
                "bg": `${locale.bg.arg.today}`,
                "sv-SE": `${locale.sv_SE.arg.today}`,
                "uk": `${locale.uk.arg.today}`,
            })
            .setDescription('Type second date Day')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondday}`,
                "en-US": `${locale.en_us.typesecondday}`,
                "de": `${locale.de.typesecondday}`,
                "pl": `${locale.pl.typesecondday}`,
                "fr": `${locale.fr.typesecondday}`,
                "ja": `${locale.ja.typesecondday}`,
                "pt-BR": `${locale.pt_BR.typesecondday}`,
                "ko": `${locale.ko.typesecondday}`,
                "bg": `${locale.bg.typesecondday}`,
                "sv-SE": `${locale.sv_SE.typesecondday}`,
                "uk": `${locale.uk.typesecondday}`,
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('tohour')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tohour}`,
                "en-US": `${locale.en_us.arg.tohour}`,
                "de": `${locale.de.arg.tohour}`,
                "pl": `${locale.pl.arg.tohour}`,
                "fr": `${locale.fr.arg.tohour}`,
                "ja": `${locale.ja.arg.tohour}`,
                "pt-BR": `${locale.pt_BR.arg.tohour}`,
                "ko": `${locale.ko.arg.tohour}`,
                "bg": `${locale.bg.arg.tohour}`,
                "sv-SE": `${locale.sv_SE.arg.tohour}`,
                "uk": `${locale.uk.arg.tohour}`,
            })
            .setDescription('Type second date Hour')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondhour}`,
                "en-US": `${locale.en_us.typesecondhour}`,
                "de": `${locale.de.typesecondhour}`,
                "pl": `${locale.pl.typesecondhour}`,
                "fr": `${locale.fr.typesecondhour}`,
                "ja": `${locale.ja.typesecondhour}`,
                "pt-BR": `${locale.pt_BR.typesecondhour}`,
                "ko": `${locale.ko.typesecondhour}`,
                "bg": `${locale.bg.typesecondhour}`,
                "sv-SE": `${locale.sv_SE.typesecondhour}`,
                "uk": `${locale.uk.typesecondhour}`,
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('tominute')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tominute}`,
                "en-US": `${locale.en_us.arg.tominute}`,
                "de": `${locale.de.arg.tominute}`,
                "pl": `${locale.pl.arg.tominute}`,
                "fr": `${locale.fr.arg.tominute}`,
                "ja": `${locale.ja.arg.tominute}`,
                "pt-BR": `${locale.pt_BR.arg.tominute}`,
                "ko": `${locale.ko.arg.tominute}`,
                "bg": `${locale.bg.arg.tominute}`,
                "sv-SE": `${locale.sv_SE.arg.tominute}`,
                "uk": `${locale.uk.arg.tominute}`,
            })
            .setDescription('Type second date Minute')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondminute}`,
                "en-US": `${locale.en_us.typesecondminute}`,
                "de": `${locale.de.typesecondminute}`,
                "pl": `${locale.pl.typesecondminute}`,
                "fr": `${locale.fr.typesecondminute}`,
                "ja": `${locale.ja.typesecondminute}`,
                "pt-BR": `${locale.pt_BR.typesecondminute}`,
                "ko": `${locale.ko.typesecondminute}`,
                "bg": `${locale.bg.typesecondminute}`,
                "sv-SE": `${locale.sv_SE.typesecondminute}`,
                "uk": `${locale.uk.typesecondminute}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('tosecond')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tosecond}`,
                "en-US": `${locale.en_us.arg.tosecond}`,
                "de": `${locale.de.arg.tosecond}`,
                "pl": `${locale.pl.arg.tosecond}`,
                "fr": `${locale.fr.arg.tosecond}`,
                "ja": `${locale.ja.arg.tosecond}`,
                "pt-BR": `${locale.pt_BR.arg.tosecond}`,
                "ko": `${locale.ko.arg.tosecond}`,
                "bg": `${locale.bg.arg.tosecond}`,
                "sv-SE": `${locale.sv_SE.arg.tosecond}`,
                "uk": `${locale.uk.arg.tosecond}`,
            })
            .setDescription('Type second date Second')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondsecond}`,
                "en-US": `${locale.en_us.typesecondsecond}`,
                "de": `${locale.de.typesecondsecond}`,
                "pl": `${locale.pl.typesecondsecond}`,
                "fr": `${locale.fr.typesecondsecond}`,
                "ja": `${locale.ja.typesecondsecond}`,
                "pt-BR": `${locale.pt_BR.typesecondsecond}`,
                "ko": `${locale.ko.typesecondsecond}`,
                "bg": `${locale.bg.typesecondsecond}`,
                "sv-SE": `${locale.sv_SE.typesecondsecond}`,
                "uk": `${locale.uk.typesecondsecond}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        //decide if reply be ephemeral (publicreply: false / true)
        .addBooleanOption(option =>
            option.setName('publicreply')
            .setDescription('Make the result visible to everyone in the chat')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.publicreply}`,
                "en-US": `${locale.en_us.publicreply}`,
                "de": `${locale.de.publicreply}`,
                "pl": `${locale.pl.publicreply}`,
                "fr": `${locale.fr.publicreply}`,
                "ja": `${locale.ja.publicreply}`,
                "pt-BR": `${locale.pt_BR.publicreply}`,
                "ko": `${locale.ko.publicreply}`,
                "bg": `${locale.bg.publicreply}`,
                "sv-SE": `${locale.sv_SE.publicreply}`,
                "uk": `${locale.uk.publicreply}`,
            })
            .setRequired(false)
        )
        //end of publicreply
    )
    .addSubcommand(subcommand =>
        subcommand.setName('integer')
        .setDescription('🎲 Get random integer with custom range support')
        .setDescriptionLocalizations({
            "ru": `🎲 ${locale.ru.descrandinteger}`,
            "en-US": `🎲 ${locale.en_us.descrandinteger}`,
            "de": `🎲 ${locale.de.descrandinteger}`,
            "pl": `🎲 ${locale.pl.descrandinteger}`,
            "fr": `🎲 ${locale.fr.descrandinteger}`,
            "ja": `🎲 ${locale.ja.descrandinteger}`,
            "pt-BR": `🎲 ${locale.pt_BR.descrandinteger}`,
            "ko": `🎲 ${locale.ko.descrandinteger}`,
            "bg": `🎲 ${locale.bg.descrandinteger}`,
            "sv-SE": `🎲 ${locale.sv_SE.descrandinteger}`,
            "uk": `🎲 ${locale.uk.descrandinteger}`,
        })
        .addIntegerOption(option =>
            option.setName('min')
            .setDescription('Type minimum possible integer')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typemininteger}`,
                "en-US": `${locale.en_us.typemininteger}`,
                "de": `${locale.de.typemininteger}`,
                "pl": `${locale.pl.typemininteger}`,
                "fr": `${locale.fr.typemininteger}`,
                "ja": `${locale.ja.typemininteger}`,
                "pt-BR": `${locale.pt_BR.typemininteger}`,
                "ko": `${locale.ko.typemininteger}`,
                "bg": `${locale.bg.typemininteger}`,
                "sv-SE": `${locale.sv_SE.typemininteger}`,
                "uk": `${locale.uk.typemininteger}`,
            })
            .setMinValue(-999999999999999)
            .setMaxValue(999999999999999)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('max')
            .setDescription('Type maximum possible integer')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typemaxinteger}`,
                "en-US": `${locale.en_us.typemaxinteger}`,
                "de": `${locale.de.typemaxinteger}`,
                "pl": `${locale.pl.typemaxinteger}`,
                "fr": `${locale.fr.typemaxinteger}`,
                "ja": `${locale.ja.typemaxinteger}`,
                "pt-BR": `${locale.pt_BR.typemaxinteger}`,
                "ko": `${locale.ko.typemaxinteger}`,
                "bg": `${locale.bg.typemaxinteger}`,
                "sv-SE": `${locale.sv_SE.typemaxinteger}`,
                "uk": `${locale.uk.typemaxinteger}`,
            })
            .setMinValue(-999999999999999)
            .setMaxValue(999999999999999)
            .setRequired(false)
        )
        //decide if reply be ephemeral (publicreply: false / true)
        .addBooleanOption(option =>
            option.setName('publicreply')
            .setDescription('Make the result visible to everyone in the chat')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.publicreply}`,
                "en-US": `${locale.en_us.publicreply}`,
                "de": `${locale.de.publicreply}`,
                "pl": `${locale.pl.publicreply}`,
                "fr": `${locale.fr.publicreply}`,
                "ja": `${locale.ja.publicreply}`,
                "pt-BR": `${locale.pt_BR.publicreply}`,
                "ko": `${locale.ko.publicreply}`,
                "bg": `${locale.bg.publicreply}`,
                "sv-SE": `${locale.sv_SE.publicreply}`,
                "uk": `${locale.uk.publicreply}`,
            })
            .setRequired(false)
        )
        //end of publicreply
    )
    .addSubcommand(subcommand =>
        subcommand.setName('dice')
        .setDescription('🎲 Throw a Dice! Also you can choose the dice! (Default: 1 ... 6)')
        .setDescriptionLocalizations({
            "ru": `🎲 ${locale.ru.descranddice}`,
            "en-US": `🎲 ${locale.en_us.descranddice}`,
            "de": `🎲 ${locale.de.descranddice}`,
            "pl": `🎲 ${locale.pl.descranddice}`,
            "fr": `🎲 ${locale.fr.descranddice}`,
            "ja": `🎲 ${locale.ja.descranddice}`,
            "pt-BR": `🎲 ${locale.pt_BR.descranddice}`,
            "ko": `🎲 ${locale.ko.descranddice}`,
            "bg": `🎲 ${locale.bg.descranddice}`,
            "sv-SE": `🎲 ${locale.sv_SE.descranddice}`,
            "uk": `🎲 ${locale.uk.descranddice}`,
        })
        .addStringOption(option =>
            option.setName('dicetype')
            .setDescription('Select type of dice')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.seldicetype}`,
                "en-US": `${locale.en_us.seldicetype}`,
                "de": `${locale.de.seldicetype}`,
                "pl": `${locale.pl.seldicetype}`,
                "fr": `${locale.fr.seldicetype}`,
                "ja": `${locale.ja.seldicetype}`,
                "pt-BR": `${locale.pt_BR.seldicetype}`,
                "ko": `${locale.ko.seldicetype}`,
                "bg": `${locale.bg.seldicetype}`,
                "sv-SE": `${locale.sv_SE.seldicetype}`,
                "uk": `${locale.uk.seldicetype}`,
            })
            .setRequired(false)
            .addChoices(
                { name: '🎲 D4 (1 ... 4)',
                  value: 'D4'
                },
                { name: '🎲 D6 (1 ... 6)',
                  value: 'D6'
                },
                { name: '🎲 D8 (1 ... 8)',
                  value: 'D8'
                },
                { name: '🎲 D10 (1 ... 10)',
                  value: 'D10'
                },
                { name: '🎲 D12 (1 ... 12)',
                  value: 'D12'
                },
                { name: '🎲 D20 (1 ... 20)',
                  value: 'D20'
                },
                { name: '🎲 D100 (1 ... 100)',
                  value: 'D100'
                }
            )
        )
        //decide if reply be ephemeral (publicreply: false / true)
        .addBooleanOption(option =>
            option.setName('publicreply')
            .setDescription('Make the result visible to everyone in the chat')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.publicreply}`,
                "en-US": `${locale.en_us.publicreply}`,
                "de": `${locale.de.publicreply}`,
                "pl": `${locale.pl.publicreply}`,
                "fr": `${locale.fr.publicreply}`,
                "ja": `${locale.ja.publicreply}`,
                "pt-BR": `${locale.pt_BR.publicreply}`,
                "ko": `${locale.ko.publicreply}`,
                "bg": `${locale.bg.publicreply}`,
                "sv-SE": `${locale.sv_SE.publicreply}`,
                "uk": `${locale.uk.publicreply}`,
            })
            .setRequired(false)
        )
        //end of publicreply
    )
    

module.exports = {
    ping,
    about,
    invite,
    timenow,
    timezonenow,
    timestampint,
    convertint,
    calcint,
    randomint
};