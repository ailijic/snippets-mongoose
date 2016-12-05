var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/')

mongoose.connection.on('error', err => {
  console.error('Could not connect. Error: ', err)
})

  var snippetSchema = mongoose.Schema({
    name: {type: String, unique: true},
    content: String
  })

  var Snippet = mongoose.model('Snippet', snippetSchema)
  
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
    mongoose.diconnect()
  })
}

var read = name => {
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

var del = (name, content) => {
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

mongoose.connection.once('open', function () {
  
  
create('person', 'Tim')
console.log(read('person'))
})
