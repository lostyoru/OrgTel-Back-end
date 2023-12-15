const Category = require('../models/Category');

async function getAllCategories(req, res) {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function addCategory(req, res) {
    try {
        const category = new Category({
            name: req.body.name
        });
        await category.save();
        return res.status(201).json(category);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function deleteCategory(req, res) {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    deleteCategory
}