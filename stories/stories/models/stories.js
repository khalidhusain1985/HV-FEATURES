const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const storySchema = new Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref :'User'
    },

    media_url: {
        type: String,
        required: true,
    },
    media_type: {
        type: String,
        enum: ['image', 'video'],
        required: true,
    },
    posted_at: {
        type: Date,
        default: Date.now,
    },
    expires_at: {
        type: Date,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    }

});

const Story = mongoose.model('Story', storySchema);
module.export = Story;