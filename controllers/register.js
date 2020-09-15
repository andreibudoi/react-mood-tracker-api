const handleRegister = (User, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
    const saltRounds = 10;

    if (!email || !name || !password) {
        return res.status(400).json("incorrect form submission");
    }
    bcrypt.hash(password, saltRounds, function (err, hash) {
        const user = new User({
            name,
            email,
            hash,
            entries: [],
        });

        user.save()
            .then((createdUser) => {
                console.log(createdUser);
                res.status(200).json({
                    name: createdUser.name,
                    email: createdUser.email,
                    entries: createdUser.entries,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    });
};

module.exports = {
    handleRegister: handleRegister,
};
