const User = require('../models/User');

// métodos que temos no controller para cada uma das rotas
// index, show, store, update, destroy

module.exports = {
    async store(req, res) {
        //const email = req.body.email;
        //buscando email de dentro de body
        const { email } = req.body;

        let user = await User.findOne({ email: email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};