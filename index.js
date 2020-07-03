const Discord = require('discord.js');
const randomWords = require('random-words')
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Function that generates the racing text
function textGenerator(){ 
    let random = randomWords(40);
    let phrase = ''
    for(let i in random){
        phrase = phrase.concat(random[i]+' ');
    }
    console.log(phrase);
    return phrase;
}
//Function that calculates time.
function timer(startTime,endTime){
    var timeDiff = endTime - startTime;
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    console.log(seconds + " seconds");
    return seconds;
}
// Message when the bot is ready in the server. 
client.once('ready',()=>{ 
    console.log('Ready to race!');
})
//Trigger event. 
client.on('message',message =>{
    //Checking the bot doesn't respond to its own messages. 
    if(message.author.bot)return;
    //List of bot response messages }  
    let responses = {
        start : new Discord.MessageEmbed()
            .setTitle('GO!')
            .setDescription('')
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setColor('#3de751'),
        finish : new Discord.MessageEmbed()
            .setTitle('You win')
            .setDescription('Congratulations '+ message.author.username + ' you are the fastest typer in the channel!')
            .setAuthor(message.author.tag, message.author.bot.username)
            .setImage('https://img.favpng.com/9/20/21/gold-medal-clip-art-png-favpng-JCf9xj0TPxPxxZfGFrg36rrgZ.jpg')
            .setColor('#f0f223')
    }
    //Collecting the messages from the channel.
    if(message.content.toLocaleLowerCase()=== '>race'){
        let startTime = new Date();
        responses.start.description = textGenerator();
        message.channel.send(responses.start);
        let filter = m => !m.author.bot;
       
        //Initializing collector. 
        let collector = new Discord.MessageCollector(message.channel, filter);
        collector.on('collect',(message,col)=>{
            console.log(`Collected ${message.content}`);
            if(responses.start.description.localeCompare(message.content)){
                let endTime = new Date();
                let finalTime = timer(startTime, endTime)
                responses.finish.description = responses.finish.description.concat(". Your time: " + finalTime + " secs")
                message.channel.send(responses.finish);
                collector.stop('Stopped by client!');
            }
            else{
            message.channel.send('Nope ' + message.author.username + ' keep trying');
            }
        });
        collector.on('end',collected =>{
            console.log(`Collected ${collected.size} items`);
        })       
    }
})
client.login('NzI3MjA2NzUyMzk0Njc0MjM3.Xv4LWw.5iUw_VrStSXXXU_Ag4pFXuN0RNQ'); //Token application