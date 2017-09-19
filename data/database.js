/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export class User {}

var redTone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
      greenTone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
     yellowTone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        blueTone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),

var sequence = [],
    playerSequence = [],
    level = 0,
    acc = 1000,
    hurryUp;
  

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock user data
const viewer = new User();
viewer.id = VIEWER_ID;
const usersById = {
  [VIEWER_ID]: viewer,
};

export function getUser(id) {
  return usersById[id];
}

export function getViewer() {
  return getUser(VIEWER_ID);
}

function makeChallenge() {
  level++;
    var r = Math.round(Math.random() * 3);
    switch (r) {
      case 0:
        sequence.push(0);
        break;
      case 1:
        sequence.push(1);
        break;
      case 2:
        sequence.push(2);
        break;
      case 3:
        sequence.push(3);
        break;
    }
  return sequence
}



export getPlayerChallenge() {
  return makeChallenge()
}

export getPlayerResponse() {

}

export addplayerResponse() {

}