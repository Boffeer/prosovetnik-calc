$(document).ready(function () {
  /**
   * TABS
   */
  // $(".cases-showcase-tabbar__button").each(function () {
  //   $(this).on("click", function () {
  //     $(".cases-showcase-tabbar__button").removeClass(
  //       "cases-showcase-tabbar__button--current"
  //     );
  //     $(this).addClass("cases-showcase-tabbar__button--current");
  //     var target = $(this).attr("data-target");
  //     $(".cases-showcase-tabs-tab").hide();
  //     $('.cases-showcase-tabs-tab[data-target="' + target + '"]').show();
  //     $("html, body").animate(
  //       { scrollTop: $(".cases").offset().top - 40 },
  //       800
  //     );
  //   });
  // });

  $(".calc-calculator-controls-control-range__slider").on(
    "change",
    function (ev) {
      console.log(this);
    }
  );

  var noInflation = {
    fund: {
      total: 360000,
    },
    easyPercent: {
      total: 228800,
      perYear: [
        45000, 48000, 50000, 54000, 67878, 75000, 90000, 110000, 125000, 130000,
        150000,
      ],
    },
    hardPercent: {
      total: 1179179,
      perYear: [
        450000, 480000, 500000, 540000, 678789, 750000, 900000, 1100000,
        1250000, 1300000, 1500000,
      ],
    },
    years: 11,
    yearsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  };

  var chartOptions = {
    low: 0,
    showArea: true,
    height: "304px",
  };
  var chartContainer = ".calc-calculator-charts-chart-summary-container";
  var chartWithInflation = new Chartist.Line(
    chartContainer,
    {
      labels: noInflation.yearsArray,
      series: [
        noInflation.hardPercent.perYear,
        noInflation.easyPercent.perYear,
      ],
    },
    chartOptions
  );

  chartWithInflation.on("created", function () {
    var xModifier = 30;
    // Move labels
    $(".ct-labels foreignObject").each(function () {
      if ($(this).attr("x") == 10) {
        $(this).attr("x", "40");
        $(this).find("span").addClass("calc-chart-label--y");
        $(this).find("span").addClass("calc-chart-label");
      } else {
        var x = $(this).attr("x");
        $(this).attr("x", +x + xModifier);
        $(this).find("span").addClass("calc-chart-label--x");
        $(this).find("span").addClass("calc-chart-label");
      }
    });
    // Move Grids
    $(".ct-grids line").each(function () {
      var x1 = $(this).attr("x1");
      var x2 = $(this).attr("x2");
      if ($(this).attr("y1") == 269) {
        $(this).attr("x1", +x1 + xModifier);
        $(this).attr("x2", +x2 - xModifier - 8);
      } else if ($(this).attr("y2") == 15 && $(this).attr("y1") == 15) {
        $(this).attr("x1", +x1 + xModifier);
        $(this).attr("x2", +x2 - xModifier);
      } else if ($(this).attr("y1") == 15) {
        $(this).attr("x1", +x1 + xModifier);
        $(this).attr("x2", +x2 + xModifier);
      } else {
        $(this).attr("x1", +x1 + xModifier + 2);
        $(this).attr("x2", +x2 - xModifier - 8);
      }
    });
  });
  chartWithInflation
    .on("draw", function (data) {
      if (data.type === "point") {
        data.element._node.setAttribute("title", data.value.y + " ₽");
        data.element._node.setAttribute("data-chart-tooltip", "chart1");
      }
    })
    .on("created", function () {
      // Initiate Tooltip
      $(chartContainer).tooltip({
        selector: '[data-chart-tooltip="chart1"]',
        container: chartContainer,
        html: true,
      });
    });
});
