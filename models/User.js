const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, unique: true, required: true, trim: true },
        email: { type: String, unique: true, required: true, lowercase: true },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        friends: [ this ],
    },
    {
        toJSON: {
        virtuals: true
        },
    //   id: false, ???
});

const friendCount = userSchema.virtual('friendCount')

friendCount.get(function () {
return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;