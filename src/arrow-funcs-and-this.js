console.log('Hello World')

// console.log(this);
// console.log(global);

var that = this

notStrict()
function notStrict () {
  var name = 'Tim'
  var that2 = this
  console.log('name: ', name)
  console.log('Not a strict function')
  console.log(this)
  console.warn(this === that)
  notstrictCall()
  function notstrictCall () {
    console.log('inside notstrictCall()')
    // console.log(name)
    console.log(that)
    console.log(that2)
  }

  var arrowFunc = () => {
    console.log(name)
    console.log(this)
    console.log(that)
    console.log(that2)
  }
  arrowFunc()
}

strict()
function strict () {
  'use strict'
  var name = 'Jon'
  var that2 = this
  console.log('name: ', name)
  console.log(this)
  strictCall()
  function strictCall () {
    console.log('inside strictCall()')
    console.log(name)
    console.log(that)
    console.log(that2)
  }
}
