"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _stripe = _interopRequireDefault(require("stripe"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailer2 = require("../config/nodemailer");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var router = (0, _express.Router)();
var stripe = (0, _stripe.default)(process.env.STRIPE_SK); //1 INDIVIDUAL TICKET 10.00

router.post('/tickets/idv/1', function (req, res) {
  var token = req.body.id;
  var email = req.body.email;
  console.log(req.body);
  stripe.customers.create({
    source: token,
    email: email
  }).then(function (customer) {
    console.log('this is the customer', customer);
    stripe.charges.create({
      amount: 1000,
      currency: 'usd',
      description: 'For PMM Weekend',
      customer: customer.id,
      receipt_email: customer.email
    });
  }).then(function (charge) {
    res.send(charge);
  }).catch(function onError(error) {
    if (error.status === 400) {
      console.log('Bad request, often due to missing a required parameter.');
    } else if (error.status === 401) {
      console.log('No valid API key provided.');
    } else if (error.status === 404) {
      console.log('The requested resource doesn\'t exist.');
    } else if (error.status === 500) {
      console.log('Purchase Failed');
    }
  }); //SENDING email

  var mailOption = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: "".concat(email, ", YOU@YOUR_DOMAIN_NAME'"),
    subject: 'Hello',
    text: 'Thank you for you Payment..See you at PMM Weekend!'
  };

  _nodemailer2.transporter.sendMail(mailOption, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent!');
      res.sendStatus(201);
    }

    _nodemailer2.transporter.close();
  });
}); //2 INDIVIDUAL TICKET 20.00

router.post('/tickets/idv/2', function (req, res) {
  var token = req.body.id;
  var email = req.body.email;
  console.log(req.body);
  stripe.customers.create({
    source: token,
    email: email
  }).then(function (customer) {
    console.log('this is the customer', customer);
    stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'For PMM Weekend',
      customer: customer.id,
      receipt_email: customer.email
    });
  }).then(function (charge) {
    res.send(charge);
  }).catch(function onError(error) {
    if (error.status === 400) {
      console.log('Bad request, often due to missing a required parameter.');
    } else if (error.status === 401) {
      console.log('No valid API key provided.');
    } else if (error.status === 404) {
      console.log('The requested resource doesn\'t exist.');
    } else if (error.status === 500) {
      console.log('Purchase Failed');
    }
  }); //SENDING email

  var mailOption = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: "".concat(email, ", YOU@YOUR_DOMAIN_NAME'"),
    subject: 'Hello',
    text: 'Thank you for you Payment..See you at PMM Weekend!'
  };

  _nodemailer2.transporter.sendMail(mailOption, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent!');
      res.sendStatus(201);
    }

    _nodemailer2.transporter.close();
  });
}); //3 INDIVIDUAL TICKET 30.00

router.post('/tickets/idv/3', function (req, res) {
  var token = req.body.id;
  var email = req.body.email;
  stripe.customers.create({
    source: token,
    email: email
  }).then(function (customer) {
    console.log('this is the customer', customer);
    stripe.charges.create({
      amount: 3000,
      currency: 'usd',
      description: 'For PMM Weekend',
      customer: customer.id,
      receipt_email: customer.email
    });
  }).then(function (charge) {
    res.send(charge);
  }).catch(function onError(error) {
    if (error.status === 400) {
      console.log('Bad request, often due to missing a required parameter.');
    } else if (error.status === 401) {
      console.log('No valid API key provided.');
    } else if (error.status === 404) {
      console.log('The requested resource doesn\'t exist.');
    } else if (error.status === 500) {
      console.log('Purchase Failed');
    }
  }); //SENDING email

  var mailOption = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: "".concat(email, ", YOU@YOUR_DOMAIN_NAME'"),
    subject: 'Hello',
    text: 'Thank you for you Payment..See you at PMM Weekend!'
  };

  _nodemailer2.transporter.sendMail(mailOption, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent!');
      res.sendStatus(201);
    }

    _nodemailer2.transporter.close();
  });
}); //4 INDIVIDUAL TICKET 40.00

router.post('/tickets/idv/4', function (req, res) {
  var token = req.body.id;
  var email = req.body.email;
  stripe.customers.create({
    source: token,
    email: email
  }).then(function (customer) {
    console.log('this is the customer', customer);
    stripe.charges.create({
      amount: 4000,
      currency: 'usd',
      description: 'For PMM Weekend',
      customer: customer.id,
      receipt_email: customer.email
    });
  }).then(function (charge) {
    res.send(charge);
  }).catch(function onError(error) {
    if (error.status === 400) {
      console.log('Bad request, often due to missing a required parameter.');
    } else if (error.status === 401) {
      console.log('No valid API key provided.');
    } else if (error.status === 404) {
      console.log('The requested resource doesn\'t exist.');
    } else if (error.status === 500) {
      console.log('Purchase Failed');
    }
  }); //SENDING email

  var mailOption = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: "".concat(email, ", YOU@YOUR_DOMAIN_NAME'"),
    subject: 'Hello',
    text: 'Thank you for you Payment..See you at PMM Weekend!'
  };

  _nodemailer2.transporter.sendMail(mailOption, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent!');
      res.sendStatus(201);
    }

    _nodemailer2.transporter.close();
  });
}); //5 INDIVIDUAL TICKET 50.00

router.post('/tickets/idv/5', function (req, res) {
  var token = req.body.id;
  var email = req.body.email;
  stripe.customers.create({
    source: token,
    email: email
  }).then(function (customer) {
    console.log('this is the customer', customer);
    stripe.charges.create({
      amount: 5000,
      currency: 'usd',
      description: 'For PMM Weekend',
      customer: customer.id,
      receipt_email: customer.email
    });
  }).then(function (charge) {
    res.send(charge);
  }).catch(function onError(error) {
    if (error.status === 400) {
      console.log('Bad request, often due to missing a required parameter.');
    } else if (error.status === 401) {
      console.log('No valid API key provided.');
    } else if (error.status === 404) {
      console.log('The requested resource doesn\'t exist.');
    } else if (error.status === 500) {
      console.log('Purchase Failed');
    }
  }); //SENDING email

  var mailOption = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: "".concat(email, ", YOU@YOUR_DOMAIN_NAME'"),
    subject: 'Hello',
    text: 'Thank you for you Payment..See you at PMM Weekend!'
  };

  _nodemailer2.transporter.sendMail(mailOption, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent!');
      res.sendStatus(201);
    }

    _nodemailer2.transporter.close();
  });
}); //TENT SPACE PURCHASE 1

router.post('/tickets/tntsp/1', function (req, res) {
  var token = req.body.id;
  var email = req.body.email;
  stripe.customers.create({
    source: token,
    email: email
  }).then(function (customer) {
    console.log('this is the customer', customer);
    stripe.charges.create({
      amount: 12000,
      currency: 'usd',
      description: 'For PMM Weekend',
      customer: customer.id,
      receipt_email: customer.email
    });
  }).then(function (charge) {
    res.send(charge);
  }).catch(function onError(error) {
    if (error.status === 400) {
      console.log('Bad request, often due to missing a required parameter.');
    } else if (error.status === 401) {
      console.log('No valid API key provided.');
    } else if (error.status === 404) {
      console.log('The requested resource doesn\'t exist.');
    } else if (error.status === 500) {
      console.log('Purchase Failed');
    }
  }); //SENDING email

  var mailOption = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: "".concat(email, ", YOU@YOUR_DOMAIN_NAME'"),
    subject: 'Hello',
    text: 'Thank you for you Payment..See you at PMM Weekend!'
  };

  _nodemailer2.transporter.sendMail(mailOption, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent!');
      res.sendStatus(201);
    }

    _nodemailer2.transporter.close();
  });
}); //TENT SPACE PURCHASE 2

router.post('/tickets/tntsp/2', function (req, res) {
  var token = req.body.id;
  var email = req.body.email;
  stripe.customers.create({
    source: token,
    email: email
  }).then(function (customer) {
    console.log('this is the customer', customer);
    stripe.charges.create({
      amount: 24000,
      currency: 'usd',
      description: 'For PMM Weekend',
      customer: customer.id,
      receipt_email: customer.email
    });
  }).then(function (charge) {
    res.send(charge);
  }).catch(function onError(error) {
    if (error.status === 400) {
      console.log('Bad request, often due to missing a required parameter.');
    } else if (error.status === 401) {
      console.log('No valid API key provided.');
    } else if (error.status === 404) {
      console.log('The requested resource doesn\'t exist.');
    } else if (error.status === 500) {
      console.log('Purchase Failed');
    }
  }); //SENDING email

  var mailOption = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: "".concat(email, ", YOU@YOUR_DOMAIN_NAME'"),
    subject: 'Hello',
    text: 'Thank you for you Payment..See you at PMM Weekend!'
  };

  _nodemailer2.transporter.sendMail(mailOption, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent!');
      res.sendStatus(201);
    }

    _nodemailer2.transporter.close();
  });
}); //TENT SPACE PURCHASE 3

router.post('/tickets/tntsp/3', function (req, res) {
  var token = req.body.id;
  var email = req.body.email;
  stripe.customers.create({
    source: token,
    email: email
  }).then(function (customer) {
    console.log('this is the customer', customer);
    stripe.charges.create({
      amount: 36000,
      currency: 'usd',
      description: 'For PMM Weekend',
      customer: customer.id,
      receipt_email: customer.email
    });
  }).then(function (charge) {
    res.send(charge);
  }).catch(function onError(error) {
    if (error.status === 400) {
      console.log('Bad request, often due to missing a required parameter.');
    } else if (error.status === 401) {
      console.log('No valid API key provided.');
    } else if (error.status === 404) {
      console.log('The requested resource doesn\'t exist.');
    } else if (error.status === 500) {
      console.log('Purchase Failed');
    }
  }); //SENDING email

  var mailOption = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: "".concat(email, ", YOU@YOUR_DOMAIN_NAME'"),
    subject: 'Hello',
    text: 'Thank you for you Payment..See you at PMM Weekend!'
  };

  _nodemailer2.transporter.sendMail(mailOption, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent!');
      res.sendStatus(201);
    }

    _nodemailer2.transporter.close();
  });
});
var _default = router;
exports.default = _default;