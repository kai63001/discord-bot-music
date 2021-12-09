import ytdl from "ytdl-core";

const youtube = async (msg: any) => {
  let link = msg.content.replace("!play ", "").trim();
  let info = await ytdl.getInfo(link);
  let format = ytdl.filterFormats(info.formats, "audioonly");
  return format;
};

export { youtube };
