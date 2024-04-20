import mysql2 from "mysql2";
interface url {
  host: string;
  database: string;
  user: string;
  password: string;
  connectionLimit: number
}
var config: url = {
  host: "localhost",
  database: "store",
  user: "root",
  password: "",
  connectionLimit: 1
};
var config1: url = {
  host: "localhost",
  database: "donvihanhchinh",
  user: "root",
  password: "",
  connectionLimit: 1
};
var con_mysql2 = mysql2.createPool(config);
export var vn_location_mysql2 = mysql2.createPool(config1)
// {
//   host: "store-huy91027-8633.aivencloud.com",
//   port: 18654,
//   user: "avnadmin",
//   
//   database:""
// }

con_mysql2.getConnection((err, conc) => {
  if (err) {
    console.log(err);
  } else {
    console.log("success connection");
  }
});


export default con_mysql2
