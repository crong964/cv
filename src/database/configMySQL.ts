import mysql2 from "mysql2";
interface url {
  host: string;
  database: string;
  user: string;
  password: string;
}
var config: url = {
  host: "localhost",
  database: "store",
  user: "root",
  password: "",
};
export var con_mysql2 = mysql2.createPool(config);


con_mysql2.getConnection((err, conc) => {
  if (err) {
    console.log(err);
  }
  console.log("success connection");

});
export default config;
