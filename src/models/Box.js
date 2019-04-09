const mongoose = require('mongoose');

const Box = new mongoose.Schema(
    {
        files: [{
            ref: 'File',
            type: mongoose.Schema.Types.ObjectId
        }],
        title: {
            required: true,
            type: String
        }
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('Box', Box);