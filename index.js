var modbus = require("modbus-stream");
const dns = require("dns");

const ENV_VARS = require("./config/env.vars.js");
require("./config/mongoose");

console.log({ENV_VARS})

const RecordModel = require("./models/record.modle");

const E = 983042;

var ipAdress 
dns.lookup(ENV_VARS.DATA_HOST_03, (err, address, family) => {
  if (err) throw err;

  console.log("address: %j", address);
  ipAdress = address;

  if (address)
    setInterval(intervalFunc, 6000);
});

function intervalFunc() {
  modbus.tcp.connect(
    502,
    ipAdress,
    { debug: "mbiz03" },
    (err, connection) => {
      if (err) throw err

      connection.readInputRegisters(
        { address: 0, quantity: 8, extra: { unitId: 3 } },
        (err, info) => {
          if (err) throw err

          const record = { date: Date.now() };

          const bufvolt = Buffer.from(info.response.data[0]);
          record['voltage'] = bufvolt.readInt16BE() / 10; // v
          const bufC = Buffer.from(info.response.data[1]);
          record['current'] = bufC.readUInt16BE() / 1000 // a;

          const bufP = Buffer.from(info.response.data[3]);
          record['power'] = bufP.readUInt16BE() / 10 // "W"

          const buf2 = Buffer.from(info.response.data[5]);
          var E1 = buf2.readUInt16BE();
          var DEnergy = E;
          DEnergy += E1;

          record['energy'] = DEnergy //  + "Wh");

          const bufF = Buffer.from(info.response.data[6]);
          record['frequency'] = bufF.readInt16BE() / 10;  //  "Hz"

          const bufPF = Buffer.from(info.response.data[7]);
          record['powerFactor'] = bufPF.readInt16BE() / 100 // );

          RecordModel.create(record, (err, result) => {
            if (err) console.log(err)
            console.log("Record inserted: ", result)
          })

        }
      );
    }
  );
}
