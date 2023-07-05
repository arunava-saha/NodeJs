const express = require("express");
const path = require("path");
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static('assets'));

//middle ware 1

// app.use(function (req, res, next) {
//   console.log('middleware 1 called');
//   next();
// })

//middle ware 2

// app.use(function (req, res, next) {
//   console.log('middleware 2 called');
//   next();
// })


var contactList = [
  {
    name: "Jane Doe",
    email: "envkt@example.com",
    phone: "1231111190",
    message: "I am flying"
  },
  {
    name: "Arunava Saha",
    email: "arunava@example.com",
    phone: "1234511111",
    message: "claying"
  },
  {
    name: "sanurry",
    email: "anurr@example.com",
    phone: "1333337890",
    message: "I am playing"
  },
  {
    name: "Jahn",
    email: "ennet@example.com",
    phone: "1234567890",
    message: "horray!!"
  }
]

// app.get("/", function (req, res) {
//   return res.render("home", {
//     title: "Contact list",
//     contact_List: contactList
//   });
//   // console.log(__dirname);
//   // res.send('<h1>it is running</h1>');
// });
// app.get("/practice", function (req, res) {
//   return res.render("practice", { title: "Let's play" });

// });

app.get('/', async function (req, res) {

  try {
    const contacts = await Contact.find({});
    return res.render('home', {
      title: "Contact List",
      contactList: contacts,
      contactList: contactList
    });
  } catch (err) {
    console.log("error in fetching contacts from db");
    return;
  }
});


app.post('/create-contact', async function (req, res) {
  // return res.redirect("/practice");
  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone,
  //   email: req.body.email,
  //   message: req.body.message
  // });

  contactList.push(req.body);

  try {
    const newContact = await Contact.create(req.body);
    console.log('*********', newContact);
    return res.redirect('back');
  } catch (err) {
    console.log("error in the contact creation:");
    return;
  }

  // Contact.create(req.body,
  //   // {
  //   //   name: req.body.name,
  //   //   phone: req.body.phone,
  //   //   email: req.body.email,
  //   //   message: req.body.message
  //   // },
  //   function (err, newContact) {
  //     if (err) { console.log('error in the contact creation:'); return; }

  //     console.log('*********', newContact);
  //     return res.redirect('back');
  //   });
});

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  }

  console.log(" no error", port);
});


app.get('/delete-contact/', function (req, res) {
  console.log(req.query);
  let phone = req.query.phone

  let contactindex = contactList.findIndex(contact => contact.phone == phone);

  if (contactindex != -1) {
    contactList.splice(contactindex, 1);
  }

  return res.redirect('back');
});
