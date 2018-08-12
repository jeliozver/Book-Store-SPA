module.exports = {
    error: (req, res) => {
        return res.status(404).json({
            message: 'Page Not Found!'
        });
    }
};