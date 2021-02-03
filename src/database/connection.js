const mongoose = require("mongoose");
module.exports = mongoose.connect(`mongodb+srv://matth33w:wGx0vPccdTNVnRMw@matth33w-cluster.1cvhu.mongodb.net/toolbox-do-desenvolvedor?retryWrites=true&w=majority`,
                {useNewUrlParser: true, useUnifiedTopology: true}
);
