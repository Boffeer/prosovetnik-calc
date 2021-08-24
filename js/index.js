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

  /**
   * Calculator input view
   */
  $(".calc-calculator-controls-control-stepper-value__input").each(function () {
    var currentValue = +$(this).val();
    currentValueString = currentValue.toLocaleString("ru-Ru");
    var maxValue = +$(this).attr("max");
    if (currentValue > maxValue) {
      currentValue = maxValue;
      maxValueString = maxValue.toLocaleString("ru-RU");
      currentValueString = +currentValue;
      $(this).val(currentValue);
      var currentViewElement = $(this).siblings()[0];
      currentViewElement.setAttribute("data-value", maxValueString);
    } else {
      var currentViewElement = $(this).siblings()[0];
      currentViewElement.setAttribute("data-value", currentValueString);
    }
    $(this).on("input change", function () {
      var currentValue = +$(this).val();
      currentValueString = currentValue.toLocaleString("ru-Ru");
      var maxValue = +$(this).attr("max");
      if (currentValue > maxValue) {
        currentValue = maxValue;
        maxValueString = maxValue.toLocaleString("ru-RU");
        currentValueString = +currentValue;
        $(this).val(currentValue);
        var currentViewElement = $(this).siblings()[0];
        currentViewElement.setAttribute("data-value", maxValueString);
        // } else if (currentValue < 1) {
        //   currentValueString = 1;
        //   $(this).val(currentValueString);
        //   var currentViewElement = $(this).siblings()[0];
        //   currentViewElement.setAttribute("data-value", currentValueString);
      } else {
        var currentViewElement = $(this).siblings()[0];
        currentViewElement.setAttribute("data-value", currentValueString);
      }
      console.log($(this).val());
    });

    $(this).on("blur", function () {
      if (currentValue < 1) {
        currentValueString = 1;
        $(this).val(currentValueString);
        var currentViewElement = $(this).siblings()[0];
        currentViewElement.setAttribute("data-value", currentValueString);
      }
    });
  });

  /**
   * Calculator stepper
   */
  function stepperPlus(ev) {
    var inputView = ev.target.nextElementSibling.children[0];
    var inputField = ev.target.nextElementSibling.children[1];
    var currentValue = inputField.getAttribute("value");
    currentValue++;

    inputView.setAttribute("data-value", currentValue);
    inputField.setAttribute("value", currentValue);
  }
  function stepperMinus(ev) {
    var inputView = ev.target.previousElementSibling.children[0];
    var inputField = ev.target.previousElementSibling.children[1];
    var currentValue = inputField.getAttribute("value");

    if (currentValue > 1) {
      currentValue--;

      inputView.setAttribute("data-value", currentValue);
      inputField.setAttribute("value", currentValue);
    }
  }
  $(".calc-calculator-controls-control-stepper__step--plus").each(function () {
    $(this).on("click", function (ev) {
      stepperPlus(ev);
    });
  });
  $(".calc-calculator-controls-control-stepper__step--minus").each(function () {
    $(this).on("click", function (ev) {
      stepperMinus(ev);
    });
  });

  var calcData = {
    arguments: {
      years: 1,
      median: 8,
      onetime: 100000,
      yearly: 10000,
      inflation: 7,
    },
    fund: 360000,
    noInflation: {
      easyPercent: {
        total: 228800,
        perYear: [
          45000, 48000, 50000, 54000, 67878, 75000, 90000, 110000, 125000,
          130000, 150000,
        ],
      },
      hardPercent: {
        total: 1179179,
        perYear: [
          450000, 480000, 500000, 540000, 678789, 750000, 900000, 1100000,
          1250000, 1300000, 1500000,
        ],
      },
    },
    inflation: {
      easyPercent: {
        total: 28800,
        perYear: [
          45000, 48000, 50000, 54000, 67878, 75000, 90000, 110000, 125000,
          130000, 150000,
        ],
      },
      hardPercent: {
        total: 64781,
        perYear: [
          450000, 480000, 500000, 540000, 678789, 750000, 900000, 1100000,
          1250000, 1300000, 1500000,
        ],
      },
    },
    yearsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  };

  /**
   * Calculating
   */

  function getCalculatorValues(calculateObject) {
    var years = $(
      ".calc-calculator-controls-control-stepper-value__input--years"
    ).val();
    calculateObject.arguments.years = years;
    var median = $(
      ".calc-calculator-controls-control-stepper-value__input--median"
    ).val();
    calculateObject.arguments.median = median;
    var onetime = $(
      ".calc-calculator-controls-control-stepper-value__input--onetime"
    ).val();
    calculateObject.arguments.onetime = onetime;
    var yearly = $(
      ".calc-calculator-controls-control-stepper-value__input--yearly"
    ).val();
    calculateObject.arguments.yearly = yearly;
    var inflation = $(
      ".calc-calculator-controls-control-stepper-value__input--inflation"
    ).val();
    calculateObject.arguments.inflation = inflation;
    console.log(calculateObject.arguments);
  }

  function getNoInflation(calculateObject, B4, B5, B6, B7, B8, B12) {
    calculateObject.noInflation.easyPercent.perYear = [];
    calculateObject.noInflation.hardPercent.perYear = [];
    for (var year = 1; year <= B4; year++) {
      console.log(year, B4);

      // no Inflation Easy Percent
      var yearEasyResult = B6 * (B5 * 0.01 * year) + B7 * (B5 * 0.01 * year);

      // no Inflation Hard Percent
      var square1 = Math.pow(1 + (B5 * 0.01) / 1, year * 1);
      var square2 = Math.pow(1 + (B5 * 0.01) / 1, 1 * year) - 1;
      var yearHardResult =
        B6 * square1 + B7 * square2 * (1 / (B5 * 0.01)) - B12;
      calculateObject.noInflation.easyPercent.perYear.push(
        Math.round(yearEasyResult)
      );
      calculateObject.noInflation.hardPercent.perYear.push(
        Math.round(yearHardResult)
      );

      if (year == B4) {
        calculateObject.noInflation.easyPercent.total =
          Math.round(yearEasyResult);
        calculateObject.noInflation.hardPercent.total =
          Math.round(yearHardResult);
      }
    }
    console.log(calculateObject);

    // // no Inflation Easy Percent For 1 instanse
    // calculateObject.noInflation.easyPercent.total =
    //   B6 * (B5 * 0.01 * B4) + B7 * (B5 * 0.01 * B4);
    // // no Inflation Hard Percent
    // var square1 = Math.pow(1 + (B5 * 0.01) / 1, B4 * 1);
    // var square2 = Math.pow(1 + (B5 * 0.01) / 1, 1 * B4) - 1;
    // calculateObject.noInflation.hardPercent.total =
    //   B6 * square1 + B7 * square2 * (1 / (B5 * 0.01)) - B12;
    // console.log(calculateObject);
  }

  function getInflation(calculateObject, B4, B5, B6, B7, B8, B12) {
    // inflatoin easy percent
    calculateObject.inflation.easyPercent.total = Math.round(
      B6 * ((B5 * 0.01 - B8 * 0.01) * B4) + B7 * ((B5 * 0.01 - B8 * 0.01) * B4)
    );

    // inflatoin hard percent
    calculateObject.inflation.hardPercent.total =
      B6 * Math.pow(1 + (B5 * 0.01 - B8 * 0.01) / 1, B4 * 1) +
      (B7 * (Math.pow(1 + (B5 * 0.01 - B8 * 0.01) / 1, 1 * B4) - 1) * 1) /
        (B5 * 0.01 - B8 * 0.01) -
      B12;
    calculateObject.inflation.hardPercent.total = Math.round(
      calculateObject.inflation.hardPercent.total
    );
  }

  function calculateInvest(calculateObject) {
    var args = calculateObject.arguments;
    var B4 = +args.years;
    var B5 = +args.median;
    var B6 = +args.onetime;
    var B7 = +args.yearly;
    var B8 = +args.inflation;

    // get fund
    calculateObject.fund = B6 + B7 * B4;
    var B12 = calculateObject.fund;

    getNoInflation(calculateObject, B4, B5, B6, B7, B8, B12);
    getInflation(calculateObject, B4, B5, B6, B7, B8, B12);
  }

  function getEasyPercentPerYear(obj) {
    obj.noInflation.easyPercent;
  }

  $(".calc-calculator-controls-calculate__button").on("click", function () {
    getCalculatorValues(calcData);
    calculateInvest(calcData);
    var noInflationContainer = ".calc-calculator-charts-chart--no-inflation";
    var inflationContainer = ".calc-calculator-charts-chart--inflation";
    var statValueCalssName =
      ".calc-calculator-charts-chart-summary-stat__value";

    //   no inflation
    $(
      noInflationContainer +
        " .calc-calculator-charts-chart-summary-stat--fund " +
        statValueCalssName
    ).text(calcData.fund.toLocaleString("ru-RU"));
    $(
      noInflationContainer +
        " .calc-calculator-charts-chart-summary-stat--easy " +
        statValueCalssName
    ).text(calcData.noInflation.easyPercent.total.toLocaleString("ru-RU"));
    $(
      noInflationContainer +
        " .calc-calculator-charts-chart-summary-stat--hard " +
        statValueCalssName
    ).text(
      Math.round(calcData.noInflation.hardPercent.total).toLocaleString("ru-RU")
    );

    //   inflation
    $(
      inflationContainer +
        " .calc-calculator-charts-chart-summary-stat--fund " +
        statValueCalssName
    ).text(calcData.fund.toLocaleString("ru-RU"));
    $(
      inflationContainer +
        " .calc-calculator-charts-chart-summary-stat--easy " +
        statValueCalssName
    ).text(calcData.inflation.easyPercent.total.toLocaleString("ru-RU"));
    $(
      inflationContainer +
        " .calc-calculator-charts-chart-summary-stat--hard " +
        statValueCalssName
    ).text(
      Math.round(calcData.inflation.hardPercent.total).toLocaleString("ru-RU")
    );
  });

  /**
   * Chart
   */
  var chartOptions = {
    low: 0,
    showArea: true,
    height: "304px",
  };
  var chartContainer = ".calc-calculator-charts-chart-summary-container";
  var chartWithInflation = new Chartist.Line(
    chartContainer,
    {
      labels: calcData.yearsArray,
      series: [
        calcData.noInflation.hardPercent.perYear,
        calcData.noInflation.easyPercent.perYear,
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
