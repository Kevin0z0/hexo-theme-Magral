const assert = require('assert');
const expect = require('expect.js')
const HTMLParse = require('../htmlParse')

function parseHTML(html){
  const result = new HTMLParse(html, 0).parse()
  return JSON.parse(JSON.stringify(result))
}

describe('HTMLParse', function () {
  it('Base test 1', function () {
    const html = `<div class="abc" class="ccc" v-for="i in data">{{i}}</div>`
    expect(parseHTML(html)).to.eql(
        {"tag":"div","attr":{"class":["abc","ccc"],"v-for":"i in data"},"type":"ElementNode","children":[{"text":"{{i}}","type":"TextNode"}]}
    )
  })

  it('Base test 2', function () {
    const html = `<div class= "abc" ></div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc"},"type":"ElementNode","children":[]}
    )
  })

  it('Base test 3', function () {
    const html = `<div class = "abc"></div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc"},"type":"ElementNode","children":[]}
    )
  })

  it('Base test 4', function () {
    const html = `<div class = "abc" name = "111"> </div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc", "name": "111"},"type":"ElementNode","children":[]}
    )
  })

  it('Base test 5', function () {
    const html = `<div class= "abc" >1</div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc"},"type":"ElementNode","children":[{"text":"1","type":"TextNode"}]}
    )
  })

  it('Base test 5', function () {
    const html = `<div class="abc"><span></span></div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc"},"type":"ElementNode","children":[{"text":"1","type":"TextNode"}]}
    )
  })
})