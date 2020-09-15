const handleNew = (User) => (req, res) => {
    const { email, entry } = req.body;

    User.find({ email: email })
        .exec()
        .then((user) => {
            if (entry.mood) {
                user[0].entries.push(entry);
                user[0]
                    .save()
                    .then((updatedUser) => {
                        console.log(updatedUser);
                        res.status(200).json(entry);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json("Error pushing new entry");
                    });
            } else {
                res.status(400).json("Bad entry");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error getting user");
        });
};

module.exports = {
    handleNew: handleNew,
};
