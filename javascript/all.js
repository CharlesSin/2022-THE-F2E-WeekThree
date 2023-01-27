// Sorted
function arraySortedOrNot(arr, n) {
  if (n == 1 || n == 0) return true;
  if (arr[n - 1] < arr[n - 2]) return false;
  return arraySortedOrNot(arr, n - 1);
}

function nextStep(from, destination) {
  document.getElementById(from).classList.remove("active");
  document.getElementById(destination).classList.add("active");
}

function prevStep(from, destination) {
  document.getElementById(from).classList.remove("active");
  document.getElementById(destination).classList.add("active");
}

function closeToast(id) {
  $(`#${id}`).removeClass("show");
}

function openToast(content) {
  $("#toast").find(".toast-msg > p").text(content);
  $("#toast").addClass("show");
}

function thirdSectionChecking() {
  const eleArray = document.getElementById("poker-card-dropable").querySelectorAll(".drag[data-index]");
  let indexArray = [];
  for (let i = 0; i < eleArray.length; i++) {
    indexArray.push(parseInt(eleArray[i].getAttribute("data-index")));
  }
  arraySortedOrNot(indexArray, indexArray.length) ? nextStep("third", "fourth") : openToast("哦歐！排序錯誤，請再調整順序");
}

// Droppable
function DroppableInit() {
  $(".droppable, .droppable-area1, .droppable-area2, .droppable-area3, .droppable-area4, .droppable-area5")
    .sortable({
      connectWith: ".connected-sortable",
      stack: ".connected-sortable ul",
    })
    .disableSelection();
}

// Fifth Section Checking
function fifthSectionChecking() {
  if (parseInt($("#job-size").text()) > 20) {
    openToast("超過20點，請再調整清單");
  } else if (parseInt($("#job-size").text()) <= 0) {
    openToast("尚未置入任何項目，請置入項目");
  } else {
    nextStep("fifth", "sixth");
  }
}

// Seventh Section Checking
function seventhSectionChecking() {
  console.log("seventhSectionChecking()");
  let colorBoxArea = $(".small-box-dash");

  let yellowContentLen = $(colorBoxArea[0]).children().length;
  let greenContentLen = $(colorBoxArea[1]).children().length;

  let yellowChildrenColor = $(colorBoxArea[0]).children()?.attr("data-color") || false;
  let greenChildrenColor = $(colorBoxArea[1]).children()?.attr("data-color") || false;

  let yellowStatus = yellowContentLen > 0 && yellowChildrenColor !== "yellow";
  let greenStatus = greenContentLen > 0 && greenChildrenColor !== "green";

  if (yellowContentLen == 0 || greenContentLen == 0) {
    openToast("尚未置入任何項目，請置入項目");
  } else if (yellowStatus && greenStatus) {
    openToast("置入錯誤，請重新置入");
  } else {
    nextStep("seventh", "eighth");
  }
}

// Selected Checking for Section Eight
function selectedChecking(...args) {
  let [combinationA, combinationB] = args;

  let combA = document.querySelector(`[name=${combinationA}]:checked`)?.value || "havent select";
  let combB = document.querySelector(`[name=${combinationB}]:checked`)?.value || "havent select";

  if (combA == "havent select" && combB == "havent select") {
    openToast("尚未選擇，請選擇適合的答案");
  } else if (combA == "true" && combB == "true") {
    nextStep("eighth", "ninth");
  } else {
    openToast("選擇錯誤，請再思考一下");
  }
}

$(document).ready(function () {
  // Droppable Init
  DroppableInit();

  // Draggable/Droppable Scope for Section Fifth
  $(".fifth-box").draggable({
    scope: "demoBox",
    revertDuration: 100,
    start: function (event, ui) {
      //Reset
      $(".box").draggable("option", "revert", true);
    },
  });

  $(".fifth-drag-area").droppable({
    scope: "demoBox",
    drop: function (event, ui) {
      var area = $(this).find(".area").html();
      var box = $(ui.draggable).html();
      $(".box").draggable("option", "revert", false);

      //Realign item
      $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo(this);

      let droppableArea = $(".fifth .content").find("img[data-value]");
      let totalJobNumber = 0;
      for (let index = 0; index < droppableArea.length; index++) {
        totalJobNumber += parseInt($(droppableArea[index]).attr("data-value"));
      }
      if (totalJobNumber > 20) {
        $("#job-size").text(totalJobNumber);
        $("#job-size").css("color", "#9C0700");
      } else {
        $("#job-size").text(totalJobNumber);
        $("#job-size").css("color", "#ffffff");
      }
    },
  });

  // Draggable/Droppable Scope for Section Seventh
  $(".seventh-box").draggable({
    scope: "demoBox",
    revertDuration: 100,
    start: function (event, ui) {
      //Reset
      $(".box").draggable("option", "revert", true);
    },
  });

  $(".seventh-drag-area").droppable({
    scope: "demoBox",
    drop: function (event, ui) {
      var area = $(this).find(".area").html();
      var box = $(ui.draggable).html();
      $(".box").draggable("option", "revert", false);

      //Realign item
      $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo(this);
    },
  });
});
