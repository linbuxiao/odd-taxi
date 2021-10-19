import Gists from 'gists'

class DB {
  gists: Gists
  id: string
  fileName: string
  constructor({token, gistId, gistFile}: Record<'token'|'gistId'|'gistFile', string>) {
    console.log('init gists db')
    this.gists = new Gists({ token })
    this.id = gistId
    this.fileName = gistFile
  }

  async read() {
    console.log('fetch data from gist: ', this.id)
    const res = await this.gists.get(this.id)
    return JSON.parse(res.body.files[this.fileName].content)
  }

  async write(data: any) {
    const update = { files: 
      { 
        [this.fileName]: {
          content: JSON.stringify(data, null, 2)
        } 
      } 
    }
    console.log('updated: ', update)
    return this.gists.edit(this.id, update)
  }
}

const db = new DB({
  token: process.env.GIST_TOKEN!,
  gistFile: 'data.json',
  gistId: '1759dcfc56c42ed9cf214e46e4230de1'
})

export const words = await db.read() as string[]

