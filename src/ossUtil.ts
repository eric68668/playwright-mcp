/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// @ts-ignore: ali-oss doesn't have TypeScript declarations
import OSS from 'ali-oss';
import path from 'path';

const client = new OSS({
  endpoint: process.env.OSS_ENDPOINT,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET,
});

const headers = {
  'x-oss-storage-class': 'Standard',
  'x-oss-object-acl': 'public-read',
  'x-oss-forbid-overwrite': 'true',
};

export async function putObject(localPath: string, ossMidPath: string = '') {
  try {
    const fileName = path.basename(localPath);
    const result = await client.put(ossMidPath + '/' + fileName, path.normalize(localPath), { headers });
    return result.url;
  } catch (e) {
    console.error(e);
  }
}
