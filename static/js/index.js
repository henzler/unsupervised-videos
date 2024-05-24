window.HELP_IMPROVE_VIDEOJS = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  }

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);

  // Loop on each carousel initialized
  for (var i = 0; i < carousels.length; i++) {
    // Add listener to  event
    carousels[i].on('before:show', state => {
      console.log(state);
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function (state) {
      console.log(state);
    });
  }

  createStanfordOrbTabsWidget();

  bulmaSlider.attach();

  $('.tabs-widget').each(function () {
    const containerElement = $(this);
    tabsWidget = new TabsWidget(containerElement);
  });

  const comparison = new ImageComparison($('.image-comparison'));

  function updateLeftImage() {
    const leftValue = $('#stanford-orb-comparison-left-select').val()[0];
    const scene = $('#stanford-orb-comparison-object-select').val();
    const basePath = './static/stanford_orb_comparisons/';
    const leftUrl = `${basePath}${scene}.${leftValue}.png`;
    const leftName = $('#stanford-orb-comparison-left-select option:selected').text();

    comparison.updateLeftImage(leftUrl, leftName);
  }

  function updateRightImage() {
    const rightValue = $('#stanford-orb-comparison-right-select').val()[0];
    const scene = $('#stanford-orb-comparison-object-select').val();
    const basePath = './static/stanford_orb_comparisons/';
    const rightUrl = `${basePath}${scene}.${rightValue}.png`;
    const rightName = $('#stanford-orb-comparison-right-select option:selected').text();

    comparison.updateRightImage(rightUrl, rightName);
  }

  function updateScene() {
    updateLeftImage();
    updateRightImage();
  }

  $('#stanford-orb-comparison-left-select').on('change', updateLeftImage);
  $('#stanford-orb-comparison-right-select').on('change', updateRightImage);
  $('#stanford-orb-comparison-object-select').on('change', updateScene);

  // Initial update
  updateLeftImage();
  updateRightImage();
  updateScene();
});


let STANFORD_ORB_OBJECTS = {
  "pepsi": {
    "pepsi_scene003": ["pepsi_scene004", "pepsi_scene002"],
    "pepsi_scene004": ["pepsi_scene002", "pepsi_scene003"],
    "pepsi_scene002": ["pepsi_scene003", "pepsi_scene004"]
  },
  "curry": {
    "curry_scene001": ["curry_scene005", "curry_scene007"],
    "curry_scene005": ["curry_scene001", "curry_scene007"],
    "curry_scene007": ["curry_scene001", "curry_scene005"]
  },
  "ball": {
    "ball_scene002": ["ball_scene004", "ball_scene003"],
    "ball_scene003": ["ball_scene002", "ball_scene004"],
    "ball_scene004": ["ball_scene002", "ball_scene003"]
  },
  "grogu": {
    "grogu_scene002": ["grogu_scene001", "grogu_scene003"],
    "grogu_scene001": ["grogu_scene002", "grogu_scene003"],
    "grogu_scene003": ["grogu_scene001", "grogu_scene002"]
  },
  "car": {
    "car_scene006": ["car_scene002", "car_scene004"],
    "car_scene002": ["car_scene004", "car_scene006"],
    "car_scene004": ["car_scene002", "car_scene006"]
  },
  "teapot": {
    "teapot_scene001": ["teapot_scene002", "teapot_scene006"],
    "teapot_scene002": ["teapot_scene001", "teapot_scene006"],
    "teapot_scene006": ["teapot_scene001", "teapot_scene002"]
  },
  "baking": {
    "baking_scene001": ["baking_scene002", "baking_scene003"],
    "baking_scene002": ["baking_scene001", "baking_scene003"],
    "baking_scene003": ["baking_scene001", "baking_scene002"]
  },
  "blocks": {
    "blocks_scene005": ["blocks_scene002", "blocks_scene006"],
    "blocks_scene002": ["blocks_scene005", "blocks_scene006"],
    "blocks_scene006": ["blocks_scene002", "blocks_scene005"]
  },
  "cactus": {
    "cactus_scene005": ["cactus_scene007", "cactus_scene001"],
    "cactus_scene007": ["cactus_scene001", "cactus_scene005"],
    "cactus_scene001": ["cactus_scene005", "cactus_scene007"]
  },
  "chips": {
    "chips_scene004": ["chips_scene003", "chips_scene002"],
    "chips_scene002": ["chips_scene003", "chips_scene004"],
    "chips_scene003": ["chips_scene002", "chips_scene004"]
  },
  "gnome": {
    "gnome_scene003": ["gnome_scene007", "gnome_scene005"],
    "gnome_scene005": ["gnome_scene003", "gnome_scene007"],
    "gnome_scene007": ["gnome_scene003", "gnome_scene005"]
  },
  "pitcher": {
    "pitcher_scene007": ["pitcher_scene001", "pitcher_scene005"],
    "pitcher_scene001": ["pitcher_scene005", "pitcher_scene007"],
    "pitcher_scene005": ["pitcher_scene001", "pitcher_scene007"]
  },
  "salt": {
    "salt_scene007": ["salt_scene005", "salt_scene004"],
    "salt_scene005": ["salt_scene004", "salt_scene007"],
    "salt_scene004": ["salt_scene005", "salt_scene007"]
  },
  "cup": {
    "cup_scene003": ["cup_scene006", "cup_scene007"],
    "cup_scene006": ["cup_scene003", "cup_scene007"],
    "cup_scene007": ["cup_scene003", "cup_scene006"]
  },
}

function createStanfordOrbTabsWidget() {
  let tabListUl = $('#stanford-orb-tabs-widget > .tabs > ul');
  let tabContentDiv = $('#stanford-orb-tabs-widget > .tabs-content');

  for (let objectName in STANFORD_ORB_OBJECTS) {
    // Append Object Tabs
    tabListUl.append(`<li class="object-tab"><a>${objectName}</a></li>`);
    // Create Content for each Object Tab
    let objectContent = $('<div class="object-content"></div>');

    // Create source scene tabs widget
    let sourceTabWidget = $('<div class="tabs-widget"></div>');
    let sourceTabList = $('<div class="tabs is-centered is-toggle is-small"><ul class="is-marginless"></ul></div>');
    let sourceTabContent = $('<div class="tabs-content has-text-centered"></div>');

    for (let sceneName in STANFORD_ORB_OBJECTS[objectName]) {
      // Add source scene tab
      sourceTabList.find('ul').append(`<li class="source-tab"><a>${sceneName}</a></li>`);
      // Add target scenes to the source scene tab content
      let targetTabWidget = createTargetSceneTabs(sceneName, STANFORD_ORB_OBJECTS[objectName][sceneName]);
      sourceTabContent.append(`<div class="tabs-widget source-content">${targetTabWidget}</div>`);
    }

    // Append source tabs and content to the source tab widget
    sourceTabWidget.append(sourceTabList);
    sourceTabWidget.append(sourceTabContent);

    // Append the source tab widget to the object content
    objectContent.append(sourceTabWidget);

    tabContentDiv.append(objectContent);
  }
}

function createTargetSceneTabs(srcName, tgtNames) {
  let targetTabWidget = $('<div class="tabs-widget"></div>');
  let targetTabList = $('<div class="tabs is-centered is-toggle is-small"><ul class="is-marginless"></ul></div>');
  let targetTabContent = $('<div class="tabs-content has-text-centered"></div>');

  tgtNames.forEach(tgtName => {
    targetTabList.find('ul').append(`
    <li class="target-tab"><a>${tgtName}</a></li>
    `);
    let targetContent = `
      <div class="columns is-mobile has-text-centered is-size-7-mobile is-vcentered ">
        <div class="column is-one-quarter">
          <img width="256px" src="./static/stanford_orb_envmaps_ldr/${srcName}.png" />
          <br/>
          (a) Source Envmap (not used)
        </div>
        <div class="column is-one-quarter">
          <img width="256px" src="./static/stanford_orb_envmaps_ldr/${tgtName}.png" />
          <br/>
          (b) Target Envmap
        </div>
        <div class="column is-one-quarter">
          <video class="video" width="256px" loop playsinline muted autoplay controls src="./static/stanford_orb_inputs/${srcName}.mp4"></video>
          <br />
          (c) Source Inputs
        </div>
        <div class="column is-one-quarter">
          <video class="video" width="256px" loop playsinline muted autoplay controls src="./static/stanford_orb_results/${srcName}-${tgtName}.mp4"></video>
          <br />
          (d) Relit Rendering
        </div>
      </div>
    `;
    targetTabContent.append(`<div class="target-content">${targetContent}</div>`);
  });

  targetTabWidget.append(targetTabList);
  targetTabWidget.append(targetTabContent);

  return targetTabWidget.html();
}


class TabsWidget {
  constructor(container) {
    this.container = container;
    this.activeIndex = 0;
    this.listItems = container.children('.tabs').children('ul').children('li');
    let self = this;
    this.listItems.click(function (e) {
      let index = $(this).index();
      self.update($(this), index);
    })

    this.update(this.listItems[this.activeIndex], this.activeIndex);
  }

  update(element, targetIndex) {
    this.activeIndex = targetIndex;
    const tabs = this.container.children('.tabs');
    const tabsContent = this.container.children('.tabs-content');
    this.listItems.each(function () {
      if ($(this).index() == targetIndex) {
        $(this).addClass('is-active');
      } else {
        $(this).removeClass('is-active');
      }
    });
    tabsContent.children().each(function () {
      if ($(this).index() == targetIndex) {
        $(this).show();
        $(this).find('*').each(function () {
          if ($(this).is(':visible')) {
            $(this).trigger('tab:show');
          }
        })
      } else {
        $(this).hide();
        $(this).find('*').trigger('tab:hide');
      }
    });
  }
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}


class ImageComparison {
  constructor($container) {
    this.$container = $container;
    this.position = 0.5;
    this.$canvas = $container.find('canvas');
    this.context = this.$canvas[0].getContext("2d");

    this.image1 = new Image();
    this.image2 = new Image();
    this.imagesLoaded = 0;

    this.addEventListeners();
    this.loadImages();

    const observer = new MutationObserver(() => {
      this.loadImages();
    });

    observer.observe(this.$container[0], { attributes: true, attributeFilter: ['data-left-url', 'data-right-url', 'data-left-name', 'data-right-name'] });
  }

  addEventListeners() {
    let self = this;

    function trackLocation(e) {
      self.bcr = self.$canvas[0].getBoundingClientRect();
      self.position = ((e.pageX - self.bcr.x) / self.bcr.width).clamp(0, 1);
      self.drawImages();
    }

    function trackLocationTouch(e) {
      self.bcr = self.$canvas[0].getBoundingClientRect();
      self.position = ((e.touches[0].pageX - self.bcr.x) / self.bcr.width).clamp(0, 1);
      self.drawImages();
    }

    this.$canvas.off('mousemove touchstart touchmove mouseout');
    this.$canvas.on('mousemove', trackLocation);
    this.$canvas.on('touchstart touchmove', trackLocationTouch);
    this.$canvas.on('mouseout', function () { self.position = 0.5; self.drawImages(); });

    $(window).off('resize');
    $(window).on('resize', function () {
      self.resize();
      self.drawImages();
    });
  }

  loadImages() {
    const imageUrl1 = this.$container.attr('data-left-url');
    const imageUrl2 = this.$container.attr('data-right-url');
    this.leftName = this.$container.attr('data-left-name') || 'Image 1';
    this.rightName = this.$container.attr('data-right-name') || 'Image 2';
    this.imagesLoaded = 0;
    this.position = 0.5; // Reset position to the center

    this.image1.onload = this.image2.onload = () => {
      this.imagesLoaded++;
      if (this.imagesLoaded === 2) {
        this.resize();
        this.drawImages();
      }
    };

    this.image1.src = imageUrl1;
    this.image2.src = imageUrl2;

    // Ensure event listeners are consistently applied
    this.addEventListeners();
  }

  resize() {
    const imageWidth = this.image1.width;
    const imageHeight = this.image1.height;
    const canvasWidth = this.$container.width();
    const canvasHeight = canvasWidth * imageHeight / imageWidth;
    this.$canvas[0].width = canvasWidth;
    this.$canvas[0].height = canvasHeight;
  }

  drawImages() {
    if (this.imagesLoaded < 2) {
      return;
    }

    const canvasWidth = this.$canvas[0].width;
    const canvasHeight = this.$canvas[0].height;
    const position = this.position;

    this.context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.context.drawImage(this.image1, 0, 0, this.image1.width, this.image1.height, 0, 0, canvasWidth, canvasHeight);

    const colStart = (canvasWidth * position).clamp(0.0, canvasWidth);
    const colWidth = (canvasWidth - (canvasWidth * position)).clamp(0.0, canvasWidth);
    const sourceColStart = (this.image1.width * position).clamp(0.0, this.image1.width);
    const sourceColWidth = (this.image1.width - (this.image1.width * position)).clamp(0.0, this.image1.width);
    this.context.drawImage(
      this.image2,
      sourceColStart, 0,
      sourceColWidth, this.image2.height,
      colStart, 0,
      colWidth, canvasHeight);

    this.context.beginPath();
    this.context.moveTo(canvasWidth * position, 0);
    this.context.lineTo(canvasWidth * position, canvasHeight);
    this.context.closePath();
    this.context.strokeStyle = "#AAAAAA";
    this.context.lineWidth = 5;
    this.context.stroke();

    this.context.font = "20px 'Helvetica', sans-serif";
    this.context.fillStyle = "white";
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;
    this.context.textAlign = "left";
    this.context.textBaseline = "bottom";
    this.context.strokeText(this.leftName, 10, canvasHeight - 5);
    this.context.fillText(this.leftName, 10, canvasHeight - 5);

    this.context.textAlign = "right";
    this.context.strokeText(this.rightName, canvasWidth - 10, canvasHeight - 5);
    this.context.fillText(this.rightName, canvasWidth - 10, canvasHeight - 5);
  }

  updateLeftImage(url, name) {
    this.$container.attr('data-left-url', url);
    this.$container.attr('data-left-name', name);
    this.loadImages();
  }

  updateRightImage(url, name) {
    this.$container.attr('data-right-url', url);
    this.$container.attr('data-right-name', name);
    this.loadImages();
  }
}