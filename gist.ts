import Gist from 'https://raw.githubusercontent.com/linbuxiao/low_gist/main/mod.ts'
import { config as env } from "https://deno.land/x/dotenv/mod.ts";

const ENV = env()

export async function fetchGist() {
  const gist = new Gist(ENV['GIST_TOKEN'])
  const gistResponse = await (await gist.get('1759dcfc56c42ed9cf214e46e4230de1')).json()
  return gistResponse.files['data.json'].content
}