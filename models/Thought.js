const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now() },
    username: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: 'reaction',
        },
      ],
  },
  {
    toJSON: {
        virtuals: true
      },
    //   id: false, ???
  });

  const reactionCount  = thoughtSchema.virtual('reactionCount')

  reactionCount .get(function () {
    return this.reactions.length
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;