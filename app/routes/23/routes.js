module.exports = function (router) {
  // Require files in this testing version
  var tools = require('../tools.js')

  // require('./ER-1412-no-qualifications.js')(router)
  // require('./RVDB-21-collaboration.js')(router)
  require('./testing.js')(router)

  // CHANGE VERSION TO THE VERSION
  const version = 'v23'
  const base_url = version + "/"
  const file_url = version + "/employer"
  // const file_url = version + "/recruitment"
  // const moment = require('moment');

  // -------------------------------
  // #config
  // -------------------------------

  // ACTION CALLED ON EVERY PAGE
  router.get('/' + base_url + '*', function (req, res, next) {
    // Track any changes to employer amount and update the the employers list
    if (req.session.data.currentEmployerAmount != req.session.data.employerAmount) {
      req.session.data.currentEmployerAmount = req.session.data.employerAmount
      tools.getEmployersList(req.session.data.employers, req.session.data.employerAmount)
    }
    req.session.data.currentEmloyerAmount = req.session.data.currentEmloyerAmount || req.session.data.employerAmount
    return next()
  })

  router.post('/' + base_url + '*/config', function (req, res) {
    req.session.data.providerName = req.session.data.orgName
    req.session.data.employers_list = tools.getEmployersList(req.session.data.employers, req.session.data.employerAmount)
    if (req.session.data.journey == "new") {
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-none')
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard')
    }
  })

  router.get('/' + base_url + ' */vacancies', function (req, res) {
    console.log("req.query.search=" + req.query.search)
    res.render(base_url + req.params[0] + '/vacancies', {
      "query": req.query,
      "search": req.query.search
    }, function (err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/vacancies', {
            "query": req.query,
            "search": req.query.search
          });
        }
        throw err;
      }
      res.send(html);
    });

  })

  // -------------------------------
  // #Posting Journey
  // -------------------------------
  //NEW JOURNEY TRAINING SELECT
  router.post('/' + base_url + '*/create/training-first-select', function (req, res) {
    if (req.body.has_training == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/training-help')
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/training-confirm')

  })

  router.post('/' + base_url + '*/create/training-select', function (req, res) {
    if (req.body.training_level == "different") {
      console.log("working")

      req.body.training_level = req.body.training_level_new
      req.session.data.training_level = req.body.training_level_new
      console.log(req.body.training_level)
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/training-confirm')
  })

  router.post('/' + base_url + '*/create/training-confirm', function (req, res) {
    if (req.session.data.user == "employer") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/select-training-provider')
      console.log("emp")
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/positions')
      console.log("prov")
    }
  })

  router.post('/' + base_url + '*/create/occupational-traineeship', function (req, res) {
    if (req.session.data['occupational'] == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/traineeship-sector");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/std-select");
    }
  })

  router.post('/' + base_url + '*/create/std-select', function (req, res) {
    if (req.body.training_level == "different") {
      console.log("working")

      req.body.training_level = req.body.training_level_new
      req.session.data.training_level = req.body.training_level_new
      console.log(req.body.training_level)
    }
    if (req.session.data.journey == "new") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/training-first-select')
    }
    //res.redirect(301, '/' + base_url + req.params[0] + '/create/std-confirm')
    res.redirect(301, '/' + base_url + req.params[0] + '/create/std-confirm')
  })


  router.post('/' + base_url + '*/create/std-confirm', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + '/create/short-description')
    res.redirect(301, '/' + base_url + req.params[0] + '/create/short-description')
    console.log("prov")
  })

  router.post('/' + base_url + '*/create/tp-title', function (req, res) {
    if (req.session.data.journey == "new") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/training-first-select')
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/std-select')
  })

  router.post('/' + base_url + '*/create/title', function (req, res) {
    if (req.session.data.journey == "new") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/training-first-select')
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/employers-select')
  })

  router.post('/' + base_url + '*/create/employers-select', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    res.redirect(301, '/' + base_url + req.params[0] + "/create/training-select");
  })



  router.post('/' + base_url + '*/create/select-training-provider', function (req, res) {
    var index = req.body.providerName.indexOf("100")
    var ukprn = "10003280"
    var name = "Lifestyle College Training"
    if (index > -1) {
      ukprn = req.body.providerName.slice(index, req.body.providerName.length)
    }

    if (/[a-zA-Z]/.test(req.body.providerName.slice(0, index))) {
      console.log("setting name : " + req.body.providerName.slice(0, index))
      name = req.body.providerName.slice(0, index)
    } else {
      console.log("not setting name")
    }
    req.session.data.providerName == name
    if (name == "PLUMPTON COLLEGE ") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/select-training-provider?hasError=yes&errorType=provider&has_training_provider=yes")
    } else {
      req.session.data.providerName == req.body.providerName.slice(0, index);
    }
    if (req.query.edit == "yes" && req.body.has_training_provider == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no")
    }
    if (req.body.has_training_provider == "yes") {
      if (req.query.provider_blocked) {
        res.redirect(301, '/' + base_url + req.params[0] + "/create/select-training-provider?hasError=yes&errorType=provider")
      }
      res.redirect(301, '/' + base_url + req.params[0] + "/create/confirm-training-provider?hasError=no&errorType=&providerName=" + name + "&UKPRN=" + ukprn)

    } else {
      //res.redirect(301, '/' + base_url + req.params[0] + "/create/positions?providerName=")
      res.redirect(301, '/' + base_url + req.params[0] + "/create/confirm-training-provider?hasError=no&errorType=&providerName=" + name + "&UKPRN=" + ukprn)

    }

  })
  router.post('/' + base_url + '*/create/confirm-training-provider', function (req, res) {
    if (req.session.data.edit == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview?edit=no')
    }
    //res.redirect(301, '/' + base_url + req.params[0] + '/create/positions')
    res.redirect(301, '/' + base_url + req.params[0] + '/create/short-description')
  })



  router.post('/' + base_url + '*/create/main-address', function (req, res) {
    if (req.session.data['mainaddress'] == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/add-address");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/address-list");
    }
  })

  router.post('/' + base_url + '*/create/add-address', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + '/create/dates')
    res.redirect(301, '/' + base_url + req.params[0] + "/create/address-list");
  })

  router.post('/' + base_url + '*/create/add-address1', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + '/create/dates')
    res.redirect(301, '/' + base_url + req.params[0] + "/create/address-list");
  })

  router.post('/' + base_url + '*/create/address-list', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + '/create/dates')
    res.redirect(301, '/' + base_url + req.params[0] + '/create/task-list?section2=completed')
  })


  //WAGES
  router.post('/' + base_url + '*/create/wages', function (req, res) {

    if (req.session.data.edit == "yes") {
      //res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no&error=");
      res.redirect(301, '/' + base_url + req.params[0] + "/create/task-list?edit=no&error=");
    } else {
      //res.redirect(301, '/' + base_url + req.params[0] + "/create/preview-start?error=");
      res.redirect(301, '/' + base_url + req.params[0] + "/create/main-address");
    }
  })

  router.post('/' + base_url + '*/create/duration', function (req, res) {
    if (req.session.data.edit == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/task-list?edit=no");
    } else {
      //res.redirect(301, '/' + base_url + req.params[0] + "/create/wages?error=");
      res.redirect(301, '/' + base_url + req.params[0] + "/create/wages?error=");
    }
  })

  router.post('/' + base_url + '*/create/dates', function (req, res) {
    if (parseInt(req.session.data.start_month) > 3 && parseInt(req.session.data.start_year) > 2019) {
      req.session.data.nationalMinWage = 4
    }
    if (req.session.data.edit == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/duration");
      //res.redirect(301, '/' + base_url + req.params[0] + "/create/positions");
    }
  })

  router.post('/' + base_url + '*/create/preview-start', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview')
  })

  router.get('/' + base_url + '*/create/vacancy-preview*', function (req, res) {

    // SET default if not set
    req.session.data.closing_month = req.session.data.closing_month || "01"
    req.session.data.weeklyHours == req.session.data.weeklyHours || 23

    var hasError = false;
    var errorType = "none"
    //var mWage = tools.getMinWage(req.session.data)
    var mWage = '4000'

    if (req.session.data.WageType == "fixedWage") {
      hasError = tools.isUnderMinWage(req.session.data)
      errorType = "wages"
    }

    res.render(base_url + req.params[0] + "/create/vacancy-preview" + req.params[1], {
      "hasError": hasError,
      "errorType": errorType,
      "minWage": tools.makeCurrancyValue(mWage)
    }, function (err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + "/create/vacancy-preview" + req.params[1]);
        }
        throw err;
      }
      res.send(html);
    })
  })
  router.post('/' + base_url + '*/create/vacancy-preview', function (req, res) {
    //Ricky to do
    //If press delete show delete screen
    //If submit go to confirmation
    //res.redirect(301, '/' + base_url + req.params[0] + '/create/deleteRICKY')
    res.redirect(301, '/' + base_url + req.params[0] + '/create/confirmation')
    //Ricky
  })
  router.post('/' + base_url + '*/create/long-description', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no")
    res.redirect(301, '/' + base_url + req.params[0] + "/create/task-list?edit=no&section1=completed")
  })
  router.post('/' + base_url + '*/create/training-provided', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no")
    res.redirect(301, '/' + base_url + req.params[0] + "/create/task-list?edit=no&section1=completed")
  })
  router.get('/' + base_url + '*/create/qualifications', function (req, res) {
    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];

    res.render(base_url + req.params[0] + '/create/qualifications', {
      "query": req.query,
    }, function (err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/create/qualifications');
        }
        throw err;
      }
      res.send(html);
    });

  })
  router.post('/' + base_url + '*/create/qualification-question', function (req, res) {
    if (req.body.show_qualifications == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }
  })
  router.post('/' + base_url + '*/create/qualifications', function (req, res) {

    req.session.data.qualifications = req.session.data.qualifications || [];

    if (req.query.edit != "yes") {
      var qualification = {
        'ID': req.session.data.qualifications.length,
        'type': req.body.QualificationType || "GCSE or equivalent",
        'subject': req.body.Subject || "English",
        'grade': req.body.Grade || "5 or above",
        'weight': req.body.Weighting || "Essential"
      }
      req.session.data.qualifications.push(qualification);
    } else {
      tools.editListItem(
        req.session.data.qualifications,
        req.query.ID,
        req.body.QualificationType,
        req.body.Subject,
        req.body.Grade,
        req.body.Weighting);
    }

    if (req.body.QualificationType == "GCSE or equivalent" && !tools.hasNumber(req.body.Grade)) {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications?hasError=yes&errorType=grades");
    }
    res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications-list?hasError=no");

  })
  router.get('/' + base_url + '*/create/qualifications-list', function (req, res) {
    req.session.data.qualifications = req.session.data.qualifications || [];

    // create a new array if no array exists.
    if (req.query.show_defualt_qualifications) {
      req.session.data.qualifications = req.session.data.default_qualifications
    }

    var page = "/create/qualifications-list"
    req.session.data.showQualificationAlert = "no";
    // create a new array if no array exists.
    if (req.query.removeID) {
      req.session.data.showQualificationAlert = "yes"
      tools.removeFromList(req.session.data.qualifications, req.query.removeID);

    } else {
      console.log("ADDING")
    }
    if (req.session.data.qualifications.length == 0) {
      req.session.data.showQualificationAlert = "no";
      // return res.redirect(301, '/' + base_url + "/vacancy-preview/qualifications?edit=yes&qualifications=");
      page = "/create/qualification-question"
    }

    res.render(base_url + req.params[0] + page, {
      "query": req.query,
    }, function (err, html) {
      if (err) {
        return res.render(file_url + page);
        throw err;
      }
      res.send(html);
    });
  })
  router.get('/' + base_url + '*/create/qualifications-list-referred', function (req, res) {
    res.render(base_url + req.params[0] + "/create/qualifications-list-referred", {
      "query": req.query
    })
  })

  router.post('/' + base_url + '*/create/qualifications-list', function (req, res) {
    // if the rendered page is actually the qualification-question page
    if (req.body.show_qualifications == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications");
    } else if (req.body.show_qualifications == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }

    if (req.body.button == "Preview") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications-list");
    }

  })

  router.post('/' + base_url + '*/create/skills', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications?edit=no");
  })
  router.post('/' + base_url + '*/create/short-description', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    res.redirect(301, '/' + base_url + req.params[0] + "/create/long-description?edit=no");
  })
  router.post('/' + base_url + '*/create/things-to-consider', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    res.redirect(301, '/' + base_url + req.params[0] + "/create/task-list?section3=completed&edit=no");
  })
  router.post('/' + base_url + '*/create/contact', function (req, res) {
    //res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    res.redirect(301, '/' + base_url + req.params[0] + "/create/application-process");
  })
  router.post('/' + base_url + '*/create/check-your-answers', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + "/create/confirmation");
  })
  router.post('/' + base_url + '*/create/advert-preview', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + "/create/confirmation");
  })

  router.post('/' + base_url + '*/create/preview-vacancy', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + "/create/confirmation");
  })





  //#confirmationj
  router.post('/' + base_url + '*/create/confirmation', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-' + req.session.vacancies)
    // if(req.session.force_notifcation_setup == "yes" && req.session.has_notifications == "no"){
    //     res.redirect(301, '/' + base_url + '/notifications/receive-notifications');
    // }else{
    //   res.redirect(301, '/' + base_url + '/dashboard-'+req.session.vacancies)
    // }
  })
  // -------------------------------
  // #NOTIFCATIONS
  // -------------------------------
  router.post('/' + base_url + '*/notifications/receive-notifications', function (req, res) {
    if (req.body.receive_notification == "yes") {
      req.session.receive_notification = 'yes'
      req.session.has_notifications = 'no'
      res.redirect(301, '/' + base_url + req.params[0] + '/notifications/notification-preferences-new');
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-' + req.session.vacancies)
    }
  })
  router.get('/' + base_url + '*/notifications/notification-preferences', function (req, res) {
    var page = "/notifications/notification-preferences"

    if (req.session.data.has_notifications == "no") {
      page = '/notifications/notification-preferences-new'
    }
    res.render(base_url + req.params[0] + page, {
      "query": req.query,
      "new": req.query.new,
    }, function (err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + page);
        }
        throw err;
      }
      res.send(html);
    });
  })
  router.post('/' + base_url + '*/notifications/notification-preferences', function (req, res) {
    if (req.body.receive_notification != "_unchecked") {
      req.session.force_notifcation_setup = "no"
      req.session.has_notifications = "yes"
      res.redirect(301, '/' + base_url + req.params[0] + '/notifications/notificaiton-confirmation?new=no')
    } else {
      req.session.has_notifications = "no"
      res.redirect(301, '/' + base_url + req.params[0] + '/notifications/notificaiton-confirmation-unsubscribe')
    }
  })

  router.post('/' + base_url + '*/notifications/notification-preferences-new', function (req, res) {
    if (req.body.receive_notification) {
      req.session.force_notifcation_setup = "no"
      req.session.has_notifications = "yes"
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/notifications/notificaiton-confirmation?new=yes')

  })


  router.get('/' + base_url + '*/notifications/notificaiton-confirmation', function (req, res) {
    res.render(base_url + req.params[0] + '/notifications/notificaiton-confirmation', {
      "query": req.query,
      "new": req.query.new,
    }, function (err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/notifications/notificaiton-confirmation');
        }
        throw err;
      }
      res.send(html);
    });
  })
  router.post('/' + base_url + '*/notifications/notificaiton-confirmation', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-' + req.session.vacancies)
  })
  router.post('/' + base_url + '/notifications/notificaiton-confirmation-unsubscribe', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-' + req.session.vacancies)
  })

  router.post('/' + base_url + '*/account/close', function (req, res) {

    if (req.body.ConfirmClose == "true") {
      res.redirect(301, '/' + base_url + req.params[0] + '/account/manage-vacancy-closed?alert=yes')
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/account/manage-vacancy')
    }

  })

  router.post('/' + base_url + '*/account/close', function (req, res) {

    if (req.body.ConfirmClose == "true") {
      res.redirect(301, '/' + base_url + '/account/manage-vacancy-closed?alert=yes')
    } else {
      res.redirect(301, '/' + base_url + '/account/manage-vacancy')
    }

  })
  router.post('/' + base_url + '*/account/clone-dates', function (req, res) {

    if (req.body.change_date == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview-cloned')
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/account/clone-change-dates?edit=yes')

    }

  })
  router.post('/' + base_url + '*/account/clone-location', function (req, res) {
    req.session.ApplicationMethod = 'ThroughFindAnApprenticeship'
    if (req.body.change_location == "yes") {
      res.redirect(301, '/' + base_url + '/vacancy-preview-cloned')
    } else {
      res.redirect(301, '/' + base_url + '/account/clone-change-location')

    }

  })
  // ---------------
  // NEW
  // ---------------
  router.post('/' + base_url + '*/review/vacancy-review', function (req, res) {
    if (req.body.review_vacancy_outcome == "approve") {
      res.redirect(301, '/' + base_url + req.params[0] + '/review/review-confirmation')
    }

    res.redirect(301, '/' + base_url + req.params[0] + '/review/review-confirmation-rejected')
  })
  // Base page router
  router.get('/' + base_url + '*', function (req, res) {
    console.log("Rendering page: " + req.params[0])
    var dir = req.params[0].split(/\/+/g);
    // Remove the main folder
    dir.shift()
    var baseDir = ""
    dir.forEach(function (element) {
      var path = "/" + element
      baseDir += path

    })
    res.render(base_url + req.params[0], {
      "query": req.query
    }, function (err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + baseDir, {
            "query": req.query
          });
        }
        throw err;
      }
      res.send(html);
    });
  })

  // router.post('/' + base_url + '/*/create/confirm-employer', function (req, res) {
  //   res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create/location')
  // })


  // CONFIRM EMPLOYER

  router.post('/' + base_url + '*/create/employers-confirm', function (req, res) {

    if (req.body.confirm_employer == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/employers-select')
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/task-list')

    }

  })

  router.post('/' + base_url + '*/create/employer', function (req, res) {

    if (req.body.vacancy_employer == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/employers-select')
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/title')

    }

  })

  // API

  router.post('/' + base_url + '*/api/api-confirm-delete', function (req, res) {

    if (req.body.api_delete == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + '/api/api-hub')
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/api/api-list-deleted')

    }

  })

  // APPLICATION ACTIONS
  router.post('/' + base_url + '*/account/application-new', function (req, res) {

    if (req.body.application == "review") {
      res.redirect(301, '/' + base_url + req.params[0] + '/view/3c-manage-applications-in-review')
    } else if (req.body.application == "share") {
      res.redirect(301, '/' + base_url + req.params[0] + "/view/3d-check-share");
    } else if (req.body.application == "shortlist") {
      res.redirect(301, '/' + base_url + req.params[0] + "/view/3c-manage-applications-shortlist");
    } else if (req.body.application == "successful") {
      res.redirect(301, '/' + base_url + req.params[0] + "/view/7a-check-successful");
    } else if (req.body.application == "unsuccessful") {
      res.redirect(301, '/' + base_url + req.params[0] + "/view/8b-feedback-unsuccessful-single");
    }

  })


  // EMPLOYER SHARED APPLICATION RESPONSE - V1 FOR USER TESTING
  router.post('/' + base_url + '*/account/application-shared-v1', function (req, res) {

    if (req.body.response == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + '/account/application-shared-saved-v1')
    } else if (req.body.response == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + "/view/6b-shared-applications-no-v1");
    }

  })


  // EMPLOYER SHARED APPLICATION RESPONSE - V2 FOR USER TESTING
  router.post('/' + base_url + '*/account/application-shared-v2', function (req, res) {

    if (req.body.response == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + '/view/6b-shared-applications-yes-v2')
    } else if (req.body.response == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + "/view/6b-shared-applications-no-v2");
    }

  })


  // APPLICATION QUESTION PAGE - QUALIFICATION TYPE
  router.post('/' + base_url + 'faa/apply/qualification-type/action', function (req, res) {
    var qual = req.session.data['qualification'];

    if (qual === "gcse") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/gcse');
    } else if (qual === "a-level") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/a-level');
    } else if (qual === "as-level") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/as-level');
    } else if (qual === "apprenticeship") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/apprenticeship');
    } else if (qual === "btec") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/btec');
    } else if (qual === "degree") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/degree');
    } else if (qual === "hnc") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/hnc');
    } else if (qual === "hnd") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/hnd');
    } else if (qual === "nvq") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/nvq');
    } else if (qual === "t-level") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/t-level');
    } else if (qual === "other-qualification") {
      res.redirect('/' + base_url + 'faa/apply/qualification-type/other-qualification');
    } else {
      // Handle any other cases or invalid values here
      res.redirect('/' + base_url + 'faa/apply/qualification-type/default'); // You can replace 'default' with an appropriate route
    }
  })

}