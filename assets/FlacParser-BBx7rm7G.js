import{F as p,c as E,d as g,m as C,r as n,g as o,l as I,a as l}from"./index-DceeY_rS.js";import{V as A,a as S,b as P}from"./VorbisParser-DCdcBevb.js";import{A as u}from"./AbstractID3Parser-BnANnY7I.js";import"./ID3v2Parser-CR-apThZ.js";const F=E("music-metadata:parser:FLAC");class d extends C("FLAC"){}var s;(function(e){e[e.STREAMINFO=0]="STREAMINFO",e[e.PADDING=1]="PADDING",e[e.APPLICATION=2]="APPLICATION",e[e.SEEKTABLE=3]="SEEKTABLE",e[e.VORBIS_COMMENT=4]="VORBIS_COMMENT",e[e.CUESHEET=5]="CUESHEET",e[e.PICTURE=6]="PICTURE"})(s||(s={}));class U extends u{constructor(){super(...arguments),this.vorbisParser=new A(this.metadata,this.options),this.padding=0}async postId3v2Parse(){if((await this.tokenizer.readToken(p)).toString()!=="fLaC")throw new d("Invalid FLAC preamble");let a;do a=await this.tokenizer.readToken(w),await this.parseDataBlock(a);while(!a.lastBlock);if(this.tokenizer.fileInfo.size&&this.metadata.format.duration){const i=this.tokenizer.fileInfo.size-this.tokenizer.position;this.metadata.setFormat("bitrate",8*i/this.metadata.format.duration)}}async parseDataBlock(t){switch(F(`blockHeader type=${t.type}, length=${t.length}`),t.type){case s.STREAMINFO:return this.parseBlockStreamInfo(t.length);case s.PADDING:this.padding+=t.length;break;case s.APPLICATION:break;case s.SEEKTABLE:break;case s.VORBIS_COMMENT:return this.parseComment(t.length);case s.CUESHEET:break;case s.PICTURE:await this.parsePicture(t.length);return;default:this.metadata.addWarning(`Unknown block type: ${t.type}`)}return this.tokenizer.ignore(t.length).then()}async parseBlockStreamInfo(t){if(t!==c.len)throw new d("Unexpected block-stream-info length");const a=await this.tokenizer.readToken(c);this.metadata.setFormat("container","FLAC"),this.metadata.setFormat("codec","FLAC"),this.metadata.setFormat("lossless",!0),this.metadata.setFormat("numberOfChannels",a.channels),this.metadata.setFormat("bitsPerSample",a.bitsPerSample),this.metadata.setFormat("sampleRate",a.sampleRate),a.totalSamples>0&&this.metadata.setFormat("duration",a.totalSamples/a.sampleRate)}async parseComment(t){const a=await this.tokenizer.readToken(new g(t)),i=new S(a,0);i.readStringUtf8();const m=i.readInt32(),h=new Array(m);for(let r=0;r<m;r++)h[r]=i.parseUserComment();await Promise.all(h.map(r=>this.vorbisParser.addTag(r.key,r.value)))}async parsePicture(t){if(this.options.skipCovers)return this.tokenizer.ignore(t);const a=await this.tokenizer.readToken(new P(t));this.vorbisParser.addTag("METADATA_BLOCK_PICTURE",a)}}const w={len:4,get:(e,t)=>({lastBlock:I(e,t,7),type:o(e,t,1,7),length:n.get(e,t+1)})},c={len:34,get:(e,t)=>({minimumBlockSize:l.get(e,t),maximumBlockSize:l.get(e,t+2)/1e3,minimumFrameSize:n.get(e,t+4),maximumFrameSize:n.get(e,t+7),sampleRate:n.get(e,t+10)>>4,channels:o(e,t+12,4,3)+1,bitsPerSample:o(e,t+12,7,5)+1,totalSamples:o(e,t+13,4,36),fileMD5:new g(16).get(e,t+18)})};export{U as FlacParser};
