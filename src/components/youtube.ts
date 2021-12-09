import ytdl from "ytdl-core";

const youtube = async (msg: any) => {
  const link = msg.content
    .replace("!play https://www.youtube.com/watch?v=", "")
    .trim();
  let info = await ytdl.getInfo(link);
  let format = ytdl.filterFormats(info.formats, "audioonly");
  return format;
};

export { youtube };
