import Gist from 'https://raw.githubusercontent.com/linbuxiao/low_gist/main/mod.ts'


export async function fetchGist() {
  const gist = new Gist(Deno.env.get('GIST_TOKEN')!)
  const gistResponse = await gist.get('1759dcfc56c42ed9cf214e46e4230de1')
  return gistResponse.files!['data.json'].content
}