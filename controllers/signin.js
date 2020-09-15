const handleSignin = (User, bcrypt) => (req, res) => {
    const { email, password } = req.body;

    User.find({ email: email })
        .exec()
        .then((user) => {
            bcrypt.compare(password, user[0].hash, function (err, result) {
                if (result) {
                    console.log(user[0]);
                    res.status(200).json({
                        name: user[0].name,
                        email: user[0].email,
                        entries: user[0].entries,
                    });
                } else {
                    res.status(400).json("Wrong combination");
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Wrong combination");
        });
};

module.exports = {
    handleSignin: handleSignin,
};
