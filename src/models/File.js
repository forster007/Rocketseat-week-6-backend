const mongoose = require('mongoose');

const File = new mongoose.Schema(
    {
        path: {
            required: true,
            type: String
        },
        title: {
            required: true,
            type: String
        }
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

File.virtual('url').get(function () {
    const url = process.env.URL || 'http://localhost:3333';

    return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', File);