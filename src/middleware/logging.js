const morgan = require("morgan");
const moment = require("moment");

// Tambahkan format custom untuk menyertakan timestamp menggunakan moment
morgan.token("timestamp", function () {
  return moment().format("YYYY-MM-DD HH:mm:ss");
});

// Format log: timestamp method url status response-time ms
const customFormat = "[:timestamp] :method :url :status";

// Ekspor middleware morgan yang sudah dikonfigurasi
module.exports = morgan(customFormat);
