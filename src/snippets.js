var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/')

mongoose.connection.on('error', err => {
  console.error('Could not connect. Error: ', err)
})

mongoose.connection.once('open', function () {
  var snippetSchema = mongoose.Schema({
    name: {type: String, unique: true},
    content: String
  })

  var Snippet = mongoose.model('Snippet', snippetSchema)
  start(Snippet)
})

function start (Snippet) {
  var create = (name, content) => {
    var snippet = {
      name: name,
      content: content
    }
    Snippet.create(snippet, function (err, snippet) {
      if (err || !snippet) {
        console.error('Could not create snippet', name)
        mongoose.disconnect()
        return
      }
      console.log('Created snippet', snippet.name)
      mongoose.disconnect()
    })
  }

  var read = (name) => {
    Snippet.findOne({name: name}, (err, snippet) => {
      if (err || !snippet) {
        console.error('Could not read snippet', name)
        mongoose.disconnect()
        return
      }
      console.log('Read snippet', snippet.name)
      console.log(snippet.content)
      mongoose.disconnect()
    })
  }

  var update = (name, content) => {
    Snippet.findOneAndUpdate({name: name}, {content: content},
    (err, snippet) => {
      if (err || !snippet) {
        console.error('Could not update snippet', name)
        mongoose.disconnect()
        return
      }
    })
  }

  var del = (name) => {
    Snippet.findOneAndRemove({name: name}, (err, snippet) => {
      if (err || !snippet) {
        console.error('Could not delete snippet', name)
        mongoose.disconnect()
        return
      }
      console.log('Deleted snippet', snippet.name)
      mongoose.disconnect()
    })
  }

  main()
  function main () {
    if (process.argv[2] === 'create') {
      create(process.argv[3], process.argv[4])
    } else if (process.argv[2] === 'read') {
      read(process.argv[3])
    } else if (process.argv[2] === 'update') {
      update(process.argv[3], process.argv[4])
    } else if (process.argv[2] === 'delete') {
      del(process.argv[3])
    } else {
      console.error('Command not recognized')
      mongoose.disconnect()
    }
  }
}
