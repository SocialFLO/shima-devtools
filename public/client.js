// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function () {
  // Grab element from '/modName', set html to process.env.MOD_NAME
  let pathname = window.location.host;
  let end = pathname.indexOf('.glitch.me')
  let final = pathname.slice(0, end);
  $('#js-mod-name').html(final)

  customElements.define('eyewear-pane', class extends HTMLElement {
    constructor() {
      super();

      // Create shadow DOM for the component.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
        <slot id="devpane" name="devpane">
          <span>Your content will render here when you insert markup into the eyewear-pane tag.</span>
        </slot>
      `;
    }

  });
});

/**
* Class representing the api for interacting with the wearable device.
* You should register your delegate functions by utilizing the provided method calls and passing your
* function as the sole argument. I.e. DeviceApi.onAudioLevelChanged(() => console.log('foo'));
*/
class DeviceApi {
  constructor() {
    console.log('New DeviceApi class initialized.');
    // Private variables representing various device info.
    this._audioLevel = 0;
    this._buttonInput = [];
    this._lowPower = false;
    this._mode = '';
    this._touchpadInput = [];
    this._wearerHeading = 0;

    // Dev provided delegate functions
    this._onAudioLevelChanged = null;
    this._onButtonInput = null;
    this._onLowPowerChange = null;
    this._onModeChanged = null;
    this._onTouchpadInput = null;
    this._onWearerHeadingChanged = null;
  }

  /**
  * Returns the device audio level.
  * @returns {number} The device audio level.
  **/
  get audioLevel() {
    console.log('getting audio');
    return this._audioLevel;
  }

  /**
  * Returns the last device button input.
  * @returns {array} The last device button input.
  **/
  get buttonInput() {
    return this._buttonInput;
  }

  /**
  * Indicates whether or not the device is in a low power state.
  * @returns {boolean} True if the device is in a low power state.
  **/
  get lowPower() {
    return this._lowPower;
  }

  /**
  * Returns the device mode.
  * @returns {string} The device mode.
  **/
  get mode() {
    return this._mode;
  }

  /**
  * Returns the last device touchpad input.
  * @returns {string} The last device touchpad input.
  **/
  get touchpadInput() {
    return this._touchpadInput;
  }

  /**
  * Returns the device wearer heading, a number from 0 to 359..
  * @returns {number} The device wearer heading.
  **/
  get wearerHeading() {
    return this.wearerHeading;
  }

  /**
  * Registers a provided function to be called when the audio level changes.
  */
  onAudioLevelChanged(callback) {
    this._onAudioLevelChanged = callback;
  }

  /**
  * Registers a provided function to be called when the button input changes.
  * The function will be provided an array of strings indicating which buttons were pressed and a boolean which will be True
  * if the buttons were held (as opposed to simply pressed).
  * The buttons that can be pressed are: L1, L2, L3, R1, R2, R3.
  */
  onButtonInput(callback) {
    this._onButtonInput = callback;
  }

  /**
  * Registers a provided function to be called when the low power status changes.
  */
  onLowPowerChange(callback) {
    this._onLowPowerChange = callback;
  }

  /**
  * Registers a provided function to be called when the mode changes.
  */
  onModeChanged(callback) {
    this._onModeChanged = callback;
  }

  /**
  * Registers a provided function to be called when the touchpad input changes.
  * This will be called with two arguments. The first being a swipe direction such as 'left swipe', 'right swipe', or 'back and forth swipe'.
  * The second argument will be a pad number to specify which pad on the glasses the action came from.
  */
  onTouchpadInput(callback) {
    this._onTouchpadInput = callback;
  }

  /**
  * Registers a provided function to be called when the wearer heading changes.
  */
  onWearerHeadingChanged(callback) {
    this._onWearerHeadingChanged = callback;
  }
}

/**
* Class representing the api for interacting with the phone app.
* Provides various information about the user and device settings.
*/
class SocialFloApi {
  constructor(options) {
    this._brightness = 0;
    this._handedness = false;
    this._larpNumber = '';
    this._modStyle = '';
    this._wearerAge = 0;
    this._wearerCourse = 0;
    this._wearerLanguage = '';
  }

  /**
  * Returns the device brightness.
  * @returns {number} The device brightness.
  **/
  get brightness() {
    return this._brightness;
  }

  /**
  * Returns whether the device handedness is set to left.
  * @returns {boolean} True if the device handedness is set.
  **/
  get handedness() {
    return this._handedness;
  }

  /**
  * Returns the unique device LARP number.
  * @returns {string} The device LARP number.
  **/
  get larpNumber() {
    return this._larpNumber;
  }

  /**
  * Returns the device user's mod style setting.
  * @returns {string} The device mod style.
  **/
  get modStyle() {
    return this._modStyle;
  }

  /**
  * Returns the device user's age.
  * @returns {number} The device user's age.
  **/
  get wearerAge() {
    return this._wearerAge;
  }

  /**
  * Returns the device user's course heading, a number from 0 to 359.
  * @returns {number} The device user's course heading.
  **/
  get wearerCourse() {
    return this._wearerCourse;
  }

  /**
  * Returns the device user's language.
  * @returns {string} The device user's language setting.
  **/
  get wearerLanguage() {
    return this._wearerLanguage;
  }
}

/**
* Class that extends DeviceApi to provide methods allowing the developer to simulate the wearable device.
* You should register your delegate functions as you would with the actual DeviceApi calss by utilizing the provided method calls and passing your
* function as the sole argument. I.e. UtilityClass.onAudioLevelChanged(() => console.log('foo'));
* Then you can simulate the device calling them via the provided simulation methods. I.e. UtilityClass.simulateOnAudioLevelChanged(level);
*/
class UtilityClass extends DeviceApi {
  constructor(options) {
    super(options);
  }

  /**
  * Call the onAudioLevelChanged function with the passed value.
  * @param {number} level - The audio level.
  */
  simulateOnAudioLevelChanged(level) {
    this._onAudioLevelChanged(level);
  }

  /**
  * Call the onButtonInput function with the passed values.
  * @param {array} buttonInput - Strings representing the pressed buttons. The buttons that can be pressed are: L1, L2, L3, R1, R2, R3.
  * @param {boolean} buttonHeald - Whether the button(s) in question were held, as opposed to simply pressed.
  */
  simulateOnButtonInput(buttonInput, buttonHeld) {
    this._onButtonInput(buttonInput, buttonHeld);
  }

  /**
  * Call the onLowPowerChange function with the passed value.
  * @param {boolean} isLowPower - True if the device is in low power mode.
  */
  simulateOnLowPowerChange(isLowPower) {
    this._onLowPowerChange(isLowPower);
  }

  /**
  * Call the onModeChanged function with the passed value.
  * @param {string} mode - True if the device is in low power mode.
  */
  simulateOnModeChanged(mode) {
    this._onModeChanged(mode);
  }

  /**
  * Call the onTouchpadInput function with the passed value. 
  * Supported araguments for the inputString include 'left swipe', 'right swipe' and 'back and forth swipe'. 
  * For example, you can simulate a left swipe touchpad input by doing UtilityClass.simulateOnTouchpadInput('left swipe');
  * @param {string} inputString - The string representing touchpad input.
  * @param {number} padNumber - The pad number representing which pad on the glasses the action was made.
  */
  simulateOnTouchpadInput(inputString, padNumber) {
    const div = document.createElement('div');
    const parent = document.getElementById('js-eyewearView');
    div.className = ('simulateTouchInput');
    parent.appendChild(div);
    setTimeout(() => {
      parent.removeChild(div);
    }, 3000);
    this._onTouchpadInput(inputString, padNumber);
  }

  /**
  * Call the onWearerHeadingChanged function with the passed value.
  * @param {number} heading - The new device heading.
  */
  simulateOnWearerHeadingChanged(heading) {
    this._onWearerHeadingChanged(heading);
  }

  /**
  * Set the device audio level. This method is only available on the simulated API.
  * @param {number} value - The new device audio level.
  */
  set audioLevel(value) {
    this._audioLevel = value;
  }

  /**
  * Set the last button input array. This method is only available on the simulated API.
  * @param {array} value - The last device button input.
  */
  set buttonInput(value) {
    this._buttonInput = value;
  }

  /**
  * Set the device low power mode. This method is only available on the simulated API.
  * @param {boolean} value - True if the device is in low power mode.
  */
  set lowPower(value) {
    this._lowPower = value;
  }

  /**
  * Set the device mode. This method is only available on the simulated API.
  * @param {string} value - The device mode.
  */
  set mode(value) {
    this._mode = value;
  }

  /**
  * Set the last button input array. This method is only available on the simulated API.
  * @param {array} value - The last device touchpad input.
  */
  set touchpadInput(value) {
    this._touchpadInput = value;
  }

  /**
  * Set the last device wearer heading. This method is only available on the simulated API.
  * @param {number} heading - The last device wearer heading.
  */
  set wearerHeading(value) {
    this._wearerHeading = value;
  }
}


