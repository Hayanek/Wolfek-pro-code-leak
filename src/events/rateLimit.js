const chalk = require("chalk")
module.exports = {
    name: "rateLimit",
    async run(rateLimitData) {
       //console.log(chalk.redBright(`❌ Whodzimy w rate-limity!\nCooldown: ${rateLimitData.timeout}\nMetoda: ${rateLimitData.method}\nLimit metody: ${rateLimitData.limit}\nGlobal: ${rateLimitData.global}\n`))
    }
}