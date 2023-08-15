//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

$(document).ready(function () {
})

function nodeListForEach (nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback)
  }
  for (var i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes);
  }
}

function Copy ($module) {
  this.$module = $module
}

Copy.prototype.init = function () {
  var $module = this.$module
  if (!$module) {
    return
  }
  var $button = document.createElement('button')
  $button.className = 'app-copy-button js-copy-button'
  $button.setAttribute('aria-live', 'assertive')
  $button.textContent = 'Copy key'

  $module.insertBefore($button, $module.firstChild)
  this.copyAction()
}
Copy.prototype.copyAction = function () {
  // Copy to clipboard
  try {
    new ClipboardJS('.js-copy-button', {
      target: function (trigger) {
        return trigger.nextElementSibling
      }
    }).on('success', function (e) {
      e.trigger.textContent = 'Key copied'
      e.clearSelection()
      setTimeout(function () {
        e.trigger.textContent = 'Copy key'
      }, 5000)
    })
  } catch (err) {
    if (err) {
      console.log(err.message)
    }
  }
}

var $codeBlocks = document.querySelectorAll('[data-module="app-copy"]')
nodeListForEach($codeBlocks, function ($codeBlock) {
  new Copy($codeBlock).init()
})

function sortApprenticeships(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("manage-apprenticeships-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until no switching has been done: */
  while (switching) {
       // start by saying: no switching is done:
       switching = false;
       rows = table.rows;
       /* Loop through all table rows (except the first, which contains table headers): */
       for (i = 1; i < (rows.length - 1); i++) {
            // start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare, one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* check if the two rows should switch place, based on the direction, asc or desc: */
            if (dir == "asc") {
                 if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                      // if so, mark as a switch and break the loop:
                      shouldSwitch= true;
                      break;
                 }
            } else if (dir == "desc") {
                 if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                      // if so, mark as a switch and break the loop:
                      shouldSwitch = true;
                      break;
                 }
            }
       }
       if (shouldSwitch) {
            /* If a switch has been marked, make the switchand mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
       } else {
            /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                 dir = "desc";
                 switching = true;
            }
       }
  }
}

// Table sort code
function sortTableOne(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("order-table-one");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until no switching has been done: */
  while (switching) {
       // start by saying: no switching is done:
       switching = false;
       rows = table.rows;
       /* Loop through all table rows (except the first, which contains table headers): */
       for (i = 1; i < (rows.length - 1); i++) {
            // start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare, one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* check if the two rows should switch place, based on the direction, asc or desc: */
            if (dir == "asc") {
                 if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                      // if so, mark as a switch and break the loop:
                      shouldSwitch= true;
                      break;
                 }
            } else if (dir == "desc") {
                 if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                      // if so, mark as a switch and break the loop:
                      shouldSwitch = true;
                      break;
                 }
            }
       }
       if (shouldSwitch) {
            /* If a switch has been marked, make the switchand mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
       } else {
            /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                 dir = "desc";
                 switching = true;
            }
       }
  }
}

function sortTableTwo(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("order-table-two");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until no switching has been done: */
  while (switching) {
       // start by saying: no switching is done:
       switching = false;
       rows = table.rows;
       /* Loop through all table rows (except the first, which contains table headers): */
       for (i = 1; i < (rows.length - 1); i++) {
            // start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare, one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* check if the two rows should switch place, based on the direction, asc or desc: */
            if (dir == "asc") {
                 if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                      // if so, mark as a switch and break the loop:
                      shouldSwitch= true;
                      break;
                 }
            } else if (dir == "desc") {
                 if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                      // if so, mark as a switch and break the loop:
                      shouldSwitch = true;
                      break;
                 }
            }
       }
       if (shouldSwitch) {
            /* If a switch has been marked, make the switchand mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
       } else {
            /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                 dir = "desc";
                 switching = true;
            }
       }
  }
}

// $('#manage-apprenticeships-table thead tr th a').on("click", function (e) {
//      e.preventDefault();
// });

function sortApprenticeships(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("manage-apprenticeships-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until no switching has been done: */
  while (switching) {
       // start by saying: no switching is done:
       switching = false;
       rows = table.rows;
       /* Loop through all table rows (except the first, which contains table headers): */
       for (i = 1; i < (rows.length - 1); i++) {
            // start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare, one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* check if the two rows should switch place, based on the direction, asc or desc: */
            if (dir == "asc") {
                 if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                      // if so, mark as a switch and break the loop:
                      shouldSwitch= true;
                      break;
                 }
            } else if (dir == "desc") {
                 if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                      // if so, mark as a switch and break the loop:
                      shouldSwitch = true;
                      break;
                 }
            }
       }
       if (shouldSwitch) {
            /* If a switch has been marked, make the switchand mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
       } else {
            /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                 dir = "desc";
                 switching = true;
            }
       }
  }
}

// Sort table
$('#selectedStatus').on("change", function (e) {
  if ($(this).val() == 'all') {
       $('#manage-apprenticeships-table tbody tr').show();
  } else if ($(this).val() == 'WaitingToStart') {
       $('#manage-apprenticeships-table tbody tr').hide();
       $('#manage-apprenticeships-table tbody tr.waiting-to-start').show();
  } else if ($(this).val() == 'Live') {
       $('#manage-apprenticeships-table tbody tr').hide();
       $('#manage-apprenticeships-table tbody tr.live').show();
  } else if ($(this).val() == 'Stopped') {
       $('#manage-apprenticeships-table tbody tr').hide();
       $('#manage-apprenticeships-table tbody tr.stopped').show();
  } else if ($(this).val() == 'Completed') {
       $('#manage-apprenticeships-table tbody tr').hide();
       $('#manage-apprenticeships-table tbody tr.completed').show();
  }
});

$('#selectedAlerts').on("change", function (e) {
  if ($(this).val() == 'all') {
       $('#manage-apprenticeships-table tbody tr').show();
  } else if ($(this).val() == 'changesPending') {
       $('#manage-apprenticeships-table tbody tr').hide();
       $('#manage-apprenticeships-table tbody tr.changes-pending').show();
  } else if ($(this).val() == 'changesForReview') {
       $('#manage-apprenticeships-table tbody tr').hide();
       $('#manage-apprenticeships-table tbody tr.changes-for-review').show();
  } else if ($(this).val() == 'changesRequested') {
       $('#manage-apprenticeships-table tbody tr').hide();
       $('#manage-apprenticeships-table tbody tr.changes-requested').show();
  } else if ($(this).val() == 'ILRDataMismatch') {
       $('#manage-apprenticeships-table tbody tr').hide();
       $('#manage-apprenticeships-table tbody tr.ilr-data-mismatch').show();
  } else if ($(this).val() == 'noAlerts') {
       $('#manage-apprenticeships-table tbody tr').show();
       $('#manage-apprenticeships-table tbody tr.changes-pending, #manage-apprenticeships-table tbody tr.changes-for-review, #manage-apprenticeships-table tbody tr.changes-requested, #manage-apprenticeships-table tbody tr.ilr-data-mismatch').hide();
  }
});
