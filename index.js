import express from 'express'
import { Form } from 'multiparty'
import { readExcel } from './read-excel.js'
import { writeExcel } from './write-excel.js'

const app = express()

app.get('/', (req, res) => {
  const xlsx = writeExcel()

  res.setHeader('type', 'application/x-binary')

  res.attachment('something.xlsx')
  res.status(200).send(xlsx)
})

app.post('/', (req, res) => {
  const form = new Form();

  console.log('req.headers :>> ', req.headers);

  form.parse(req, (err, fields, files) => {
      try {

      console.log('Object.entries(files).reduce((acc, [key, value]) => ({ ...acc, [key]: value[0] }), {}) :>> ', Object.entries(files).reduce((acc, [key, value]) => ({ ...acc, [key]: value[0] }), {}));
      
      const data = readExcel(files.file[0].path)
  
      console.log('data :>> ', data);
      } catch (error) {
        console.log('error :>> ', error);
      }
    })
})

app.listen(3000, () => console.log('Listening on port 3000'))
