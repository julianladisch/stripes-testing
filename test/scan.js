const Nightmare = require('nightmare')
const assert = require('assert')
const config = require('../folio-ui.config.js')

describe('Using the App Folio UI App /scan', function () {
  this.timeout('10s')

  let nightmare = null
  beforeEach(() => {
    // show true lets you see wth is actually happening :)
    nightmare = new Nightmare(config.nightmare)
  })

  describe('signing up and finishing setup', () => {
    var scan_user = "dante"
            
    it('should work without timing out', done => {
      nightmare
      .goto(config.url)
      .type('input[name=username]', config.username)
      .type('input[name=password]', config.password)
      .click('button[type=submit]')
      .wait('h3')
      
      .click('a[title=Scan] > span')
      //.wait('h1')
      
      .type('input[id=patronid]', scan_user)
      .click('div.col-xs-3 > button[type=button]')
      
      .wait(parseInt(process.env.FOLIO_UI_DEBUG) ? parseInt(config.debug_sleep) : 0) // debugging
      .end()
      .then(result => { done() })
      .catch(done)
    })
  })
})


