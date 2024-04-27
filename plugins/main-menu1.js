import {
    promises,
    readFileSync
   } from "fs"
   import {
    join
   } from "path"
   import {
    xpRange
   } from "../lib/levelling.js"
   import moment from "moment-timezone"
   import os from "os"

  
   let groupmenu = `
   ✦ ───『 *group* 』─── ⚝
  ◈ .getbio <@tag/reply>  Ⓛ
  ◈ .animequote
  ◈ .Setdesc <text>
  ◈ .setname <text>
  ◈ .add
  ◈ .delete
  ◈ .delwarn @user
  ◈ .demote (@tag)
  ◈ .infogp
  ◈ .hidetag
  ◈ .invite <917xxx>
  ◈ .kick @user
  ◈ .link
  ◈ .poll question|option|option
  ◈ .profile
  ◈ .promote
  ◈ .resetlink
  ◈ .setbye <text>
  ◈ .group *open/close*
  ◈ .setwelcome <text>
  ◈ .simulate <event> @user
  ◈ .staff
  ◈ .tagall
  ◈ .totag
  ◈ .warn @user
  ◈ .warns
  ◈ .main
  ╰──────────⳹`
  
  let ownermenu = `
  ✦ ───『 *owner* 』─── ⚝
  ◈ .addprem <@tag>
  ◈ .addowner @user
  ◈ .allow <@tag>
  ◈ .HEROKU
  ◈ .ban @user
  ◈ .banchat
  ◈ .tx
  ◈ .broadcastgroup <text>
  ◈ .bcgc <text>
  ◈ .cleartmp
  ◈ .delexpired
  ◈ .delprem @user
  ◈ .removeowner @user
  ◈ .setppbotfull
  ◈ .getplugin <name file>
  ◈ .getfile <name file>
  ◈ .join <chat.whatsapp.com> <dias>
  ◈ .reset <54xxx>
  ◈ .resetprefix
  ◈ .restart
  ◈ ..setprefix
  ◈ ..setprefix [symbol]
  ◈ .unban @user
  ◈ .unbanchat
  ◈ .update
  ◈ .config
  ◈ .listban
  ◈ .deleteplugin <name>
  ╰──────────⳹`
  
  let funmenu = `
  ✦ ───『 *fun* 』─── ⚝
  ◈ .afk <reason>
  ◈ .tomp3
  ◈ .toav
  ◈ .bot
  ◈ .character @tag
  ◈ .dare
  ◈ .flirt
  ◈ .gay @user
  ◈ .pickupline
  ◈ .question
  ◈ .shayari
  ◈ .ship
  ◈ .yomamajoke
  ◈ .truth
  ◈ .waste @user
  ◈ .image
  ◈ .meme
  ◈ .quote
  ╰──────────⳹`
  
  let reactmenu = `
  ✦ ───『 *reaction* 』─── ⚝
  ◈ .bully @tag
  ◈ .cuddle @tag
  ◈ .cry @tag
  ◈ .hug @tag
  ◈ .awoo @tag
  ◈ .kiss @tag
  ◈ .lick @tag
  ◈ .pat @tag
  ◈ .smug @tag
  ◈ .bonk @tag
  ◈ .yeet @tag
  ◈ .blush @tag
  ◈ .smile @tag
  ◈ .wave @tag
  ◈ .highfive @tag
  ◈ .handhold @tag
  ◈ .nom @tag
  ◈ .bite @tag
  ◈ .glomp @tag
  ◈ .slap @tag
  ◈ .kill @tag
  ◈ .happy @tag
  ◈ .wink @tag
  ◈ .poke @tag
  ◈ .dance @tag
  ◈ .cringe @tag
  ╰──────────⳹`
  
  let dlmenu = `
  ✦ ───『 *downloader* 』─── ⚝
  ◈ .facebook <url>
  ◈ .gdrive 🅟
  ◈ .gitclone <url>
  ◈ .igstalk
  ◈ .instagram
  ◈ .mediafire <url>
  ◈ .mega
  ◈ .modapk
  ◈ .play <query>
  ◈ .play2 <text>
  ◈ .playvid <text>
  ◈ .spotify
  ◈ .tiktok <url>
  ◈ .tiktokstalk
  ◈ .twitter <url>
  ◈ .ytmp3 <url>
  ◈ .ytsearch
  ◈ .ytmp4 <yt-link>
  ◈ .wallpaper <query>
  ╰──────────⳹`
  
  let gamemenu = `
  ✦ ───『 *game* 』─── ⚝
  ◈ .slot <amount>
  ◈ .chess [from to]
  ◈ .chess delete
  ◈ .chess join
  ◈ .chess start
  ◈ .delttt
  ◈ .guessflag
  ◈ .Maths <modes>
  ◈ .ppt <rock/paper/scissors>
  ◈ .tictactoe <tag number>
  ╰──────────⳹`
  let logomenu = `
  ✦ ───『 *maker* 』─── ⚝
  ◈ .blur
  ◈ .difuminar2
  ◈ .hornycard
  ◈ .hornylicense
  ◈ .gfx1
  ◈ .gfx2
  ◈ .gfx3
  ◈ .gfx4
  ◈ .gfx5
  ◈ .gfx6
  ◈ .gfx7
  ◈ .gfx8
  ◈ .gfx9
  ◈ .gfx10
  ◈ .gfx11
  ◈ .gfx12
  ◈ .simpcard
  ◈ .itssostupid
  ◈ .iss
  ◈ .stupid
  ◈ .tweet <comment>
  ◈ .lolicon
  ◈ .ytcomment <comment>
  ╰──────────⳹`
  
  let stickermenu = `
  ✦ ───『 *sticker* 』─── ⚝
  ◈ .emojimix <emoji+emoji>
  ◈ .getsticker
  ◈ .smaker
  ◈ .stickerwithmeme (caption|reply media)
  ◈ .swmeme <url>
  ◈ .swm(caption|reply media)
  ◈ .sfull
  ◈ .toimg <sticker>
  ◈ .tovid
  ◈ .trigger <@user>
  ◈ .ttp
  ◈ .ttp2
  ◈ .ttp3
  ◈ .ttp4
  ◈ .ttp5
  ◈ .attp
  ◈ .attp2
  ◈ .attp3
  ◈ .take <name>|<author>
  ╰──────────⳹`
  
  let audiomenu = `
  ✦ ───『 *audio* 』─── ⚝
  ◈ .bass [vn]
  ◈ .blown [vn]
  ◈ .deep [vn]
  ◈ .earrape [vn]
  ◈ .fast [vn]
  ◈ .fat [vn]
  ◈ .nightcore [vn]
  ◈ .reverse [vn]
  ◈ .robot [vn]
  ◈ .slow [vn]
  ◈ .smooth [vn]
  ◈ .tupai [vn]
  ╰──────────⳹`
  
  
  let newsmenu = `
  ✦ ───『 *news* 』─── ⚝
  ◈ .news
  ◈ .technews
  ◈ .ndtv
  ╰──────────⳹
  `
  let economy = `
  ✦ ───『 *economy* 』─── ⚝
  ◈ .addgold <@user>
  ◈ .addxp <@user>
  ◈ .bank
  ◈ .buych
  ◈ .cock-fight <amount>
  ◈ .buy
  ◈ .buyall
  ◈ .daily
  ◈ .deposit
  ◈ .gamble <amount> <color(red/black)>
  ◈ .give credit [amount] [@tag]
  ◈ .levelup
  ◈ .rank
  ◈ .rob
  ◈ .roulette <amount> <color(red/black)>
  ◈ .wallet
  ◈ .withdraw
  ◈ .work
  ╰──────────⳹`
  let animemenu = `
  ✦ ───『 *anime* 』─── ⚝
  ◈ .anime
  ◈ .akira
  ◈ .akiyama
  ◈ .anna
  ◈ .asuna
  ◈ .ayuzawa
  ◈ .boruto
  ◈ .chiho
  ◈ .chitoge
  ◈ .deidara
  ◈ .erza
  ◈ .elaina
  ◈ .eba
  ◈ .emilia
  ◈ .hestia
  ◈ .hinata
  ◈ .inori
  ◈ .isuzu
  ◈ .itachi
  ◈ .itori
  ◈ .kaga
  ◈ .kagura
  ◈ .kaori
  ◈ .keneki
  ◈ .kotori
  ◈ .kurumi
  ◈ .madara
  ◈ .mikasa
  ◈ .miku
  ◈ .minato
  ◈ .naruto
  ◈ .nezuko
  ◈ .sagiri
  ◈ .sasuke
  ◈ .sakura
  ◈ .manhwa
  ◈ .waifu
  ◈ .neko
  ◈ .zerotwo
  ◈ .loli
  ◈ .pokedex <pokemon>
  ◈ .trace
  ╰──────────⳹
  `
  let nsfwmenu = `
  ✦ ───『 *nsfw* 』─── ⚝
  ◈ .genshin
  ◈ .swimsuit
  ◈ .schoolswimsuit
  ◈ .white
  ◈ .barefoot
  ◈ .touhou
  ◈ .gamecg
  ◈ .hololive
  ◈ .uncensored
  ◈ .sunglasses
  ◈ .glasses
  ◈ .weapon
  ◈ .shirtlift
  ◈ .chain
  ◈ .fingering
  ◈ .flatchest
  ◈ .torncloth
  ◈ .bondage
  ◈ .demon
  ◈ .wet
  ◈ .pantypull
  ◈ .headdress
  ◈ .headphone
  ◈ .tie
  ◈ .anusview
  ◈ .shorts
  ◈ .stokings
  ◈ .topless
  ◈ .beach
let groupmenu = `
   ✦ ───『 *ɢʀᴏᴜᴘ* 』─── ⚝
  ◈ .ɢᴇᴛʙɪᴏ <@ᴛᴀɢ/ʀᴇᴘʟʏ>  Ⓛ
  ◈ .ᴀɴɪᴍᴇϙᴜᴏᴛᴇ
  ◈ .Sᴇᴛᴅᴇsᴄ <ᴛᴇxᴛ>
  ◈ .sᴇᴛɴᴀᴍᴇ <ᴛᴇxᴛ>
  ◈ .ᴀᴅᴅ
  ◈ .ᴅᴇʟᴇᴛᴇ
  ◈ .ᴅᴇʟᴡᴀʀɴ @ᴜsᴇʀ
  ◈ .ᴅᴇᴍᴏᴛᴇ (@ᴛᴀɢ)
  ◈ .ɪɴғᴏɢᴘ
  ◈ .ʜɪᴅᴇᴛᴀɢ
  ◈ .ɪɴᴠɪᴛᴇ <923xxx>
  ◈ .ᴋɪᴄᴋ @ᴜsᴇʀ
  ◈ .ʟɪɴᴋ
  ◈ .ᴘᴏʟʟ ϙᴜᴇsᴛɪᴏɴ|ᴏᴘᴛɪᴏɴ|ᴏᴘᴛɪᴏɴ
  ◈ .ᴘʀᴏғɪʟᴇ
  ◈ .ᴘʀᴏᴍᴏᴛᴇ
  ◈ .ʀᴇsᴇᴛʟɪɴᴋ
  ◈ .sᴇᴛʙʏᴇ <ᴛᴇxᴛ>
  ◈ .ɢʀᴏᴜᴘ *ᴏᴘᴇɴ/ᴄʟᴏsᴇ*
  ◈ .sᴇᴛᴡᴇʟᴄᴏᴍᴇ <ᴛᴇxᴛ>
  ◈ .sɪᴍᴜʟᴀᴛᴇ <ᴇᴠᴇɴᴛ> @ᴜsᴇʀ
  ◈ .sᴛᴀғғ
  ◈ .ᴛᴀɢᴀʟʟ
  ◈ .ᴛᴏᴛᴀɢ
  ◈ .ᴡᴀʀɴ @ᴜsᴇʀ
  ◈ .ᴡᴀʀɴs
  ◈ .ᴍᴀɪɴ
  ╰──────────⳹`
  
  let ownermenu = `
  ✦ ───『 *ᴏᴡɴᴇʀ* 』─── ⚝
  ◈ .ᴀᴅᴅᴘʀᴇᴍ <@ᴛᴀɢ>
  ◈ .ᴀᴅᴅᴏᴡɴᴇʀ @ᴜsᴇʀ
  ◈ .ᴀʟʟᴏᴡ <@ᴛᴀɢ>
  ◈ .HEROKU
  ◈ .ʙᴀɴ @ᴜsᴇʀ
  ◈ .ʙᴀɴᴄʜᴀᴛ
  ◈ .ᴛx
  ◈ .ʙʀᴏᴀᴅᴄᴀsᴛɢʀᴏᴜᴘ <ᴛᴇxᴛ>
  ◈ .ʙᴄɢᴄ <ᴛᴇxᴛ>
  ◈ .ᴄʟᴇᴀʀᴛᴍᴘ
  ◈ .ᴅᴇʟᴇxᴘɪʀᴇᴅ
  ◈ .ᴅᴇʟᴘʀᴇᴍ @ᴜsᴇʀ
  ◈ .ʀᴇᴍᴏᴠᴇᴏᴡɴᴇʀ @ᴜsᴇʀ
  ◈ .sᴇᴛᴘᴘʙᴏᴛғᴜʟʟ
  ◈ .ɢᴇᴛᴘʟᴜɢɪɴ <ɴᴀᴍᴇ ғɪʟᴇ>
  ◈ .ɢᴇᴛғɪʟᴇ <ɴᴀᴍᴇ ғɪʟᴇ>
  ◈ .ᴊᴏɪɴ <ᴄʜᴀᴛ.ᴡʜᴀᴛsᴀᴘᴘ.ᴄᴏᴍ> <ᴅɪᴀs>
  ◈ .ʀᴇsᴇᴛ <54xxx>
  ◈ .ʀᴇsᴇᴛᴘʀᴇғɪx
  ◈ .ʀᴇsᴛᴀʀᴛ
  ◈ ..sᴇᴛᴘʀᴇғɪx
  ◈ ..sᴇᴛᴘʀᴇғɪx [sʏᴍʙᴏʟ]
  ◈ .ᴜɴʙᴀɴ @ᴜsᴇʀ
  ◈ .ᴜɴʙᴀɴᴄʜᴀᴛ
  ◈ .ᴜᴘᴅᴀᴛᴇ
  ◈ .ᴄᴏɴғɪɢ
  ◈ .ʟɪsᴛʙᴀɴ
  ◈ .ᴅᴇʟᴇᴛᴇᴘʟᴜɢɪɴ <ɴᴀᴍᴇ>
  ◈ .ᴅɪғᴜᴍɪɴᴀʀ2
  ◈ .ʜᴏʀɴʏᴄᴀʀᴅ
  ◈ .ʜᴏʀɴʏʟɪᴄᴇɴsᴇ
  ◈ .ɢғx1
  ◈ .ɢғx2
  ◈ .ɢғx3
  ◈ .ɢғx4
  ◈ .ɢғx5
  ◈ .ɢғx6
  ◈ .ɢғx7
  ◈ .ɢғx8
  ◈ .ɢғx9
  ◈ .ɢғx10
  ◈ .ɢғx11
  ◈ .ɢғx12
  ◈ .sɪᴍᴘᴄᴀʀᴅ
  ◈ .ɪᴛssᴏsᴛᴜᴘɪᴅ
  ◈ .ɪss
  ◈ .sᴛᴜᴘɪᴅ
  ◈ .ᴛᴡᴇᴇᴛ <ᴄᴏᴍᴍᴇɴᴛ>
  ◈ .ʟᴏʟɪᴄᴏɴ
  ◈ .ʏᴛᴄᴏᴍᴍᴇɴᴛ <ᴄᴏᴍᴍᴇɴᴛ>
  ╰──────────⳹`
  
  let stickermenu = `
  🛡️ ───『 *sᴛɪᴄᴋᴇʀ* 』─── 🛡️
  ◈ .ᴇᴍᴏᴊɪᴍɪx <ᴇᴍᴏᴊɪ+ᴇᴍᴏᴊɪ>
  ◈ .ɢᴇᴛsᴛɪᴄᴋᴇʀ
  ◈ .sᴍᴀᴋᴇʀ
  ◈ .sᴛɪᴄᴋᴇʀᴡɪᴛʜᴍᴇᴍᴇ (ᴄᴀᴘᴛɪᴏɴ|ʀᴇᴘʟʏ ᴍᴇᴅɪᴀ)
  ◈ .sᴡᴍᴇᴍᴇ <ᴜʀʟ>
  ◈ .sᴡᴍ(ᴄᴀᴘᴛɪᴏɴ|ʀᴇᴘʟʏ ᴍᴇᴅɪᴀ)
  ◈ .sғᴜʟʟ
  ◈ .ᴛᴏɪᴍɢ <sᴛɪᴄᴋᴇʀ>
  ◈ .ᴛᴏᴠɪᴅ
  ◈ .ᴛʀɪɢɢᴇʀ <@ᴜsᴇʀ>
  ◈ .ᴛᴛᴘ
  ◈ .ᴛᴛᴘ2
  ◈ .ᴛᴛᴘ3
  ◈ .ᴛᴛᴘ4
  ◈ .ᴛᴛᴘ5
  ◈ .ᴀᴛᴛᴘ
  ◈ .ᴀᴛᴛᴘ2
  ◈ .ᴀᴛᴛᴘ3
  ◈ .ᴛᴀᴋᴇ <ɴᴀᴍᴇ>|<ᴀᴜᴛʜᴏʀ>
  ╰──────────⳹`
  
  let audiomenu = `
  🛡️ ───『 *ᴀᴜᴅɪᴏ* 』─── 🛡️
  ◈ .ʙᴀss [ᴠɴ]
  ◈ .ʙʟᴏᴡɴ [ᴠɴ]
  ◈ .ᴅᴇᴇᴘ [ᴠɴ]
  ◈ .ᴇᴀʀʀᴀᴘᴇ [ᴠɴ]
  ◈ .ғᴀsᴛ [ᴠɴ]
  ◈ .ғᴀᴛ [ᴠɴ]
  ◈ .ɴɪɢʜᴛᴄᴏʀᴇ [ᴠɴ]
  ◈ .ʀᴇᴠᴇʀsᴇ [ᴠɴ]
  ◈ .ʀᴏʙᴏᴛ [ᴠɴ]
  ◈ .sʟᴏᴡ [ᴠɴ]
  ◈ .sᴍᴏᴏᴛʜ [ᴠɴ]
  ◈ .ᴛᴜᴘᴀɪ [ᴠɴ]
  ╰──────────⳹`
  
  
  let newsmenu = `
  ✦ ───『 *ɴᴇᴡs* 』─── ⚝
  ◈ .ɴᴇᴡs
  ◈ .ᴛᴇᴄʜɴᴇᴡs
  ◈ .ɴᴅᴛᴠ
  ╰──────────⳹
  `
  
  let toolsmenu = `
  🛡️ ───『 *ᴛᴏᴏʟs* 』─── 🛡️
  🛡️ .ɴᴏᴡᴀ
  🛡️ .ϙʀ <ᴛᴇxᴛ>
  🛡️ .ϙʀᴄᴏᴅᴇ <ᴛᴇxᴛ>
  🛡️ .sᴛʏʟᴇ <ᴋᴇʏ> <ᴛᴇxᴛ>
  🛡️ .ᴡᴇᴀᴛʜᴇʀ *<ᴘʟᴀᴄᴇ>*
  🛡️ .ᴅᴇʜᴀᴢᴇ
  🛡️ .ʀᴇᴄᴏʟᴏʀ
  🛡️ .ʜᴅʀ
  🛡️ .ʟᴇɴɢᴛʜ <ᴀᴍᴏᴜɴᴛ>
  🛡️ .ᴛɪɴʏᴜʀʟ <ʟɪɴᴋ>
  🛡️ .sʜᴏʀᴛᴇɴ <ʟɪɴᴋ>
  🛡️ .ᴛᴇᴍᴘᴍᴀɪʟ
  🛡️ .sʜᴀᴢᴀᴍ
  🛡️ .ᴄᴀʟ <ᴇϙᴜᴀᴛɪᴏɴ>
  🛡️ .ᴄᴀʀʙᴏɴ <ᴄᴏᴅᴇ>
  🛡️ .ᴅᴇғɪɴᴇ <ᴡᴏʀᴅ>
  🛡️ .ᴇʟᴇᴍᴇɴᴛ
  🛡️ .ɢᴏᴏɢʟᴇ
  🛡️ .ɪᴛᴜɴᴇs
  🛡️ .ʟʏʀɪᴄs
  🛡️ .ɪᴍᴅʙ
  🛡️ .ᴄᴏᴜʀsᴇ
  🛡️ .ʀᴀɴᴅᴏᴍᴄᴏᴜʀsᴇ
  🛡️ .ʀᴇᴀᴅᴍᴏʀᴇ <ᴛᴇxᴛ1>|<ᴛᴇxᴛ2>
  🛡️ .ʀᴇᴀᴅᴠᴏ
  🛡️ .ʀᴇᴍᴏᴠᴇʙɢ
  🛡️ .ss <ᴜʀʟ>
  🛡️ .ssғ <ᴜʀʟ>
  🛡️ .sᴜʙʀᴇᴅᴅɪᴛ
  🛡️ .ᴛᴇʟᴇsᴛɪᴄᴋᴇʀ  Ⓛ
  🛡️ .ᴛᴏᴜʀʟ
  🛡️ .ᴛʀᴀɴsʟᴀᴛᴇ <ʟᴀɴɢ> <ᴛᴇxᴛ>
  🛡️ .ᴛʀᴜᴇ
  🛡️ .ᴛᴛs <ʟᴀɴɢ> <ᴛᴀsᴋ>
  🛡️ .ᴡᴀ
  🛡️ .ᴡɪᴋɪᴘᴇᴅɪᴀ
  ╰━━━━━━━━━━━━━━━━━━━━╯`
  
  let Aimenu = `
  🛡️ ───『 *AI* 』─── 🛡️
  🛡️.ʙɪɴɢ
  🛡️.ᴅᴀʟʟᴇ
  🛡️.ɢᴘᴛ
  🛡️.ᴛᴏᴀɴɪᴍᴇ
  🛡️.ᴛᴏᴄᴀʀᴛᴏᴏɴ
  🛡️.ᴀɪ
  🛡️.ʙᴀʀᴅ
  🛡️.ᴀʟᴇxᴀ
  🛡️.ɢᴘᴛ2
  ╰━━━━━━━━━━━━━━━━╯
  `
  let religionmenu = `
  ✦ ───『 *ʀᴇʟɪɢɪᴏɴ* 』─── ⚝
  ◈ .ϙᴜʀᴀɴᴍᴇɴᴜ ғᴏʀ ɢᴇᴛᴛɪɴɢ ɴᴜᴍʙᴇʀ
  ◈ .ϙᴜʀᴀɴ [sᴜʀᴀʜ_ɴᴜᴍʙᴇʀ|sᴜʀᴀʜ_ɴᴀᴍᴇ]
  ╰──────────⳹`

  let studymenu = `╭━━⊱•🛡️ *sᴛᴜᴅʏᴍᴇɴᴜ* 🛡️•⊱━━╮
│✫ .ϙᴜʀᴀɴᴍᴇɴᴜ
│✫ .sᴜʀᴀʜ 36  
│✫ .ɢᴘᴛ
│✫ .ɢᴘᴛ2    
│✫ .ʙɪɴɢ  
│✫ .ʙᴀʀᴅ 
│✫ .ϙᴜᴏᴛᴇ  
│✫ .ᴀɪsᴇᴀʀᴄʜ 
│✫ .ᴅᴇғɪɴᴇ
│✫ .ᴇʟᴇᴍᴇɴᴛ
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  
  let botmenu = `
  🛡️ ───『 *Bᴏᴛ Mᴇɴᴜ* 』─── 🛡️
  🛡️ .ᴘɪɴɢ
  🛡️ .ʀᴜɴᴛɪᴍᴇ
  🛡️ .sᴄʀɪᴘᴛ
  🛡️ .sᴇʀᴠᴇʀ
  🛡️ .ʙʟᴏᴄᴋʟɪsᴛ
  🛡️ .ᴀʟɪᴠᴇ
  🛡️ .ɪɴғᴏ
  🛡️ .ᴏᴡɴᴇʀ
  🛡️ .ᴛᴏᴛᴀʟғᴇᴀᴛᴜʀᴇ
  🛡️ .ʟɪsᴛ
  🛡️ .ᴄʀɪsᴛɪᴀɴᴏʀᴏɴᴀʟᴅᴏ
  🛡️ .ᴄʀ7
  🛡️ .ᴘᴘᴄᴏᴜᴘʟᴇ 
  🛡️ .ᴘᴘᴄᴘ
  🛡️ .ᴘɪɴᴛᴇʀᴇsᴛ
  🛡️ .ᴍʏsɴ
  ╰━━━━━━━━━━━━━━━━━━━╯
  `
  let pluginmenu = `
  ✦ ───『 *ᴘʟᴜɢɪɴ* 』─── ⚝
  ◈ .ᴘʟᴜɢɪɴs
  ◈ .ɪɴsᴛᴀʟʟ <Gɪsᴛ URL>
  ╰──────────⳹
  `

  const handler = async (m, {
    conn,
    command,
    text,
    args,
    usedPrefix
  }) => {
    
  
   let glb = global.db.data.users
   let usrs = glb[m.sender]
   let tag = `@${m.sender.split("@")[0]}`
   let mode = global.opts["self"] ? "Private" : "Public"
   
   let {
  age,
  exp,
  limit,
  level,
  role,
  registered,
  credit
   } = glb[m.sender]
   let {
  min,
  xp,
  max
   } = xpRange(level, global.multiplier)
   let name = await conn.getName(m.sender)
   let premium = glb[m.sender].premiumTime
   let prems = `${premium > 0 ? "Premium": "Free"}`
   let platform = os.platform()
  
  
   let ucpn = `${ucapan()}`
  
   let _uptime = process.uptime() * 1000
   let _muptime
   if (process.send) {
  process.send("uptime")
  _muptime = await new Promise(resolve => {
  process.once("message", resolve)
  setTimeout(resolve, 1000)
  }) * 1000
   }
   let muptime = clockString(_muptime)
   let uptime = clockString(_uptime)
  
   
   let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
   let totalreg = Object.keys(glb).length
  
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    
   
    global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    const infoText = `
     ╭━༻𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹༺⊰━─
    
     *${ucpn}* 

     ╭━༻𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹༺⊰━─


╭━⊱「Wᴇʟᴄᴏᴍᴇ ᴛᴏ ᴄᴍᴅ ᴍᴇɴᴜ⊱━╮
│
│🕋✫ - 「1${usedPrefix}𝘘𝘶𝘳𝘢𝘯𝘮𝘦𝘯𝘶
│📚✫ - 「2${usedPrefix}𝘚𝘵𝘶𝘥𝘺𝘮𝘦𝘯𝘶
│🛡️✫ - 「3${usedPrefix}𝘖𝘸𝘯𝘦𝘳𝘮𝘦𝘯𝘶
│💌✫ - 「4${usedPrefix}𝘉𝘰𝘵𝘮𝘦𝘯𝘶 
│🧬✫ - 「5${usedPrefix}𝘎𝘳𝘰𝘶𝘱𝘮𝘦𝘯𝘶
│📥✫ - 「6${usedPrefix}𝘋𝘭𝘮𝘦𝘯𝘶
│🧰✫ - 「7${usedPrefix}𝘛𝘰𝘰𝘭𝘮𝘦𝘯𝘶
│🎨✫ - 「8${usedPrefix}𝘚𝘵𝘪𝘤𝘬𝘦𝘳𝘮𝘦𝘯𝘶
│🎉✫ - 「9${usedPrefix}𝘍𝘶𝘯𝘮𝘦𝘯𝘶 
│🎮✫ - 「10${usedPrefix}𝘎𝘢𝘮𝘦𝘮𝘦𝘯𝘶
│🎩✫ - 「11${usedPrefix}𝘓𝘰𝘨𝘰𝘮𝘦𝘯𝘶
│        *${greeting}*
╰━━━━━━━━━━━━━━━━━━━━━━╯
    *⏜✩ 𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹 𓃮•:)*                  

*🌸🤭- " 𝐀 𝐅ɑkə 𝐒mıɭə 𝐂ɑη ┣𝐥ıdə  𝐌ıɭɭıoηs 𝐎f 𝐓əɑrs ||%❤😚*
 ` 
;

  
  const { result, key, timeout } = await conn.sendMessage(m.chat, { video: { url: menuvid }, caption: infoText.trim(),  gifPlayback: true,
  gifAttribution: 0}, { quoted: fcontact })
  
  // Save the menu options to gurumenu
  conn.gurumenu[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
          delete: key
      });
      delete conn.gurumenu[m.sender];
  }, 150 * 1000),
  };
  };
  
 
  handler.before = async (m, { conn }) => {
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    if (m.isBaileys || !(m.sender in conn.gurumenu)) return;
    const { result, key, timeout } = conn.gurumenu[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    
    if (choice === "1") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: quranmenu
      }, { quoted:fcontact });
      } else if (choice === "2") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: studymenu
      }, { quoted:fcontact });
      } else if (choice === "3") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: ownermenu
      }, { quoted:fcontact });
      } else if (choice === "4") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: botmenu 
      }, { quoted:fcontact });
      } else if (choice === "5") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: groupmenu
      }, { quoted:fcontact });
      } else if (choice === "6") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: dlmenu
      }, { quoted:fcontact });
      } else if (choice === "7") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: toolmenu
      }, { quoted:fcontact });
      } else if (choice === "8") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: stickermenu
      }, { quoted:fcontact });
      } else if (choice === "9") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: funmenu
      }, { quoted:fcontact });
      } else if (choice === "10") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: gamemenu
      }, { quoted:fcontact });
      } else if (choice === "11") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: logomenu
      }, { quoted:fcontact });
      
      }
  
  };
  
  
  handler.help = ["play"];
  handler.tags = ["downloader"];
  handler.command = /^(menu)$/i;
  handler.limit = true;
  export default handler;
  
  
  
  
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
   }
   
   const more = String.fromCharCode(8206)
   const readMore = more.repeat(4001)
   
   function clockString(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function clockStringP(ms) {
    let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function ucapan() {
    const time = moment.tz("Asia/Kolkata").format("HH")
    let res = "Good morning ☀️"
    if (time >= 4) {
     res = "Good Morning 🌄"
    }
    if (time >= 10) {
     res = "Good Afternoon ☀️"
    }
    if (time >= 15) {
     res = "Good Afternoon 🌇"
    }
    if (time >= 18) {
     res = "Good Night 🌙"
    }
    return res
   }
  
