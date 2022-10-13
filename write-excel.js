import { faker } from "@faker-js/faker";
import { utils, write, writeFile } from "xlsx";

export const writeExcel = () => {
  const data = new Array(5).fill(JSON.parse(faker.datatype.json()))

  console.log('data :>> ', data);

  const worksheet = utils.json_to_sheet(data)

  const wb = utils.book_new()

  utils.book_append_sheet(wb, worksheet)

  const xlsx = write(wb, { bookType: 'xlsx', type: 'buffer' })

  return xlsx

  console.log('xlsx :>> ', xlsx);
}