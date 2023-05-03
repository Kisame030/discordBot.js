const fs = require('fs');

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync('./src/events');
        for (const folder of eventFolders) {
            if (folder !== '.DS_Store') {
                    const eventFiles = fs
                        .readdirSync(`./src/events/${folder}`)
                        .filter((file) => file.endsWith(".js"));
                    switch(folder) {
                        case "client":
                            for (const file of eventFiles) {
                                const event =require(`../../events/${folder}/${file}`);
                                if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                                else client.on(event.name, (...args) => event.execute(...args, client));
                            }
                            break;
                        default:
                            break;
                }
            }
        }
    }
}