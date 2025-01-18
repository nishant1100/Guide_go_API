const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "4fb876242331584a793776ad67394d0ee00290f140fd9ab047456d54fdff0bd1";
const Credential = require("../model/credential")

const register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const cred = new Credential({ username, password: hashedPassword, role });
    cred.save();
    res.status(201).send(cred);
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const cred = await Credential.findOne({ username });
    if (!cred || !(await bcrypt.compare(password, cred.password))) {
        return res.status(403).send('Invalid username or password');
    }

    const token = jwt.sign(
        { username: cred.username, role: cred.role },
        SECRET_KEY,
        { expiresIn: '1h' });
    res.json({ token });

};

module.exports = {
    login,
    register
}