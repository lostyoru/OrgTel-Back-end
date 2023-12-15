const User = require('../models/User');

async function addRoles(req, res) {
    const { id } = req.params;
    const { roles } = req.body;
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    user.roles = {
        ...user.roles,
        ...roles
    }
    await user.save();
    return res.status(200).json({ message: 'Roles added successfully' , user});
}

async function removeRoles(req, res) {
    const { id } = req.params;
    const { roles } = req.body;
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    for (const role of Object.keys(roles)) {
        user.roles[role] = undefined;
    }
    await user.save();
    return res.status(200).json({ message: 'Roles removed successfully' , user});
}

async function addAdmin(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    user.roles = {
        ...user.roles,
        "Admin": 2002
    }
    await user.save();
    return res.status(200).json({ message: 'Admin added successfully' , user});
}

async function removeAdmin(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    if(req.user != user.username){
        user.roles = {
            ...user.roles,
            "Admin": undefined
        }
    }
    await user.save();
    return res.status(200).json({ message: 'Admin removed successfully' , user});
}

module.exports = {
    addRoles,
    removeRoles,
    addAdmin,
    removeAdmin
};