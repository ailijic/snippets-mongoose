console.log("Hello World");

console.log(this);
// console.log(global);

var that = this;

notStrict();
function notStrict () {
  var name = 'Tim';
  console.log("Not a strict function");
  console.log(this);
  console.warn(this === that);
}
