import {Gist} from 'gist-helper'

export const db = new Gist(process.env['GIST_TOKEN'], {
  filename: 'data.json',
  gistID: '1759dcfc56c42ed9cf214e46e4230de1'
})

