import * as https from 'https';
import * as querystring from 'querystring';
import * as md5 from 'md5';
import { appId, appSecret } from './private';

export const translate = (word) => {
  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);
  const query: string = querystring.stringify({
    q: word,
    from: 'en',
    to: 'zh',
    appid: appId,
    salt: salt,
    sign: sign,
  });
  type BaiduResult = {
    from: string;
    to: string;
    trans_result: {
      src: string;
      dst: string;
    }[];
    error_code?: string;
    error_msg?: string;
  };

  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET',
  };

  const request = https.request(options, (response) => {
    let chunks = [];
    response.on('data', (chunk) => {
      chunks.push(chunk);
    });
    response.on('end', () => {
      const string = Buffer.concat(chunks).toString();
      const object: BaiduResult = JSON.parse(string);

      if (object.error_code) {
        console.log('ERROR:' + object.error_msg);
        process.exit(2);
      } else {
        console.log(object.trans_result[0].dst);
        process.exit(0);
      }
    });
  });

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
};
